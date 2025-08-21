"use client";
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const FloatingShapes3D = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const frameRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            75, //FOV - Field Of View
            1, //Aspect ratio
            0.1, //near (Objects closer than this wont render)
            1000 // far (Objects further than this wont render)
        );

        camera.position.z = 5; // Position camera back so we can see object at origin(0, 0, 0)

        const renderer = new THREE.WebGLRenderer({
            antialias: true, // Smooth Edges
            alpha: true // transparent background
        })
        rendererRef.current = renderer;

        const container  = mountRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        renderer.setClearColor(0x000000, 0);

        container.appendChild(renderer.domElement);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // Create 3d Shape
        

    })

    return (
        <div
            ref={mountRef}
            className="w-full h-full absolute inset-0 min-h-100"
        />
    )
}

export default FloatingShapes3D
