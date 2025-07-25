"use client";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

interface CylinderParams {
  radius: number;
  GaNzSpan: number;
}

export default function Home() {

  const router = useRouter();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cylinderRef = useRef<THREE.Mesh | null>(null);
  
  const [cylinderParams, setCylinderParams] = useState<CylinderParams>({
    radius: 0.7,
    GaNzSpan: 0.7,
  });

  function calcEff(radius: number, GaNzSpan: number) {
      const power_output = 1.143157e-12 + 2.352395e6 * radius - 1.713857e6 * GaNzSpan;
      return power_output;
  }

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      800 / 600,
      0.1,
      1000
    );
    camera.position.set(1.5, 1.5, 1.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 600);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(4, 4, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const gridHelper = new THREE.GridHelper(6, 12);
    scene.add(gridHelper);

    createCylinder();

    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  const createCylinder = () => {
    if (!sceneRef.current) return;

    if (cylinderRef.current) {
      sceneRef.current.remove(cylinderRef.current);
    }

    const geometry = new THREE.CylinderGeometry(
      cylinderParams.radius,  // radiusTop
      cylinderParams.radius,  // radiusBottom
      cylinderParams.GaNzSpan, // height
      32                      // radialSegments
    );

    const cylinder = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0x6b9fff
    }));
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;

    cylinderRef.current = cylinder;
    sceneRef.current.add(cylinder);
  };

  useEffect(() => {
    createCylinder();
  }, [cylinderParams]);

  const updateParam = (key: keyof CylinderParams, value: number | string) => {
    setCylinderParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  
  return (
    <div className="p-6">
      <button className="text-2xl font-bold mb-6 hover:cursor-pointer"
        onClick={()=> window.location.href = '/'}>3D Cylinder Parameter Tester</button>

      <div className="flex gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md w-80">
          <h2 className="text-lg font-semibold mb-4 text-black">Cylinder Parameters</h2>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2 text-black">Dimensions</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Radius: {cylinderParams.radius}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1.46"
                  step="0.05"
                  value={cylinderParams.radius}
                  onChange={(e) => updateParam('radius', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  GaN Z-Span (Height): {cylinderParams.GaNzSpan}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1.46"
                  step="0.05"
                  value={cylinderParams.GaNzSpan}
                  onChange={(e) => updateParam('GaNzSpan', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg text-black font-semibold mb-4">3D Preview</h2>
          <div ref={mountRef} className="border rounded" />
          <p className="text-sm text-gray-600 mt-2">
            The grid shows 1-unit squares. Adjust parameters on the left to see changes.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-lg font-semibold text-black mb-2">Second Harmonic Generation Efficiency:</h1>
          <p className="text-xl font-bold text-blue-600">
            {calcEff(cylinderParams.radius * 1e-6, cylinderParams.GaNzSpan * 1e-6).toFixed(6)}
          </p>
          <div className="mt-4 text-sm text-gray-600">
            <p>Radius: {cylinderParams.radius}</p>
            <p>Height (GaN Z-Span): {cylinderParams.GaNzSpan}</p>
            <p>Volume: {(Math.PI * cylinderParams.radius * cylinderParams.radius * cylinderParams.GaNzSpan).toFixed(3)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}