import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Dog } from "./components/Dog";

export default function App() {
  const cloud1Ref = useRef<SVGGElement>(null);
  const cloud2Ref = useRef<SVGGElement>(null);
  const cloud3Ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const clouds = [
      { ref: cloud1Ref, duration: 25, yMove: 15 },
      { ref: cloud2Ref, duration: 35, yMove: 20 },
      { ref: cloud3Ref, duration: 30, yMove: 12 },
    ];

    clouds.forEach((cloud) => {
      if (!cloud.ref.current) return;
      
      // Horizontal drift
      gsap.to(cloud.ref.current, {
        x: 1200,
        duration: cloud.duration,
        repeat: -1,
        ease: "none",
        modifiers: {
          x: gsap.utils.wrap(-300, 1200),
        },
      });

      // Vertical float
      gsap.to(cloud.ref.current, {
        y: `+=${cloud.yMove}`,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });

    
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* 1. BACKGROUND LAYER */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <svg
          viewBox="0 0 1000 600"
          style={{ width: '100%', height: '100%', display: 'block' }}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#dbeafe" />
            </linearGradient>
          </defs>
          <rect width="1000" height="600" fill="url(#skyGradient)" />

          {/* HIGH-DETAIL CLOUD 1 */}
          <g ref={cloud1Ref}>
            <circle cx="100" cy="85" r="28" fill="white" opacity="0.95" />
            <circle cx="125" cy="75" r="35" fill="white" opacity="0.95" />
            <circle cx="150" cy="80" r="32" fill="white" opacity="0.95" />
            <circle cx="110" cy="95" r="25" fill="white" opacity="0.95" />
            <circle cx="140" cy="95" r="28" fill="white" opacity="0.95" />
            <ellipse cx="125" cy="90" rx="60" ry="30" fill="white" opacity="0.95" />
          </g>

          {/* HIGH-DETAIL CLOUD 2 */}
          <g ref={cloud2Ref}>
            <circle cx="400" cy="125" r="32" fill="white" opacity="0.9" />
            <circle cx="430" cy="115" r="40" fill="white" opacity="0.9" />
            <circle cx="465" cy="120" r="38" fill="white" opacity="0.9" />
            <circle cx="495" cy="125" r="30" fill="white" opacity="0.9" />
            <circle cx="415" cy="140" r="28" fill="white" opacity="0.9" />
            <circle cx="450" cy="140" r="32" fill="white" opacity="0.9" />
            <circle cx="480" cy="138" r="28" fill="white" opacity="0.9" />
            <ellipse cx="450" cy="130" rx="75" ry="35" fill="white" opacity="0.9" />
          </g>

          {/* HIGH-DETAIL CLOUD 3 */}
          <g ref={cloud3Ref}>
            <circle cx="700" cy="105" r="30" fill="white" opacity="0.92" />
            <circle cx="730" cy="95" r="38" fill="white" opacity="0.92" />
            <circle cx="760" cy="100" r="35" fill="white" opacity="0.92" />
            <circle cx="790" cy="105" r="28" fill="white" opacity="0.92" />
            <circle cx="715" cy="118" r="26" fill="white" opacity="0.92" />
            <circle cx="750" cy="120" r="30" fill="white" opacity="0.92" />
            <circle cx="775" cy="118" r="26" fill="white" opacity="0.92" />
            <ellipse cx="745" cy="110" rx="70" ry="32" fill="white" opacity="0.92" />
          </g>

          {/* Grass & Road */}
          <rect y="400" width="1000" height="200" fill="#a6d48b" />
          <rect y="500" width="1000" height="100" fill="#4a4a4a" />
          <line x1="0" y1="550" x2="1000" y2="550" stroke="#edc951" strokeWidth="4" strokeDasharray="30 20" opacity="0.8" />
        </svg>
      </div>

      {/* 2. 3D DOG LAYER */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        zIndex: 2, 
        pointerEvents: 'none' 
      }}>
        <Canvas camera={{ position: [4, 1.2, 0], fov: 50 }}>
          <ambientLight intensity={2.5} />
          <directionalLight position={[5, 10, 5]} intensity={2} />
          <Dog />
        </Canvas>
      </div>

    </div>
  );
}