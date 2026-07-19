import React, { useState, useEffect, useMemo } from 'react';
import Tree from 'react-d3-tree';

// Define the full path
const fullData = {
  name: "Sun's Energy",
  attributes: { desc: "Short-wave Radiation" },
  children: [{
    name: "Ground Absorption",
    attributes: { desc: "Surface Warms" },
    children: [{
      name: "Trapping Mechanism",
      attributes: { desc: "GHG Vibration" },
      children: [{ 
        name: "Global Accumulation", 
        attributes: { desc: "Heat Retained" } 
      }]
    }]
  }]
};

// Helper: Recursively prune the tree based on current step
const pruneTree = (node: any, targetDepth: number, currentDepth: number = 0): any => {
  if (currentDepth >= targetDepth) {
    return { ...node, children: [] }; // Cut off children
  }
  return {
    ...node,
    children: node.children?.map((child: any) => pruneTree(child, targetDepth, currentDepth + 1))
  };
};

const CustomNode = ({ nodeDatum }: any) => (
  <g>
    <circle r="25" className="animate-pulse fill-sky-500/30 stroke-sky-400 stroke-2" />
    <circle r="10" className="fill-sky-400" />
    <foreignObject width={160} height={80} x={-80} y={40}>
      <div className="bg-slate-800 border border-sky-500 rounded-lg p-2 text-center text-white shadow-md">
        <strong className="block text-[10px] font-bold text-sky-300">{nodeDatum.name}</strong>
        <p className="text-[9px] mt-1 text-slate-300">{nodeDatum.attributes?.desc}</p>
      </div>
    </foreignObject>
  </g>
);

const GreenhouseAnimation = () => {
  const [step, setStep] = useState(0); // 0 to 3
  const [isPlaying, setIsPlaying] = useState(false);

  // Dynamically unfold the tree
  const activeData = useMemo(() => pruneTree(fullData, step), [step]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep(prev => (prev < 3 ? prev + 1 : 0));
    }, 2000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="relative w-full h-[600px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-800 to-slate-950" />

      <Tree 
        data={activeData}
        orientation="vertical"
        pathFunc="step"
        renderCustomNodeElement={CustomNode}
        collapsible={false}
        transitionDuration={800}
        translate={{ x: 400, y: 100 }} 
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        nodeSize={{ x: 200, y: 150 }}
      />

      {/* Control Bar */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-6 py-2 bg-sky-500 hover:bg-sky-400 text-black font-bold rounded-full transition-all"
        >
          {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>

        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sky-500 transition-all duration-800 ease-in-out" 
            style={{ width: `${(step / 3) * 100}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

export default GreenhouseAnimation;