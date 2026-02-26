'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../../store';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  delay: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: delay, ease: 'power3.out' }
      );
    }
  }, [delay]);

  return (
    <div ref={cardRef} className="bg-gray-800 p-6 rounded-lg border border-accent/30 shadow-lg text-center flex-1 min-w-[250px] max-w-sm opacity-0">
      <h3 className="text-xl font-bold text-accent mb-2">{title}</h3>
      <p className="text-4xl font-mono text-white mb-4">{value}</p>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

interface ChartProps {
  title: string;
  data: number[];
  labels: string[];
  color: string;
  maxValue: number;
  delay: number;
}

const BarChart: React.FC<ChartProps> = ({ title, data, labels, color, maxValue, delay }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(chartRef.current.children,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1, opacity: 1, duration: 0.8, delay: delay + 0.3, stagger: 0.1, ease: 'power3.out',
          transformOrigin: 'bottom'
        }
      );
    }
  }, [delay]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-accent/30 shadow-lg flex-1 min-w-[300px] opacity-0" ref={chartRef}>
      <h3 className="text-xl font-bold text-accent mb-4 text-center">{title}</h3>
      <div className="flex justify-around items-end h-40">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center h-full justify-end">
            <div
              className="w-8 rounded-t-sm"
              style={{
                height: `${(value / maxValue) * 100}%`,
                backgroundColor: color,
              }}
            ></div>
            <span className="text-xs text-gray-400 mt-1">{labels[index]}</span>
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
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  const cpuData = [85, 90, 75, 80, 95];
  const cpuLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const memoryData = [60, 65, 55, 70, 72];
  const memoryLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const networkData = [120, 150, 130, 180, 160];
  const networkLabels = ['1h', '2h', '3h', '4h', '5h'];

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-background text-accent font-mono p-4 opacity-0">
      <h1 className="text-3xl font-bold mb-8 text-white">System Monitoring Dashboard</h1>

      <div className="flex flex-wrap justify-center gap-6 mb-10 w-full max-w-6xl">
        <MetricCard title="CPU Usage" value="88%" description="DevOps Expertise" delay={0.2} />
        <MetricCard title="Memory Usage" value="67%" description="Systems Knowledge" delay={0.4} />
        <MetricCard title="Network Throughput" value="1.4 Gbps" description="Scaling Capability" delay={0.6} />
        <MetricCard title="Incident Count" value="0" description="Proactive Reliability" delay={0.8} />
      </div>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
        <BarChart
          title="CPU Usage Trend"
          data={cpuData}
          labels={cpuLabels}
          color="#00f0ff"
          maxValue={100}
          delay={1.0}
        />
        <BarChart
          title="Memory Usage Trend"
          data={memoryData}
          labels={memoryLabels}
          color="#ccff00"
          maxValue={100}
          delay={1.2}
        />
        <BarChart
          title="Network Throughput (Mbps)"
          data={networkData}
          labels={networkLabels}
          color="#ff00ff"
          maxValue={200}
          delay={1.4}
        />
      </div>

      <button
        onClick={() => setMode('terminal')}
        className="mt-10 px-8 py-4 bg-accent text-background rounded-lg text-xl font-bold hover:bg-opacity-80 transition-colors duration-300"
      >
        Return to Terminal
      </button>
    </div>
  );
};

export default Dashboard;
