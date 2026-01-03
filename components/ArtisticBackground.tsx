'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform float uShift; // 0.0 = Hero Palette, 1.0 = Content Palette
uniform float uBlackout; // 0.0 = Colorful, 1.0 = Black
uniform vec2 uResolution;
varying vec2 vUv;

// Palette 1: "Electric Dreams" (Hero) - Cool, Cybernetic, Vibrant
vec3 p1_A = vec3(0.1, 0.0, 0.3); // Deep Indigo
vec3 p1_B = vec3(0.0, 0.4, 0.9); // Electric Blue
vec3 p1_C = vec3(0.8, 0.0, 1.0); // Neon Purple
vec3 p1_D = vec3(0.0, 0.9, 0.8); // Cyan

// Palette 2: "Nordic Night" (Content) - Clean, Professional, Deep
vec3 p2_A = vec3(0.01, 0.02, 0.05); // Deep Space Black
vec3 p2_B = vec3(0.1, 0.15, 0.25);  // Cool Grey
vec3 p2_C = vec3(0.2, 0.3, 0.4);    // Slate Blue
vec3 p2_D = vec3(0.2, 0.7, 1.0);    // Sky Blue

// Noise function
float random (in vec2 _st) {
    return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 st = gl_FragCoord.xy/uResolution.xy;
    st.x *= uResolution.x/uResolution.y;

    // MOTION SHIFT: Modulate warp/zoom based on uShift
    float warp = 1.0 + uShift * 1.5; // Increases distortion
    float zoom = 1.0 - uShift * 0.3; // Zooms out slightly

    vec2 q = vec2(0.);
    q.x = fbm( st * zoom + 0.00 * uTime);
    q.y = fbm( st * zoom + vec2(1.0));

    vec2 r = vec2(0.);
    // Apply warp to the second layer of FBM
    r.x = fbm( st * zoom + 1.0 * q * warp + vec2(1.7,9.2) + 0.15 * uTime );
    r.y = fbm( st * zoom + 1.0 * q * warp + vec2(8.3,2.8) + 0.126 * uTime);

    float f = fbm(st + r);

    // Mix palettes based on uShift
    vec3 cA = mix(p1_A, p2_A, uShift);
    vec3 cB = mix(p1_B, p2_B, uShift);
    vec3 cC = mix(p1_C, p2_C, uShift);
    vec3 cD = mix(p1_D, p2_D, uShift);

    vec3 color = mix(cA, cB, clamp((f*f)*4.0,0.0,1.0));
    color = mix(color, cC, clamp(length(q),0.0,1.0));
    color = mix(color, cD, clamp(length(r.x),0.0,1.0));

    // Add grain
    float grain = random(vUv * uTime) * 0.1;
    color += grain;

    // Apply blackout (fade to black)
    color = mix(color, vec3(0.01), uBlackout);

    gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);
}
`;

export default function ArtisticBackground({ shift = 0, blackout = 0 }: { shift?: number, blackout?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    const container = containerRef.current;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uTime: { value: 0.0 },
      uShift: { value: 0.0 },
      uBlackout: { value: 0.0 },
      uResolution: { value: new THREE.Vector2() }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onWindowResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.uResolution.value.x = renderer.domElement.width;
      uniforms.uResolution.value.y = renderer.domElement.height;
    };

    window.addEventListener('resize', onWindowResize);
    onWindowResize(); // Initial set

    const animate = (time: number) => {
      uniforms.uTime.value = time * 0.0005;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // Update uniforms when props change
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uShift.value = shift;
      materialRef.current.uniforms.uBlackout.value = blackout;
    }
  }, [shift, blackout]);

  return <div ref={containerRef} className="fixed inset-0 -z-50 w-full h-full" />;
}