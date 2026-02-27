import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../../store';

const terraformPlan = [
  "Terraform used the selected providers to generate the following execution plan.",
  "Resource actions are indicated with the following symbols:",
  "  + create",
  "",
  "Terraform will perform the following actions:",
  "",
  "  + aws_vpc.main",
  "      cidr_block:        \"10.0.0.0/16\"",
  "      enable_dns_hostnames: \"true\"",
  "      instance_tenancy:  \"default\"",
  "",
  "  + aws_instance.ec2_node_1",
  "      ami:             \"ami-0abcdef1234567890\"",
  "      instance_type:   \"t3.micro\"",
  "      tags:            {\"Name\":\"ec2_node_1\"}",
  "",
  "  + aws_instance.ec2_node_2",
  "      ami:             \"ami-0abcdef1234567890\"",
  "      instance_type:   \"t3.micro\"",
  "      tags:            {\"Name\":\"ec2_node_2\"}",
  "",
  "  + aws_s3_bucket.portfolio_assets",
  "      bucket:          \"abhijeet-portfolio-assets\"",
  "      acl:             \"private\"",
  "",
  "  + aws_lb.main",
  "      internal:        \"false\"",
  "      load_balancer_type: \"application\"",
  "",
  "  + aws_eks_cluster.main",
  "      name:            \"abhijeet-eks-cluster\"",
  "      version:         \"1.28\"",
  "      role_arn:        \"arn:aws:iam::123456789012:role/eks-cluster-role\"",
  "",
  "Plan: 6 to add, 0 to change, 0 to destroy."
];

const provisioningSequence = [
  "Acquiring lock... success!",
  "Initializing backend...",
  "Running terraform plan...",
  "Applying changes...",
  "aws_vpc.main: Creating...",
  "aws_vpc.main: Creation complete after 2s",
  "aws_instance.ec2_node_1: Creating...",
  "aws_instance.ec2_node_2: Creating...",
  "aws_s3_bucket.portfolio_assets: Creating...",
  "aws_lb.main: Creating...",
  "aws_instance.ec2_node_1: Creation complete after 15s",
  "aws_instance.ec2_node_2: Creation complete after 15s",
  "aws_s3_bucket.portfolio_assets: Creation complete after 1s",
  "aws_lb.main: Creation complete after 10s",
  "aws_eks_cluster.main: Creating...",
  "aws_eks_cluster.main: Creation complete after 120s",
  "Deployment complete! Resources provisioned.",
  "Transitioning to 3D Scene..."
];

const Deployment: React.FC = () => {
  const deployLogRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const setMode = useAppStore((state) => state.setMode);

  useEffect(() => {
    if (deployLogRef.current && progressBarRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setMode('scene'), 1000); // Wait a second before switching
        },
      });

      const totalDuration = terraformPlan.length * 0.08 + provisioningSequence.length * 0.08;
      tl.to(progressBarRef.current, { width: '100%', duration: totalDuration, ease: 'linear' });

      // Animate Terraform Plan Output
      terraformPlan.forEach((line) => {
        tl.to({}, {
          duration: 0.05,
          onComplete: () => {
            const p = document.createElement('p');
            p.textContent = line;
            if (line.startsWith('+')) p.style.color = '#34D399'; // Green for additions
            if (line.startsWith('Plan:')) p.style.color = '#FBBF24'; // Amber for plan summary
            p.style.opacity = '0';
            deployLogRef.current?.appendChild(p);
            gsap.to(p, { opacity: 1, duration: 0.1 });
            deployLogRef.current!.scrollTop = deployLogRef.current!.scrollHeight; // Auto-scroll
          }
        }, "-=0.02");
      });

      tl.to({}, { duration: 1 }); // Pause after plan

      // Animate Provisioning Sequence
      provisioningSequence.forEach((line) => {
        tl.to({}, {
          duration: 0.05,
          onComplete: () => {
            const p = document.createElement('p');
            p.textContent = line;
            if (line.includes('Creating...')) p.style.color = '#60A5FA'; // Blue for creating
            if (line.includes('complete after')) p.style.color = '#34D399'; // Green for complete
            if (line.includes('Deployment complete')) p.style.color = '#FBBF24'; // Amber for final summary
            p.style.opacity = '0';
            deployLogRef.current?.appendChild(p);
            gsap.to(p, { opacity: 1, duration: 0.1 });
            deployLogRef.current!.scrollTop = deployLogRef.current!.scrollHeight; // Auto-scroll
          }
        }, "-=0.02");
      });

      return () => {
        tl.kill();
      };
    }
  }, [setMode]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background text-gray-300 font-mono p-4">
      <h2 className="text-2xl font-bold mb-4 text-accent">Deploying Infrastructure with Terraform...</h2>
      <div className="w-full max-w-4xl bg-gray-900 rounded-lg shadow-lg border border-accent">
        <div className="p-4">
          <div className="bg-gray-700 rounded-full h-2.5 w-full mb-4">
            <div ref={progressBarRef} className="bg-green-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <div
            ref={deployLogRef}
            className="text-left h-96 overflow-y-auto bg-gray-800 p-4 rounded-lg shadow-inner"
          >
            {/* Deployment logs will be appended here by GSAP */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deployment;
