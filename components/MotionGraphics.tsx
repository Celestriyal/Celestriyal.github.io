'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MotionGraphics({ opacity = 0 }: { opacity: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const container = containerRef.current;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Shapes Group
    const group = new THREE.Group();
    scene.add(group);

    // Materials
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xffffff, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.4 
    });

    const accentMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x22d3ee, // Cyan
      wireframe: true, 
      transparent: true, 
      opacity: 0.5 
    });

    // Create Abstract Shapes
    const shapes: THREE.Mesh[] = [];

    // 1. Large Icosahedron
    const icosa = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 0), material);
    icosa.position.set(-2, 1, -2);
    group.add(icosa);
    shapes.push(icosa);

    // 2. Torus Knot
    const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.2, 100, 16), accentMaterial);
    torusKnot.position.set(2, -1, -1);
    group.add(torusKnot);
    shapes.push(torusKnot);

    // 3. Octahedron
    const octa = new THREE.Mesh(new THREE.OctahedronGeometry(1, 0), material);
    octa.position.set(0, 2, -3);
    group.add(octa);
    shapes.push(octa);

    // 4. Ring
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.05, 16, 100), accentMaterial);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
    shapes.push(ring);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xffffff,
        transparent: true,
        opacity: 0.3
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particlesMesh);


    const onWindowResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onWindowResize);

    const animate = (time: number) => {
      const t = time * 0.001;

      // Rotate entire group slowly
      group.rotation.y = t * 0.1;
      group.rotation.x = Math.sin(t * 0.2) * 0.1;

      // Individual shape animations
      icosa.rotation.x = t * 0.2;
      icosa.rotation.y = t * 0.3;
      
      torusKnot.rotation.x = t * 0.4;
      torusKnot.rotation.y = t * 0.1;

      octa.rotation.x = -t * 0.2;
      octa.rotation.z = t * 0.1;

      ring.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.2;
      ring.rotation.y = t * 0.05;

      // Float effect
      icosa.position.y = 1 + Math.sin(t) * 0.2;
      torusKnot.position.y = -1 + Math.cos(t * 0.8) * 0.2;
      octa.position.y = 2 + Math.sin(t * 1.2) * 0.1;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      material.dispose();
      accentMaterial.dispose();
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
