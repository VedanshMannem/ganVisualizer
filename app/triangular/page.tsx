"use client";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

interface TriangleParams {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  depth: number;
}

export default function Home() {
  const router = useRouter();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const triangleRef = useRef<THREE.Mesh | null>(null);
  
  const [triangleParams, setTriangleParams] = useState<TriangleParams>({
    x1: -0.25,
    y1: 0,
    x2: 0.25,
    y2: 0,
    x3: 0,
    y3: 0.36,
    depth: 0.6
  });


  function calcEff(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, depth: number) {
      // Using triangle area and depth for calculation
      const area = Math.abs((x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2))/2);
      const y = 1.131972e+00  -6.282955e+05 * area + 1.255411e+05 * depth  -2.149598e+05 * (x1+x2+x3)/3;
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

    createTriangle();

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

  const createTriangle = () => {
    if (!sceneRef.current) return;

    if (triangleRef.current) {
      sceneRef.current.remove(triangleRef.current);
    }

    const shape = new THREE.Shape();
    
    shape.moveTo(triangleParams.x1, triangleParams.y1);
    shape.lineTo(triangleParams.x2, triangleParams.y2);
    shape.lineTo(triangleParams.x3, triangleParams.y3);
    shape.lineTo(triangleParams.x1, triangleParams.y1); 

    const extrudeSettings = {
      depth: triangleParams.depth,
      bevelEnabled: false
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    geometry.translate(0, 0, -triangleParams.depth/2);

    const triangle = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
      color: 0xff6b6b
    }));
    triangle.castShadow = true;
    triangle.receiveShadow = true;

    triangleRef.current = triangle;
    sceneRef.current.add(triangle);
  };

  useEffect(() => {
    createTriangle();
  }, [triangleParams]);

  const updateParam = (key: keyof TriangleParams, value: number | string) => {
    setTriangleParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  
  return (
    <div className="p-6">
        <button className="text-2xl font-bold mb-6 hover:cursor-pointer"
          onClick={() => window.location.href = '/'}>3D Triangle Parameter Tester</button>
      
      <div className="flex gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md w-80">
          <h2 className="text-lg font-semibold mb-4 text-black">Triangle Parameters</h2>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2 text-black">Vertex Coordinates</h3>
            <div className="space-y-3">

              <div className="bg-gray-50 p-3 rounded">
                <h4 className="text-sm font-medium mb-2 text-black">Vertex 1</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-600">
                      X1: {triangleParams.x1}
                    </label>
                    <input
                      type="range"
                      min="-1.46"
                      max="1.46"
                      step="0.1"
                      value={triangleParams.x1}
                      onChange={(e) => updateParam('x1', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-600">
                      Y1: {triangleParams.y1}
                    </label>
                    <input
                      type="range"
                      min="-1.46"
                      max="1.46"
                      step="0.1"
                      value={triangleParams.y1}
                      onChange={(e) => updateParam('y1', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <h4 className="text-sm font-medium mb-2 text-black">Vertex 2</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-600">
                      X2: {triangleParams.x2}
                    </label>
                    <input
                      type="range"
                      min="-1.46"
                      max="1.46"
                      step="0.1"
                      value={triangleParams.x2}
                      onChange={(e) => updateParam('x2', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-600">
                      Y2: {triangleParams.y2}
                    </label>
                    <input
                      type="range"
                      min="-1.46"
                      max="1.46"
                      step="0.1"
                      value={triangleParams.y2}
                      onChange={(e) => updateParam('y2', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <h4 className="text-sm font-medium mb-2 text-black">Vertex 3</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-600">
                      X3: {triangleParams.x3}
                    </label>
                    <input
                      type="range"
                      min="-1.46"
                      max="1.46"
                      step="0.1"
                      value={triangleParams.x3}
                      onChange={(e) => updateParam('x3', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-600">
                      Y3: {triangleParams.y3}
                    </label>
                    <input
                      type="range"
                      min="-1.46"
                      max="1.46"
                      step="0.1"
                      value={triangleParams.y3}
                      onChange={(e) => updateParam('y3', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <h4 className="text-sm font-medium mb-2 text-black">Extrusion Depth</h4>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">
                    Depth: {triangleParams.depth}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1.46"
                    step="0.1"
                    value={triangleParams.depth}
                    onChange={(e) => updateParam('depth', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg text-black font-semibold mb-4">3D Preview</h2>
          <div ref={mountRef} className="border rounded" />
          <p className="text-sm text-gray-600 mt-2">
            Adjust vertex coordinates to change triangle shape. The triangle is extruded along the Z-axis.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-lg text-black font-semibold mb-2">Second Harmonic Generation Efficiency:</h1>
          <p className="text-xl font-bold text-blue-600">
            {calcEff(
              triangleParams.x1 * 1e-6, 
              triangleParams.y1 * 1e-6, 
              triangleParams.x2 * 1e-6, 
              triangleParams.y2 * 1e-6, 
              triangleParams.x3 * 1e-6, 
              triangleParams.y3 * 1e-6, 
              triangleParams.depth * 1e-6
            ).toFixed(6)}
          </p>
          <div className="mt-4 text-sm text-gray-600">
            <p>Triangle Area: {(Math.abs((triangleParams.x1*(triangleParams.y2-triangleParams.y3) + triangleParams.x2*(triangleParams.y3-triangleParams.y1) + triangleParams.x3*(triangleParams.y1-triangleParams.y2))/2)).toFixed(3)}</p>
            <p>Vertices: ({triangleParams.x1}, {triangleParams.y1}), ({triangleParams.x2}, {triangleParams.y2}), ({triangleParams.x3}, {triangleParams.y3})</p>
          </div>
        </div>
      </div>
    </div>
  );
}