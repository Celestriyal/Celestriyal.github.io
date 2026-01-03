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
uniform vec2 uResolution;
varying vec2 vUv;

// Noise function
float random (in vec2 _st) {
    return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

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

    // Deep Space Background
    vec3 color = vec3(0.0, 0.0, 0.02); // Very dark blue base

    // Nebula Clouds
    vec2 q = vec2(0.);
    q.x = fbm( st + 0.05*uTime);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*uTime );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*uTime);

    float f = fbm(st+r);

    // Nebula Colors: Deep Purple, Cosmic Blue, Magenta
    vec3 nebulaColor = mix(
        vec3(0.1, 0.0, 0.2), // Dark Purple
        vec3(0.0, 0.2, 0.5), // Cosmic Blue
        clamp((f*f)*4.0, 0.0, 1.0)
    );

    nebulaColor = mix(nebulaColor, vec3(0.5, 0.0, 0.5), clamp(length(q), 0.0, 1.0)); // Magenta highlights
    nebulaColor = mix(nebulaColor, vec3(0.0, 0.0, 0.1), clamp(length(r.x), 0.0, 1.0)); // Deep voids

    // Add stars (high frequency noise)
    float stars = pow(random(st * 5.0 + uTime * 0.01), 200.0) * 0.5;
    
    color += nebulaColor * 1.5; // Boost nebula brightness
    color += vec3(stars);

    gl_FragColor = vec4(color, 1.0);
}
`;

export default function CosmicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      uResolution: { value: new THREE.Vector2() }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

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
      uniforms.uTime.value = time * 0.0002; // Slow cosmic drift
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

  return <div ref={containerRef} className="fixed inset-0 -z-50 w-full h-full" />;
}
