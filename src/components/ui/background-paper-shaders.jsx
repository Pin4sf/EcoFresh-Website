"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Custom shader material for advanced effects
const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.1 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.05 * intensity;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec2 uv = vUv;
    
    // Create animated noise pattern
    float noise = sin(uv.x * 20.0 + time) * cos(uv.y * 15.0 + time * 0.8);
    noise += sin(uv.x * 35.0 - time * 2.0) * cos(uv.y * 25.0 + time * 1.2) * 0.5;
    
    // Mix colors based on noise and position
    vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
    color = mix(color, vec3(1.0), pow(abs(noise), 2.0) * intensity);
    
    // Add glow effect
    float glow = 1.0 - length(uv - 0.5) * 2.0;
    glow = pow(glow, 2.0);
    
    gl_FragColor = vec4(color * glow, glow * 0.8);
  }
`

export function ShaderPlane({
  position,
  color1 = "#67c090", // EcoFresh primary1
  color2 = "#ddf4e7", // EcoFresh bg1
}) {
  const mesh = useRef(null)

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      intensity: { value: 1.0 },
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
    }),
    [color1, color2],
  )

  useFrame((state) => {
    if (mesh.current) {
      uniforms.time.value = state.clock.elapsedTime
      uniforms.intensity.value = 1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.3
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export function EnergyRing({
  radius = 1,
  position = [0, 0, 0],
}) {
  const mesh = useRef(null)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z = state.clock.elapsedTime
      mesh.current.material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <ringGeometry args={[radius * 0.8, radius, 32]} />
      <meshBasicMaterial color="#67c090" transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  )
}

// EcoFresh-themed background component
export function EcoFreshBackground() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#ddf4e7] via-[#67c090]/20 to-[#26667f]/30 relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#67c090]/10 via-[#26667f]/5 to-[#ddf4e7]/10 animate-pulse" 
           style={{ animationDuration: '8s' }} />
      
      {/* Floating energy orbs */}
      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-[#67c090]/20 rounded-full blur-3xl animate-pulse"
           style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-[#26667f]/15 rounded-full blur-2xl animate-pulse"
           style={{ animationDuration: '4s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-[#ddf4e7]/25 rounded-full blur-xl animate-pulse"
           style={{ animationDuration: '7s', animationDelay: '1s' }} />
      
             {/* Subtle mesh pattern overlay */}
       <div className="absolute inset-0 opacity-20">
         <div className="w-full h-full" style={{
           backgroundImage: `radial-gradient(circle at 30px 30px, #67c090 2px, transparent 2px)`,
           backgroundSize: '60px 60px'
         }} />
       </div>
      
      {/* Animated wave effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#67c090]/10 to-transparent rounded-full animate-spin"
             style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#26667f]/10 to-transparent rounded-full animate-spin"
             style={{ animationDuration: '25s' }} />
      </div>
    </div>
  )
}
