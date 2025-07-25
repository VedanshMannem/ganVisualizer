"use client";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

interface BoxParams {
  xspan: number;
  yspan: number;
  zspan: number;
}

export default function Home() {
    const router = useRouter();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const boxRef = useRef<THREE.Mesh | null>(null);
  
  const [boxParams, setBoxParams] = useState<BoxParams>({
    xspan: 1,
    yspan: 1,
    zspan: 1,
  });


  function calcEff(xSpan: number, ySpan: number, zSpan: number) {
      const y = 1.131972e+00  -6.282955e+05 * xSpan + 1.255411e+05 * ySpan  -2.149598e+05 * zSpan;
      return y;
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

    createBox();

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const createBox = () => {
    if (!sceneRef.current) return;

    if (boxRef.current) {
      sceneRef.current.remove(boxRef.current);
    }

    const geometry = new THREE.BoxGeometry(
      boxParams.xspan,
      boxParams.yspan,
      boxParams.zspan
    );

    const box = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0xff6b6b
    }));
    box.castShadow = true;
    box.receiveShadow = true;

    boxRef.current = box;
    sceneRef.current.add(box);
  };

  useEffect(() => {
    createBox();
  }, [boxParams]);

  const updateParam = (key: keyof BoxParams, value: number | string) => {
    setBoxParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  
  return (
    <div className="p-6">
        <button className="text-2xl font-bold mb-6 hover:cursor-pointer"
          onClick={() => window.location.href = '/'}>3D Box Parameter Tester</button>
      
      <div className="flex gap-6">
        <div className="bg-black p-4 rounded-lg shadow-md w-80">
          <h2 className="text-lg font-semibold mb-4">Box Parameters</h2>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Dimensions</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  X Span: {boxParams.xspan}
                </label>
                <input
                  type="range"
                  min="0.365"
                  max="1.46"
                  step="0.05"
                  value={boxParams.xspan}
                  onChange={(e) => updateParam('xspan', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Y Span: {boxParams.yspan}
                </label>
                <input
                  type="range"
                  min="0.365"
                  max="1.46"
                  step="0.05"
                  value={boxParams.yspan}
                  onChange={(e) => updateParam('yspan', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Z Span: {boxParams.zspan}
                </label>
                <input
                  type="range"
                  min="0.365"
                  max="1.46"
                  step="0.05"
                  value={boxParams.zspan}
                  onChange={(e) => updateParam('zspan', parseFloat(e.target.value))}
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
          <h1 className="text-lg text-black font-semibold mb-2">Second Harmonic Generation Efficiency:</h1>
          <p className="text-xl font-bold text-blue-600">
            {calcEff(boxParams.xspan * 1e-6, boxParams.yspan * 1e-6, boxParams.zspan * 1e-6).toFixed(6)}
          </p>
          <div className="mt-4 text-sm text-gray-600">
            <p>X Span: {boxParams.xspan}</p>
            <p>Y Span: {boxParams.yspan}</p>
            <p>Z Span: {boxParams.zspan}</p>
            <p>Volume: {(boxParams.xspan * boxParams.yspan * boxParams.zspan).toFixed(3)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}