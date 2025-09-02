import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;

    try {
      // Scene
      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor("#0d1117"); // dark background
      mountRef.current.appendChild(renderer.domElement);

      // Geometry: Moving particles
      const particleCount = 5000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 50;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.05 });
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Lighting
      const light = new THREE.PointLight(0xffffff, 1);
      light.position.set(5, 5, 5);
      scene.add(light);

      // Animate
      const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0008;
        particles.rotation.x += 0.0003;
        renderer?.render(scene, camera);
      };
      animate();

      // Handle Resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer?.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (renderer) {
          mountRef.current?.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch (err) {
      console.error("Three.js initialization failed:", err);
      setError(true);
    }
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        backgroundColor: "#0d1117", // fallback background
        display: error ? "flex" : "block",
        alignItems: error ? "center" : undefined,
        justifyContent: error ? "center" : undefined,
        color: error ? "white" : undefined,
      }}
    >
      {error && <p>⚠️ Background animation failed to load</p>}
    </div>
  );
};

export default ThreeBackground;
