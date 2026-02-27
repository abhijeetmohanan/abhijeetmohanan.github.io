import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../store';
import gsap from 'gsap';

interface ExperienceConfig {
  name: string;
  company: string;
  position: THREE.Vector3;
  color: number;
}

const experienceConfigs: ExperienceConfig[] = [
  { name: 'Skit.ai', company: 'Skit.ai', position: new THREE.Vector3(0, 0, 0), color: 0x00f0ff },
  { name: 'Vernacular.ai', company: 'Vernacular.ai', position: new THREE.Vector3(-20, 10, -10), color: 0x00aaff },
];

const Scene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { setMode, setSelectedNode, isMobile } = useAppStore();
  const [sceneReady, setSceneReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [currentHovered, setCurrentHovered] = useState<THREE.Mesh | null>(null);

  const handleResize = useCallback((renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) => {
    if (mountRef.current) {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }, []);

  const createObject = useCallback((config: ExperienceConfig) => {
    const group = new THREE.Group();
    group.name = config.name;

    const podMaterial = new THREE.MeshPhongMaterial({ color: config.color, flatShading: true });
    const podGeometry = new THREE.CapsuleGeometry(2, 4, 4, 8);
    const pod = new THREE.Mesh(podGeometry, podMaterial);
    pod.rotation.z = Math.PI / 2;
    group.add(pod);

    const ringGeometry = new THREE.TorusGeometry(4, 0.2, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.position.copy(config.position);
    (group.userData as any).originalColor = config.color;

    return group;
  }, []);

  useEffect(() => {
    if (isMobile) {
      // If mobile, don't initialize Three.js scene, show static fallback.
      // The parent component (Home) will handle rendering static UI.
      return;
    }

    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0f17); // Match background color

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 30, 50); // Adjusted for better view
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    handleResize(renderer, camera);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 5); // soft white light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Objects
    const interactableObjects: THREE.Object3D[] = [];
    experienceConfigs.forEach(config => {
      const obj = createObject(config);
      scene.add(obj);
      interactableObjects.push(obj);
    });

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      mouse.x = (event.clientX / mountRef.current.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / mountRef.current.clientHeight) * 2 + 1;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactableObjects, true);

      if (intersects.length > 0) {
        let object = intersects[0].object;
        // If a child of a group (like Kubernetes cubes), get the parent group
        while (object.parent && object.parent !== scene && object.parent instanceof THREE.Group) {
          object = object.parent;
        }

        setSelectedNode(object.name);
        setModalContent(`You clicked on: ${object.name}`);
        setModalOpen(true);
      }
    };

    const onHover = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactableObjects, true);

      if (intersects.length > 0) {
        let object = intersects[0].object;
        while (object.parent && object.parent !== scene && object.parent instanceof THREE.Group) {
          object = object.parent;
        }

        if (currentHovered && currentHovered !== object) {
          // Restore previous hovered object's color
          if ((currentHovered.userData as any).originalColor !== undefined) {
            (currentHovered as THREE.Mesh).material = new THREE.MeshPhongMaterial({
              color: (currentHovered.userData as any).originalColor,
              flatShading: true
            });
          }
        }

        if (currentHovered !== object) {
          // Apply hover glow
          (object as THREE.Mesh).material = new THREE.MeshPhongMaterial({
            color: 0x99ffff, // Brighter color for glow
            emissive: 0x00ffff,
            emissiveIntensity: 0.3,
            flatShading: true
          });
          setCurrentHovered(object as THREE.Mesh);
        }
      } else {
        if (currentHovered) {
          // Restore color if no longer hovering
          if ((currentHovered.userData as any).originalColor !== undefined) {
            (currentHovered as THREE.Mesh).material = new THREE.MeshPhongMaterial({
              color: (currentHovered.userData as any).originalColor,
              flatShading: true
            });
          }
          setCurrentHovered(null);
        }
      }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate pods
      interactableObjects.forEach(obj => {
        obj.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
      onHover(); // Check hover state on each frame
    };

    window.addEventListener('resize', () => handleResize(renderer, camera));
    mountRef.current.addEventListener('mousemove', onMouseMove);
    mountRef.current.addEventListener('click', onClick);

    animate();
    setSceneReady(true); // Indicate scene is initialized

    // Cleanup
    return () => {
      window.removeEventListener('resize', () => handleResize(renderer, camera));
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', onMouseMove);
        mountRef.current.removeEventListener('click', onClick);
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      scene.clear();
    };
  }, [setMode, setSelectedNode, isMobile, handleResize, createObject, currentHovered]);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-accent font-mono p-4">
        <h2 className="text-xl font-bold mb-4">Interactive Scene (Desktop Only)</h2>
        <p className="text-center">Please view on a larger screen for the full interactive 3D experience.</p>
        <button
          onClick={() => setMode('terminal')}
          className="mt-8 px-6 py-3 bg-accent text-background rounded-md text-lg font-bold hover:bg-opacity-80 transition-colors duration-300"
        >
          Proceed to Terminal
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-background font-mono">
      <div ref={mountRef} className="w-full h-screen" />

      {modalOpen && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-lg shadow-lg border border-accent text-accent">
          <p className="text-lg mb-4">{modalContent}</p>
          <div className="flex justify-between">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                setModalOpen(false);
                setMode('terminal');
              }}
              className="px-4 py-2 bg-accent text-background rounded hover:bg-opacity-80 transition-colors ml-4"
            >
              Explore in Terminal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scene;
