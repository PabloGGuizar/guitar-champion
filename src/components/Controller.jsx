import React, { useEffect } from 'react';
import { usePeer } from '../hooks/usePeer';
import { Wifi, WifiOff } from 'lucide-react';

const LANE_COLORS = [
  'bg-red-500 hover:bg-red-400 active:bg-red-600 active:scale-95 shadow-red-500/50',
  'bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 active:scale-95 shadow-yellow-500/50',
  'bg-blue-500 hover:bg-blue-400 active:bg-blue-600 active:scale-95 shadow-blue-500/50',
  'bg-green-500 hover:bg-green-400 active:bg-green-600 active:scale-95 shadow-green-500/50'
];

export default function Controller({ hostId }) {
  const { connected, error, sendMessage } = usePeer(false, hostId);

  // Force or suggest landscape orientation if possible
  useEffect(() => {
    const lockOrientation = async () => {
      try {
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('landscape');
        }
      } catch (err) {
        console.log("Could not lock orientation, normal on non-mobile devices.", err);
      }
    };
    lockOrientation();
    
    // Attempt to prevent default touch behaviors like scrolling
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventDefault);
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    };
  }, []);

  const handleHit = (lane) => {
    if (!connected) return;
    
    // Provide tactile feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Send event immediately
    sendMessage({
      action: 'HIT',
      lane,
      timestamp: Date.now() // Host will use its own clock primarily, but timestamp can be used for latency comp later
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-900 overflow-hidden fixed inset-0">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between px-6 py-2 bg-slate-800 border-b border-slate-700 h-14">
        <h1 className="text-xl font-black italic tracking-wider text-slate-100">
          GUITAR<span className="text-blue-500">HERO</span> P2P
        </h1>
        
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${connected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {connected ? (
            <>
              <Wifi size={16} /> Connected
            </>
          ) : (
            <>
              <WifiOff size={16} /> {error ? "Error" : "Connecting..."}
            </>
          )}
        </div>
      </div>

      {/* Buttons Area */}
      <div className="flex-1 flex flex-row items-stretch gap-2 p-4 pt-8 pb-8">
        {[0, 1, 2, 3].map((lane) => (
          <button
            key={lane}
            onPointerDown={(e) => {
              e.preventDefault(); // prevent mouse emulation of touch events delaying things
              handleHit(lane);
            }}
            // Disable default context menu
            onContextMenu={(e) => e.preventDefault()} 
            className={`flex-1 rounded-2xl shadow-xl transition-all duration-75 ease-out touch-none ${LANE_COLORS[lane]} opacity-90 active:opacity-100`}
            aria-label={`Hit lane ${lane + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
