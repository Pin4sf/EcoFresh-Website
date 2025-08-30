import React, { useState } from 'react';
import { VantaTopology } from './vanta-topology';

export function VantaTopologyDemo() {
  const [color, setColor] = useState('#67C090');
  const [backgroundColor, setBackgroundColor] = useState('#DDF4E7');
  const [mouseControls, setMouseControls] = useState(true);

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Controls */}
      <div className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-md rounded-lg p-4 shadow-lg">
        <h3 className="text-lg font-bold mb-3">Vanta Topology Settings</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Line Color:</label>
            <input 
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Background Color:</label>
            <input 
              type="color" 
              value={backgroundColor} 
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-full h-10 border rounded"
            />
          </div>
          
          <div>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={mouseControls} 
                onChange={(e) => setMouseControls(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Mouse Controls</span>
            </label>
          </div>
        </div>
      </div>

      {/* Topology Display */}
      <div className="flex-1">
        <VantaTopology
          color={color}
          backgroundColor={backgroundColor}
          mouseControls={mouseControls}
          touchControls={true}
          gyroControls={false}
          minHeight={200.00}
          minWidth={200.00}
          scale={1.00}
          scaleMobile={1.00}
          className="opacity-90"
        >
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white">
              <h1 className="text-6xl font-bold mb-8">Vanta Topology Demo</h1>
              <p className="text-xl opacity-90">Interactive animated topology background</p>
            </div>
          </div>
        </VantaTopology>
      </div>

      {/* Info Panel */}
      <div className="fixed bottom-4 right-4 bg-black/80 text-white rounded-lg p-4 text-sm">
        <div className="space-y-1">
          <div>Line Color: {color}</div>
          <div>Background: {backgroundColor}</div>
          <div>Mouse Controls: {mouseControls ? 'Enabled' : 'Disabled'}</div>
        </div>
      </div>
    </div>
  );
}
