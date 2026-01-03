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

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    
    // Perspective projection
    float t = uTime * 0.5;
    vec3 col = vec3(0.0);
    
    // Horizon
    float horizon = 0.0;
    if (uv.y < horizon) {
        // Grid Logic
        float z = 0.5 / abs(uv.y - horizon);
        
        // Moving grid
        float speed = 2.0;
        vec2 gridUV = vec2(uv.x * z * 2.0, z + t * speed);
        
        // Lines
        float gridVal = 0.0;
        gridVal += step(0.98, fract(gridUV.x)); // Vertical lines
        gridVal += step(0.98, fract(gridUV.y)); // Horizontal lines
        
        // Fade into distance
        float fade = smoothstep(0.0, 0.5, abs(uv.y - horizon));
        
        // Neon Color (Pink/Cyan)
        vec3 gridColor = mix(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 1.0), sin(t * 0.5) * 0.5 + 0.5);
        
        col = vec3(gridVal) * gridColor * fade;
        
        // Floor glow
        col += vec3(0.1, 0.0, 0.2) * fade * 0.5;
    } else {
        // Sky (Retro Sun or emptiness)
        // Just deep space for now
        col = vec3(0.0);
    }

    gl_FragColor = vec4(col, 1.0);
}
`;

export default function GridBackground({ opacity = 0 }: { opacity: number }) {
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
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onWindowResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.uResolution.value.x = renderer.domElement.width;
      uniforms.uResolution.value.y = renderer.domElement.height;
    };

    window.addEventListener('resize', onWindowResize);
    onWindowResize(); 

    const animate = (time: number) => {
      uniforms.uTime.value = time * 0.001;
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

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-30 w-full h-full pointer-events-none transition-opacity duration-1000"
      style={{ opacity }}
    />
  );
}
