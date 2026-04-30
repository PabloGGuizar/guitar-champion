import React, { useState, useEffect } from 'react';
import Host from './components/Host';
import Controller from './components/Controller';
import { Gamepad2, Monitor } from 'lucide-react';

function App() {
  const [hostId, setHostId] = useState(null);
  const [role, setRole] = useState(null); // 'host', 'controller', or null

  useEffect(() => {
    // Check URL parameters for peer ID
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (id) {
      setHostId(id);
      setRole('controller');
    }
  }, []);

  if (role === 'controller' && hostId) {
    return <Controller hostId={hostId} />;
  }

  if (role === 'host') {
    return <Host />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-12 space-y-4">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          BEAT SYNC P2P
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto">
          A local-first, peer-to-peer rhythm game. Play on your browser, control with your phone.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
        <button 
          onClick={() => setRole('host')}
          className="flex-1 group relative p-8 bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-blue-500 rounded-3xl transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="p-4 bg-blue-500/20 text-blue-400 rounded-2xl group-hover:scale-110 transition-transform">
              <Monitor size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Create Room</h2>
            <p className="text-slate-400 text-sm">
              Host the game on this screen. You'll upload a track and get a QR code.
            </p>
          </div>
        </button>

        <div className="flex-1 relative p-8 bg-slate-800/50 border-2 border-slate-700/50 rounded-3xl flex flex-col items-center gap-4 opacity-70">
          <div className="p-4 bg-slate-700/50 text-slate-500 rounded-2xl">
            <Gamepad2 size={48} />
          </div>
          <h2 className="text-2xl font-bold text-slate-300">Join Room</h2>
          <p className="text-slate-500 text-sm">
            Scan the QR code from the Host screen to join automatically as a controller.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
