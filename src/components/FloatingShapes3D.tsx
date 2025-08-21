"use client";
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const FloatingShapes3D = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const frameRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.set(0, 0, 6);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        rendererRef.current = renderer;

        const width = container.clientWidth || 320;
        const height = container.clientHeight || 320;

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        
        // Enable shadows for more realistic rendering
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        container.appendChild(renderer.domElement);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // Lights
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x8b5cf6, 1, 10)
        pointLight.position.set(-3, 2, 3);
        scene.add(pointLight);
        
        // Main sphere with realistic material - CENTER stage
        const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b5cf6,
            metalness: 0.7,    
            roughness: 0.2,    
            emissive: 0x221133,
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(0, 0, 0); // Keep main sphere at center
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        scene.add(sphere);

        // Floating cube - positioned around the center
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshStandardMaterial({
            color: 0x06b6d4, // cyan
            metalness: 0.5,
            roughness: 0.3,
            emissive: 0x001122,
        });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(3, 1, -1); // Closer to center, less spread
        cube.castShadow = true;
        scene.add(cube);

        // Floating torus (donut shape) - positioned around center
        const torusGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
        const torusMaterial = new THREE.MeshStandardMaterial({
            color: 0xf59e0b, // orange
            metalness: 0.8,
            roughness: 0.1,
            emissive: 0x221100,
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.set(-2, -1, 2); // Closer to center
        torus.castShadow = true;
        scene.add(torus);

        // ANIMATION with more complex movement
        const animate = () => {
            frameRef.current = requestAnimationFrame(animate);

            // Main sphere - gentle rotation
            sphere.rotation.x += 0.005;
            sphere.rotation.y += 0.01;
            
            // Floating movement - MORE dramatic
            sphere.position.y = Math.sin(Date.now() * 0.001) * 0.5;

            cube.rotation.x += 0.02;
            cube.rotation.z += 0.01;
            cube.position.y = Math.cos(Date.now() * 0.0015) * 0.6 + 1;

            torus.rotation.x += 0.01;
            torus.rotation.y += 0.02;
            torus.position.x = Math.sin(Date.now() * 0.0008) * 0.8 - 2;

            pointLight.position.x = Math.sin(Date.now() * 0.001) * 5;
            pointLight.position.z = Math.cos(Date.now() * 0.001) * 5;

            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        const handleResize = () => {
            const newWidth = container.clientWidth || 320;
            const newHeight = container.clientHeight || 320;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        }

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current)
            }
            window.removeEventListener('resize', handleResize)

            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(material => material.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                }
            });
            renderer.dispose();
            if (container && renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        }
    }, [])

    return (
        <div
            ref={mountRef}
            className="w-full aspect-square"
            style={{ 
                minHeight: '400px',
                position: 'relative',
                zIndex: 1
            }}
        />
    )
}

export default FloatingShapes3D