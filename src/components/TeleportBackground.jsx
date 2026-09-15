import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const WarpStars = (props) => {
    const ref = useRef();
    const count = 1500; // Keep the optimized count but use 3D

    // Create initial positions in a long tunnel
    const [positions] = useMemo(() => {
        const pos = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const r = 2 + Math.random() * 10; // Radius from center
            const theta = Math.random() * Math.PI * 2;

            pos[i * 3] = r * Math.cos(theta); // x
            pos[i * 3 + 1] = r * Math.sin(theta); // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 100; // z (depth)
        }
        return [pos];
    }, []);

    useFrame((state, delta) => {
        const speed = 20;
        const positionsAttr = ref.current.geometry.attributes.position;
        const array = positionsAttr.array;

        for (let i = 0; i < count; i++) {
            array[i * 3 + 2] += delta * speed;
            if (array[i * 3 + 2] > 20) {
                array[i * 3 + 2] = -80;
            }
        }
        positionsAttr.needsUpdate = true;
        ref.current.rotation.z += delta * 0.1;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    usage={THREE.DynamicDrawUsage}
                />
            </bufferGeometry>
            <PointMaterial
                transparent
                color="#00e5ff"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const ShipCore = () => {
    return (
        <mesh position={[0, 0, -50]}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
            <pointLight color="#00e5ff" intensity={5} distance={100} />
        </mesh>
    )
}

const TeleportBackground = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: 'radial-gradient(circle at center, #1a0b2e 0%, #050510 100%)' }}>
            <Canvas
                key="teleport-stars" // The isolation key we had at the start of the hour
                camera={{ position: [0, 0, 5], fov: 60 }}
                dpr={1}
                gl={{ antialias: false, stencil: false, depth: false }}
            >
                <color attach="background" args={['#050510']} />
                <fog attach="fog" args={['#050510', 10, 60]} />
                <WarpStars />
                <ShipCore />
            </Canvas>
        </div>
    );
};

export default TeleportBackground;
