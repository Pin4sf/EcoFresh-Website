import { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Plane } from '@react-three/drei'
import * as THREE from 'three'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(mobileRegex.test(userAgent) || (isTouchDevice && isSmallScreen))
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

const MAX_STEPS = 128
const PRECISION = 0.0005

const createInitialState = (amount) => ({
  positions: Array.from({ length: amount }, () => new THREE.Vector3(0, 0, 0)),
  rotations: Array.from({ length: amount }, () => new THREE.Vector3(0, 0, 0)),
  baseOffsets: Array.from({ length: amount }, (_, i) => {
    const t = (i / amount) * Math.PI * 2
    return {
      x: Math.cos(t) * 1.75,
      y: Math.sin(t) * 4.5,
      // Original motion speeds (restored)
      posSpeed: new THREE.Vector3(
        1.0 + Math.random() * 4,
        1.0 + Math.random() * 3.5,
        0.5 + Math.random() * 2.0
      ),
      rotSpeed: new THREE.Vector3(
        0.1 + Math.random() * 1,
        0.1 + Math.random() * 1,
        0.1 + Math.random() * 1
      ),
      posPhase: new THREE.Vector3(
        t + Math.random() * Math.PI * 3.0,
        t * 1.3 + Math.random() * Math.PI * 3.0,
        t * 0.7 + Math.random() * Math.PI * 3.0
      ),
      rotPhase: new THREE.Vector3(
        t * 0.5 + Math.random() * Math.PI * 2.0,
        t * 0.8 + Math.random() * Math.PI * 2.0,
        t * 1.1 + Math.random() * Math.PI * 2.0
      )
    }
  })
})

const GLSL_ROTATE = `
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
}`

const GLSL_SDF = `
float sdBox( vec3 p, vec3 b ) {
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}`

const GLSL_OPERATIONS = `
float opUnion( float d1, float d2 ) { return min(d1,d2); }
float opSubtraction( float d1, float d2 ) { return max(-d1,d2); }
float opIntersection( float d1, float d2 ) { return max(d1,d2); }
float opSmoothUnion( float d1, float d2, float k ) {
  float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
  return mix( d2, d1, h ) - k*h*(1.0-h);
}`

const vertexShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const createFragmentShader = (amount) => `
uniform float u_time;
uniform float u_aspect;
uniform vec3 u_positions[${amount}];
uniform vec3 u_rotations[${amount}];
varying vec2 v_uv;
const int MaxCount = ${amount};
const float PI = 3.14159265358979;
${GLSL_SDF}
${GLSL_OPERATIONS}
${GLSL_ROTATE}

// EcoFresh palette
// base: #DDF4E7, accent: #26667F
vec3 paletteBase() { return vec3(221.0/255.0, 244.0/255.0, 231.0/255.0); }
vec3 paletteAccent() { return vec3(38.0/255.0, 102.0/255.0, 127.0/255.0); }

float sdf(vec3 p) {
  vec3 correct = 0.1 * vec3(u_aspect, 1.0, 1.0);
  vec3 tp = p + -u_positions[0] * correct;
  vec3 rp = tp;
  rp = rotate(rp, vec3(1.0, 1.0, 0.0), u_rotations[0].x + u_rotations[0].y);
  float final = sdBox(rp, vec3(0.15)) - 0.03;
  for(int i = 1; i < MaxCount; i++) {
    tp = p + -u_positions[i] * correct;
    rp = tp;
    rp = rotate(rp, vec3(1.0, 1.0, 0.0), u_rotations[i].x + u_rotations[i].y);
    float box = sdBox(rp, vec3(0.15)) - 0.03;
    final = opSmoothUnion(final, box, 0.4);
  }
  return final;
}

vec3 calcNormal(in vec3 p) {
  const float h = 0.001;
  return normalize(vec3(
    sdf(p + vec3(h, 0, 0)) - sdf(p - vec3(h, 0, 0)),
    sdf(p + vec3(0, h, 0)) - sdf(p - vec3(0, h, 0)),
    sdf(p + vec3(0, 0, h)) - sdf(p - vec3(0, 0, h))
  ));
}

vec3 getMaterial(vec3 normal, vec3 viewDir, float time) {
  float fres = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.0);
  float hue = dot(normal, viewDir) * PI + time * 0.15; // slowed
  vec3 base = paletteBase();
  vec3 accent = paletteAccent();
  vec3 wave = mix(base, accent, 0.35 + 0.35 * sin(hue));
  return wave * (0.6 + 0.4 * fres);
}

vec3 getBackground(vec2 uv) {
  // darker vertical gradient for better text readability
  vec3 top = mix(paletteBase(), paletteAccent(), 0.70);
  vec3 bottom = mix(paletteBase(), paletteAccent(), 0.90);
  float t = smoothstep(-1.0, 1.0, uv.y);
  vec3 grad = mix(bottom, top, t);
  float r = length(uv);
  float vignette = smoothstep(0.9, 0.2, r);
  return mix(grad, grad * 0.9, vignette);
}

void main() {
  vec2 centeredUV = (v_uv - 0.5) * vec2(u_aspect, 1.0);
  vec3 ray = normalize(vec3(centeredUV, -1.0));
  vec3 camPos = vec3(0.0, 0.0, 2.3);
  vec3 rayPos = camPos;
  float totalDist = 0.0;
  float tMax = 5.0;
  for(int i = 0; i < ${MAX_STEPS}; i++) {
    float dist = sdf(rayPos);
    if (dist < ${PRECISION} || tMax < totalDist) break;
    totalDist += dist;
    rayPos = camPos + totalDist * ray;
  }
  vec3 color = getBackground(centeredUV);
  if(totalDist < tMax) {
    vec3 normal = calcNormal(rayPos);
    vec3 viewDir = normalize(camPos - rayPos);
    vec3 lightDir = normalize(vec3(-0.5, 0.8, 0.6));
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 24.0);
    vec3 mat = getMaterial(normal, viewDir, u_time);
    float rim = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
    vec3 rimColor = paletteAccent() * 0.4 * rim;
    color = color * 0.7 + mat * (0.5 + 0.5 * diff) + vec3(1.0) * spec * 0.25 + rimColor;
    float fog = 1.0 - exp(-totalDist * 0.15);
    vec3 fogColor = getBackground(centeredUV) * 0.6;
    color = mix(color, fogColor, fog);
  }
  gl_FragColor = vec4(color, 1.0);
}`

const ScreenPlane = ({ animationState, amount }) => {
  const { viewport } = useThree()
  const materialRef = useRef(null)
  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_aspect: { value: viewport.width / viewport.height },
    u_positions: { value: animationState.positions },
    u_rotations: { value: animationState.rotations },
  }), [viewport.width, viewport.height, animationState.positions, animationState.rotations])

  useFrame((_, delta) => {
    if (materialRef.current) {
      // original speed
      materialRef.current.uniforms.u_time.value += delta
      const time = materialRef.current.uniforms.u_time.value
      animationState.baseOffsets.forEach((offset, i) => {
        const wanderX = Math.sin(time * offset.posSpeed.x + offset.posPhase.x) * 0.8
        const wanderY = Math.cos(time * offset.posSpeed.y + offset.posPhase.y) * 5
        const wanderZ = Math.sin(time * offset.posSpeed.z + offset.posPhase.z) * 0.5
        const secondaryX = Math.cos(time * offset.posSpeed.x * 0.7 + offset.posPhase.x * 1.3) * 0.4
        const secondaryY = Math.sin(time * offset.posSpeed.y * 0.8 + offset.posPhase.y * 1.1) * 0.3
        animationState.positions[i].set(
          offset.x + wanderX + secondaryX,
          offset.y + wanderY + secondaryY,
          wanderZ
        )
        animationState.rotations[i].set(
          time * offset.rotSpeed.x + offset.rotPhase.x,
          time * offset.rotSpeed.y + offset.rotPhase.y,
          time * offset.rotSpeed.z + offset.rotPhase.z
        )
        materialRef.current.uniforms.u_positions.value[i].copy(animationState.positions[i])
        materialRef.current.uniforms.u_rotations.value[i].copy(animationState.rotations[i])
      })
    }
  })

  return (
    <Plane args={[1, 1]} scale={[viewport.width, viewport.height, 1]}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={createFragmentShader(amount)}
        transparent={true}
      />
    </Plane>
  )
}

const AnimationController = ({ animationState }) => {
  useEffect(() => {
    animationState.baseOffsets.forEach((offset, i) => {
      animationState.positions[i].set(offset.x, offset.y, 0)
      animationState.rotations[i].set(0, 0, 0)
    })
  }, [])
  return null
}

export const NeonRaymarcher = ({ className = '' }) => {
  const isMobile = useIsMobile()
  const amount = isMobile ? 3 : 4
  const [animationState] = useState(() => createInitialState(amount))
  const cameraConfig = useMemo(() => ({
    position: [0, 0, 15],
    fov: 50,
    near: 0.1,
    far: 2000,
  }), [])

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={cameraConfig}
        dpr={1}
        frameloop="always"
        gl={{ 
          alpha: true,
          antialias: !isMobile,
          powerPreference: 'high-performance'
        }}
      >
        <AnimationController animationState={animationState} />
        <ScreenPlane animationState={animationState} amount={amount} />
      </Canvas>
    </div>
  )
}

export default NeonRaymarcher


