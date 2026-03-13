"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function StarBackground() {
    const ref = useRef<THREE.Points>(null!);
    const { theme } = useTheme();

    const sphere = useMemo(() => {
        const points = new Float32Array(3000 * 3);
        for (let i = 0; i < 3000; i++) {
            // Create an elegant distribution primarily focused in the background
            const r = 2;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi) - 1.5; // Offset to back
            points[i * 3] = x;
            points[i * 3 + 1] = y;
            points[i * 3 + 2] = z;
        }
        return points;
    }, []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 30;
        ref.current.rotation.y -= delta / 40;
        // Subtle float
        ref.current.position.y = Math.sin(state.clock.elapsedTime / 4) * 0.05;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={theme === "light" ? "#1e293b" : "#ffffff"}
                    size={0.0015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.3}
                />
            </Points>
        </group>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 -z-10 opacity-60">
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
                <StarBackground />
            </Canvas>
        </div>
    );
}
