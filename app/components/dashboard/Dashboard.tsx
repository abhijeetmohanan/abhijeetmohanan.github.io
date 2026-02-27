'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../../store';
import { skillsContent, resumeContent } from '../terminal/commands';

interface Skill {
  category: string;
  technologies: string[];
}

const parseSkills = (skills: string): Skill[] => {
  return skills.trim().split('\n').map(line => {
    const [category, technologies] = line.split(': ');
    return {
      category,
      technologies: technologies.split(', '),
    };
  });
};

const skillsData = parseSkills(skillsContent);
const certifications = [
  "CKA Certified Kubernetes Administrator",
  "RHCE Red Hat Certified Engineer",
  "OpenShift Specialist: Specialist in OpenShift Administration & Ansible Automation",
  "RHCSA Red Hat Certified System Administrator",
];

const SkillCategory: React.FC<{ category: string; technologies: string[]; delay: number }> = ({ category, technologies, delay }) => {
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categoryRef.current) {
      gsap.fromTo(categoryRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, delay, ease: 'power3.out' }
      );
      gsap.fromTo(categoryRef.current.querySelectorAll('.tech-tag'),
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, delay: delay + 0.3, stagger: 0.05, ease: 'power3.out' }
      );
    }
  }, [delay]);

  return (
    <div ref={categoryRef} className="bg-gray-800 p-6 rounded-lg border border-accent/30 shadow-lg mb-6 opacity-0">
      <h3 className="text-xl font-bold text-accent mb-4">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span key={index} className="tech-tag bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const CertificationList: React.FC<{ certs: string[]; delay: number }> = ({ certs, delay }) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(listRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay, stagger: 0.15, ease: 'power3.out' }
      );
    }
  }, [delay]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-accent/30 shadow-lg w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-accent mb-4 text-center">Certifications</h2>
      <div ref={listRef} className="flex flex-col items-center gap-3">
        {certs.map((cert, index) => (
          <div key={index} className="text-gray-300 text-lg opacity-0 flex items-center">
            <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {cert}
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { setMode } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-background text-accent font-mono p-4 opacity-0">
      <h1 className="text-4xl font-bold mb-8 text-white">Skills & Certifications</h1>

      <div className="w-full max-w-4xl mb-10">
        {skillsData.map((skill, index) => (
          <SkillCategory
            key={index}
            category={skill.category}
            technologies={skill.technologies}
            delay={0.3 + index * 0.2}
          />
        ))}
      </div>

      <CertificationList certs={certifications} delay={1.2} />

      <button
        onClick={() => setMode('terminal')}
        className="mt-12 px-8 py-4 bg-accent text-background rounded-lg text-xl font-bold hover:bg-opacity-80 transition-colors duration-300"
      >
        Return to Terminal
      </button>
    </div>
  );
};

export default Dashboard;
