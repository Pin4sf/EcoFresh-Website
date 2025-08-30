import React from 'react';
import { VantaCells } from './vanta-cells';

export function VantaCellsDemo() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <VantaCells 
        color1="#67C090"
        color2="#124170"
        size={1.00}
        mouseControls={true}
        touchControls={true}
        gyroControls={false}
        minHeight={200.00}
        minWidth={200.00}
        scale={1.00}
        className="opacity-90"
      >
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl font-bold mb-8">Vanta.js Cells Demo</h1>
          <p className="text-xl opacity-90">Interactive animated background effect</p>
        </div>
      </VantaCells>
    </div>
  );
}
