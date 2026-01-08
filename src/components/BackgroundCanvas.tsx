import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
    const ref = useRef<THREE.Points>(null!);

    const [positions, setPositions] = React.useState(() => {
        const pos = new Float32Array(2000 * 3);
        for (let i = 0; i < 2000; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        return pos;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta / 10;
            ref.current.rotation.y += delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00FF41"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
}

function Grid() {
    return (
        <gridHelper
            args={[100, 50, '#00FF41', '#004411']}
            position={[0, -5, 0]}
            rotation={[0, 0, 0]}
            opacity={0.1}
            transparent
        />
    );
}

export default function BackgroundCanvas() {
    return (
        <div className="fixed inset-0 -z-10 bg-void">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <color attach="background" args={['#050505']} />
                <StarField />
                <Grid />
                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    );
}
