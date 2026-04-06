'use client';
import { useEffect, useRef } from 'react';

export default function Landing3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensuring THREE is available from Next's Script strategy
    const initTimer = setTimeout(() => {
      // @ts-ignore
      if (typeof window === 'undefined' || !window.THREE) return;
      // @ts-ignore
      const THREE = window.THREE;
      const currentMount = mountRef.current;
      if (!currentMount) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
      camera.position.z = 15;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      currentMount.appendChild(renderer.domElement);

      // --- TECHNICAL WIREFRAME SHELL (NOW PRIMARY) ---
      const outerGeo = new THREE.IcosahedronGeometry(4.5, 2);
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.8, // Increased opacity since inner is gone
        emissive: 0xf59e0b,
        emissiveIntensity: 0.8
      });
      const outerShell = new THREE.Mesh(outerGeo, outerMat);
      scene.add(outerShell);

      // Glow effect for the wireframe
      const glowGeo = new THREE.IcosahedronGeometry(4.6, 2);
      const glowMat = new THREE.MeshBasicMaterial({
          color: 0xfbbf24,
          wireframe: true,
          transparent: true,
          opacity: 0.2
      });
      const glowShell = new THREE.Mesh(glowGeo, glowMat);
      scene.add(glowShell);

      // --- DYNAMIC PARTICLE VORTEX ---
      const particlesCount = 1000;
      const posArray = new Float32Array(particlesCount * 3);
      const originalPosArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i += 3) {
        const radius = 7 + Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = radius * Math.cos(phi);

        originalPosArray[i] = posArray[i];
        originalPosArray[i + 1] = posArray[i+1];
        originalPosArray[i + 2] = posArray[i+2];
      }

      const particlesGeo = new THREE.BufferGeometry();
      particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      const particlesMat = new THREE.PointsMaterial({
        size: 0.08,
        color: 0xfde68a,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      const particles = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particles);

      // Enhanced Lighting for "Pop"
      const ambientLight = new THREE.AmbientLight(0xffffff, 2);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xffffff, 4);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);

      // --- INTERACTIVITY LOGIC ---
      let mouseX = 0;
      let mouseY = 0;
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove);

      let time = 0;
      const animate = () => {
        requestAnimationFrame(animate);
        time += 0.05;

        // Shell Pulse (Subtle scale jitter)
        const pulse = 1 + Math.sin(time * 2) * 0.02;
        outerShell.scale.set(pulse, pulse, pulse);
        outerMat.emissiveIntensity = 0.8 + Math.sin(time * 2) * 0.2;

        // Rotation
        outerShell.rotation.y += 0.008 + mouseX * 0.04;
        outerShell.rotation.z += 0.004 + mouseY * 0.04;
        
        glowShell.rotation.y -= 0.004;
        glowShell.scale.set(pulse + 0.05, pulse + 0.05, pulse + 0.05);

        // Vortex Particle Swirl (responding to mouse tilt)
        particles.rotation.y += 0.002 + mouseX * 0.08;
        particles.rotation.x += mouseY * 0.08;
        
        // Simple sin-wave jitter on particles
        const positions = particlesGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < particlesCount * 3; i += 3) {
            positions[i+1] = originalPosArray[i+1] + Math.sin(time + originalPosArray[i]) * 0.5;
        }
        particlesGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      };
      
      animate();

      const handleResize = () => {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (currentMount && renderer.domElement.parentNode) {
          currentMount.removeChild(renderer.domElement);
        }
        renderer.dispose();
        outerGeo.dispose();
        outerMat.dispose();
        glowGeo.dispose();
        glowMat.dispose();
        particlesGeo.dispose();
      };
    }, 800);

    return () => clearTimeout(initTimer);
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', minHeight: '650px', cursor: 'pointer' }} />;
}
