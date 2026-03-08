'use client';

import { motion } from 'framer-motion';

export default function GithubStats() {
  return (
    <div className="mt-12 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-accent flex items-center gap-2">
        <span className="text-3xl">&#128187;</span> GitHub Activity
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GitHub Stats Card */}
        <div className="glass p-1 rounded-xl overflow-hidden group">
          <img 
            src="https://github-readme-stats.vercel.app/api?username=abhijeetmohanan&show_icons=true&theme=transparent&hide_border=true&title_color=38bdf8&text_color=94a3b8&icon_color=38bdf8&text_bold=false" 
            alt="GitHub Stats"
            className="w-full h-auto"
          />
        </div>
        
        {/* Top Languages Card */}
        <div className="glass p-1 rounded-xl overflow-hidden group">
          <img 
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=abhijeetmohanan&layout=compact&theme=transparent&hide_border=true&title_color=38bdf8&text_color=94a3b8&langs_count=6" 
            alt="Top Languages"
            className="w-full h-auto"
          />
        </div>
      </div>
      
      {/* Contribution Graph - Full Width */}
      <div className="mt-6 glass p-4 rounded-xl overflow-hidden group">
        <img 
          src="https://github-readme-streak-stats.herokuapp.com/?user=abhijeetmohanan&theme=transparent&hide_border=true&stroke=38bdf8&ring=38bdf8&fire=38bdf8&currStreakLabel=38bdf8&sideNums=94a3b8&sideLabels=94a3b8&dates=94a3b8" 
          alt="GitHub Streak"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
