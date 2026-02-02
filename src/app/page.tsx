'use client';

import dynamic from 'next/dynamic';

// Dynamic imports to avoid SSR issues with Three.js and Fabric.js
const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });
const Box = dynamic(() => import('@/components/three/Box'), { ssr: false });
const FabricCanvas = dynamic(() => import('@/components/fabric/FabricCanvas'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="py-8 px-6">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">3D Portfolio</h1>
          <ul className="flex gap-6 text-gray-300">
            <li><a href="#three" className="hover:text-white transition-colors">Three.js</a></li>
            <li><a href="#fabric" className="hover:text-white transition-colors">Fabric.js</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-5xl font-bold text-white mb-4">
          Interactive 3D Portfolio
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Built with Next.js, TypeScript, Tailwind CSS, Three.js, and Fabric.js
        </p>
      </section>

      {/* Three.js Section */}
      <section id="three" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Three.js 3D Scene
          </h3>
          <div className="h-[500px] rounded-xl overflow-hidden bg-slate-800/50 backdrop-blur">
            <Scene>
              <Box position={[-2, 0, 0]} color="#6366f1" />
              <Box position={[0, 0, 0]} color="#f472b6" />
              <Box position={[2, 0, 0]} color="#22d3ee" />
            </Scene>
          </div>
          <p className="text-gray-400 text-center mt-4">
            Click and drag to rotate. Scroll to zoom. Click boxes to interact.
          </p>
        </div>
      </section>

      {/* Fabric.js Section */}
      <section id="fabric" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Fabric.js 2D Canvas
          </h3>
          <div className="flex justify-center rounded-xl overflow-hidden">
            <FabricCanvas width={800} height={400} />
          </div>
          <p className="text-gray-400 text-center mt-4">
            Click and drag objects to move them. Use corner handles to resize.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-8">About This Project</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6">
              <h4 className="text-xl font-semibold text-white mb-3">Three.js</h4>
              <p className="text-gray-400">
                A powerful 3D graphics library for creating immersive 3D experiences in the browser.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6">
              <h4 className="text-xl font-semibold text-white mb-3">Fabric.js</h4>
              <p className="text-gray-400">
                A canvas library for creating interactive 2D graphics and image editing capabilities.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6">
              <h4 className="text-xl font-semibold text-white mb-3">Next.js</h4>
              <p className="text-gray-400">
                A React framework for building fast, scalable web applications with server-side rendering.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6">
              <h4 className="text-xl font-semibold text-white mb-3">Tailwind CSS</h4>
              <p className="text-gray-400">
                A utility-first CSS framework for rapidly building custom user interfaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-700">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>3D Portfolio - Built with Next.js, Three.js, and Fabric.js</p>
        </div>
      </footer>
    </div>
  );
}
