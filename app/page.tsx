"use client";
import { useRouter } from 'next/navigation';

interface BoxParams {
  xspan: number;
  yspan: number;
  zspan: number;
}

export default function Home() {
  const router = useRouter();
  
  function rectRoute() {
    window.location.href = '/rectangular';
  }
  
  function triangularRoute() {
    window.location.href = '/triangular';
  }
  
  function circularRoute() {
    window.location.href = '/circular';
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          3D Shape Builder
        </h1>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <svg 
                width="200" 
                height="120" 
                viewBox="0 0 200 120" 
                className="drop-shadow-lg"
              >
                <defs>
                  <linearGradient id="topGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f3f4f6" />
                    <stop offset="100%" stopColor="#d1d5db" />
                  </linearGradient>
                  <linearGradient id="leftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d1d5db" />
                    <stop offset="100%" stopColor="#9ca3af" />
                  </linearGradient>
                  <linearGradient id="rightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9ca3af" />
                    <stop offset="100%" stopColor="#6b7280" />
                  </linearGradient>
                </defs>
                
                <rect x="30" y="30" width="100" height="60" fill="url(#topGradient)" stroke="#374151" strokeWidth="2"/>
                <polygon points="30,30 50,15 150,15 130,30" fill="url(#leftGradient)" stroke="#374151" strokeWidth="2"/>
                
                <polygon points="130,30 150,15 150,75 130,90" fill="url(#rightGradient)" stroke="#374151" strokeWidth="2"/>
                
                <line x1="25" y1="30" x2="25" y2="90" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <line x1="30" y1="95" x2="130" y2="95" stroke="#ef4444" strokeWidth="2"/>
                <line x1="135" y1="30" x2="155" y2="15" stroke="#ef4444" strokeWidth="2"/>
                
                <text x="15" y="65" fill="#ef4444" fontSize="12" fontWeight="bold">H</text>
                <text x="75" y="108" fill="#ef4444" fontSize="12" fontWeight="bold">W</text>
                <text x="160" y="25" fill="#ef4444" fontSize="12" fontWeight="bold">D</text>
              </svg>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Rectangular Box Builder
              </h2>
              <p className="text-gray-600 mb-4">
                Create and customize 3D rectangular shapes with adjustable dimensions for width, height, and depth.
              </p>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Features:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Adjustable X, Y, Z dimensions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Real-time 3D preview
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Interactive controls
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={rectRoute} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center group"
              >
                <span>Build Rectangular Shape</span>
                <svg 
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <svg 
                width="200" 
                height="120" 
                viewBox="0 0 200 120" 
                className="drop-shadow-lg"
              >
                <defs>
                  <linearGradient id="triangleTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f3f4f6" />
                    <stop offset="100%" stopColor="#d1d5db" />
                  </linearGradient>
                  <linearGradient id="triangleLeftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d1d5db" />
                    <stop offset="100%" stopColor="#9ca3af" />
                  </linearGradient>
                  <linearGradient id="triangleRightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9ca3af" />
                    <stop offset="100%" stopColor="#6b7280" />
                  </linearGradient>
                </defs>
                
                <polygon points="100,20 40,80 160,80" fill="url(#triangleTopGradient)" stroke="#374151" strokeWidth="2"/>
                
                <polygon points="100,20 120,10 180,70 160,80" fill="url(#triangleLeftGradient)" stroke="#374151" strokeWidth="2"/>
                
                <polygon points="160,80 180,70 180,70 160,80" fill="url(#triangleRightGradient)" stroke="#374151" strokeWidth="2"/>
                
                <circle cx="100" cy="20" r="3" fill="#ef4444"/>
                <circle cx="40" cy="80" r="3" fill="#ef4444"/>
                <circle cx="160" cy="80" r="3" fill="#ef4444"/>
                
                <text x="105" y="18" fill="#ef4444" fontSize="10" fontWeight="bold">V1</text>
                <text x="28" y="85" fill="#ef4444" fontSize="10" fontWeight="bold">V2</text>
                <text x="165" y="85" fill="#ef4444" fontSize="10" fontWeight="bold">V3</text>
                
                <line x1="170" y1="75" x2="185" y2="65" stroke="#ef4444" strokeWidth="2"/>
                <text x="188" y="70" fill="#ef4444" fontSize="10" fontWeight="bold">D</text>
              </svg>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Triangular Prism Builder
              </h2>
              <p className="text-gray-600 mb-4">
                Create and customize 3D triangular prisms using vertex coordinates for complete shape control.
              </p>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Features:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Custom vertex positioning
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Adjustable extrusion depth
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Real-time efficiency calculation
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={triangularRoute} 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center group"
              >
                <span>Build Triangular Shape</span>
                <svg 
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <svg 
                width="200" 
                height="120" 
                viewBox="0 0 200 120" 
                className="drop-shadow-lg"
              >
                <defs>
                  <linearGradient id="cylinderTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f3f4f6" />
                    <stop offset="100%" stopColor="#d1d5db" />
                  </linearGradient>
                  <linearGradient id="cylinderSideGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d1d5db" />
                    <stop offset="100%" stopColor="#9ca3af" />
                  </linearGradient>
                  <linearGradient id="cylinderBottomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9ca3af" />
                    <stop offset="100%" stopColor="#6b7280" />
                  </linearGradient>
                </defs>
                
                <rect x="70" y="30" width="60" height="50" fill="url(#cylinderSideGradient)" stroke="#374151" strokeWidth="2"/>
                
                <ellipse cx="100" cy="30" rx="30" ry="8" fill="url(#cylinderTopGradient)" stroke="#374151" strokeWidth="2"/>
                
                <ellipse cx="100" cy="80" rx="30" ry="8" fill="url(#cylinderBottomGradient)" stroke="#374151" strokeWidth="2"/>
                
                <line x1="140" y1="30" x2="140" y2="80" stroke="#ef4444" strokeWidth="2"/>
                <line x1="70" y1="90" x2="130" y2="90" stroke="#ef4444" strokeWidth="2"/>
                
                <text x="145" y="60" fill="#ef4444" fontSize="12" fontWeight="bold">H</text>
                <text x="95" y="105" fill="#ef4444" fontSize="12" fontWeight="bold">R</text>
                
                <circle cx="100" cy="55" r="2" fill="#ef4444"/>
              </svg>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Cylindrical Shape Builder
              </h2>
              <p className="text-gray-600 mb-4">
                Create and customize 3D cylindrical shapes with adjustable radius and height for optimal efficiency.
              </p>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Features:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Adjustable radius and height
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Real-time SHG efficiency
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Volume calculations
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={circularRoute} 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center group"
              >
                <span>Build Cylindrical Shape</span>
                <svg 
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-12 max-w-4xl mx-auto text-center text-black'>
        <h1 className='text-lg font-semibold mb-2'>Development Notes</h1>
        <p className='text-gray-600'>
          If there's any glitches/errors, try reloading & it usually works. <br /> If there's negative
          values of SHG, that's due to a Linear Regression fitting issue. <br /> Updates coming soon ...
        </p>
      </div>
    </div>
  );
}