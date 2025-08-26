import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
uniform float time;
uniform vec4 resolution;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform float time;
uniform vec4 resolution;
uniform bool isMobile;

float PI = 3.141592653589793238;

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
}

float smin( float a, float b, float k ) {
    k *= 6.0;
    float h = max( k-abs(a-b), 0.0 )/k;
    return min(a,b) - h*h*h*k*(1.0/6.0);
}

float sphereSDF(vec3 p, float r) {
    return length(p) - r;
}

float sdf(vec3 p) {
    vec3 p1 = rotate(p, vec3(0.0, 0.0, 1.0), time/8.0);
    vec3 p2 = rotate(p, vec3(1.0, 0.0, 0.0), -time/7.0);
    vec3 p3 = rotate(p, vec3(1.0, 1.0, 0.0), -time/6.5);
    vec3 p4 = rotate(p, vec3(0.0, 1.0, 0.0), -time/6.0);
    
    float final = sphereSDF(p1 - vec3(-0.5, 0.0, 0.0), 0.35);
    float nextSphere = sphereSDF(p2 - vec3(0.55, 0.0, 0.0), 0.3);
    final = smin(final, nextSphere, 0.1);
    nextSphere = sphereSDF(p2 - vec3(-0.8, 0.0, 0.0), 0.2);
    final = smin(final, nextSphere, 0.1);
    nextSphere = sphereSDF(p3 - vec3(1.0, 0.0, 0.0), 0.15);
    final = smin(final, nextSphere, 0.1);
    nextSphere = sphereSDF(p4 - vec3(0.45, -0.45, 0.0), 0.15);
    final = smin(final, nextSphere, 0.1);
    
    return final;
}

vec3 getNormal(vec3 p) {
    float d = 0.001;
    return normalize(vec3(
        sdf(p + vec3(d, 0.0, 0.0)) - sdf(p - vec3(d, 0.0, 0.0)),
        sdf(p + vec3(0.0, d, 0.0)) - sdf(p - vec3(0.0, d, 0.0)),
        sdf(p + vec3(0.0, 0.0, d)) - sdf(p - vec3(0.0, 0.0, d))
    ));
}

float rayMarch(vec3 rayOrigin, vec3 ray) {
    float t = 0.0;
    int maxIterations = isMobile ? 64 : 75;
    for (int i = 0; i < 80; i++) {
        if (i >= maxIterations) break;
        vec3 p = rayOrigin + ray * t;
        float d = sdf(p);
        if (d < 0.001) return t;
        t += d;
        if (t > 50.0) break;
    }
    return -1.0;
}

void main() {
    vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
    vec3 cameraPos = vec3(0.0, 0.0, 5.0);
    vec3 ray = normalize(vec3((vUv - vec2(0.5)) * resolution.zw, -1));
    
    float t = rayMarch(cameraPos, ray);
    if (t > 0.0) {
        vec3 p = cameraPos + ray * t;
        vec3 normal = getNormal(p);
        float fresnel = pow(1.0 + dot(ray, normal), 2.0);
        
                 // Vibrant, contrasty color scheme
         vec3 color1 = vec3(0.867, 0.957, 0.906); // #DDF4E7 - Light mint
         vec3 color2 = vec3(0.404, 0.753, 0.565); // #67C090 - Medium green
         vec3 color3 = vec3(0.149, 0.400, 0.498); // #26667F - Teal blue
         vec3 color4 = vec3(0.071, 0.255, 0.439); // #124170 - Deep blue
         vec3 color5 = vec3(0.965, 0.945, 0.914); // #F6F1E9 - Cream
         vec3 color6 = vec3(0.031, 0.796, 0.000); // #08CB00 - Bright green
         
         // Create dynamic gradient based on position and time
         float noise1 = sin(p.x * 8.0 + time * 0.5) * sin(p.y * 8.0 + time * 0.3) * 0.5 + 0.5;
         float noise2 = sin(p.x * 12.0 + time * 0.7) * sin(p.y * 12.0 + time * 0.4) * 0.5 + 0.5;
         float noise3 = sin(p.x * 6.0 + time * 0.2) * sin(p.y * 6.0 + time * 0.6) * 0.5 + 0.5;
         
         // Blend multiple colors for rich, vibrant effect
         vec3 color = mix(color1, color2, noise1);
         color = mix(color, color3, noise2 * 0.6);
         color = mix(color, color4, sin(time * 0.4) * 0.4 + 0.4);
         color = mix(color, color5, noise3 * 0.3);
         color = mix(color, color6, fresnel * 0.4);
         
         // Vibrant, high-opacity background
         gl_FragColor = vec4(color, 0.85);
     } else {
         // Vibrant background color
         vec3 bgColor = vec3(0.149, 0.400, 0.498); // #26667F - Teal blue base
         gl_FragColor = vec4(bgColor, 0.8);
     }
}
`;

function FluidBlobShader() {
  const meshRef = useRef();
  const { size } = useThree();
  
  // Detect mobile device
  const isMobile = useMemo(() => {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);
  
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    resolution: { value: new THREE.Vector4() },
    isMobile: { value: isMobile }
  }), [isMobile]);

  // Update resolution when size changes
  React.useEffect(() => {
    const { width, height } = size;
    const imageAspect = 1;
    let a1, a2;
    
    if (height / width > imageAspect) {
      a1 = (width / height) * imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = (height / width) / imageAspect;
    }
    
    uniforms.resolution.value.set(width, height, a1, a2);
  }, [size, uniforms]);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 5]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export const FluidBlob = ({ className = "" }) => {
  return (
    <div className={`w-full h-full ${className}`} style={{ position: "absolute", top: 0, left: 0 }}>
      <Canvas
        camera={{
          left: -0.5,
          right: 0.5,
          top: 0.5,
          bottom: -0.5,
          near: -1000,
          far: 1000,
          position: [0, 0, 2]
        }}
        orthographic
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]} // Optimize for different device pixel ratios
      >
        <FluidBlobShader />
      </Canvas>
    </div>
  );
}
