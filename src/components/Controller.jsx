import React, { useEffect, useState } from 'react';
import { usePeer } from '../hooks/usePeer';
import { Wifi, WifiOff, Zap } from 'lucide-react';

const COVER = `${import.meta.env.BASE_URL}13156393-a6b5-4dc3-81fb-27412fe1d3d1.jpg`;

const LANE_COLORS = [
  { bg: 'bg-red-500',    shadow: 'shadow-red-500/60',    ring: 'ring-red-400',    glow: '#ef4444' },
  { bg: 'bg-yellow-400', shadow: 'shadow-yellow-400/60', ring: 'ring-yellow-300', glow: '#facc15' },
  { bg: 'bg-blue-500',   shadow: 'shadow-blue-500/60',   ring: 'ring-blue-400',   glow: '#3b82f6' },
  { bg: 'bg-green-500',  shadow: 'shadow-green-500/60',  ring: 'ring-green-400',  glow: '#22c55e' },
];

const HIT_MESSAGES = ['¡BIEN!', '¡GENIAL!', '¡PERFECTO!', '🔥'];

export default function Controller({ hostId }) {
  const { connected, error, sendMessage } = usePeer(false, hostId);
  const [ripples, setRipples] = useState([]); // { id, lane }
  const [lastMsg, setLastMsg] = useState('');
  const [msgVisible, setMsgVisible] = useState(false);

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('landscape');
        }
      } catch (err) {
        console.log('Could not lock orientation.', err);
      }
    };
    lockOrientation();

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

    if (navigator.vibrate) navigator.vibrate(40);

    sendMessage({ action: 'HIT', lane, timestamp: Date.now() });

    // Ripple effect
    const id = Date.now() + Math.random();
    setRipples(prev => [...prev, { id, lane }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 500);

    // Random hit message
    const msg = HIT_MESSAGES[Math.floor(Math.random() * HIT_MESSAGES.length)];
    setLastMsg(msg);
    setMsgVisible(true);
    setTimeout(() => setMsgVisible(false), 600);
  };

  return (
    <div className="w-screen h-screen overflow-hidden fixed inset-0 flex flex-col select-none">

      {/* Background: album cover */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${COVER}')`, filter: 'blur(16px) brightness(0.3)', transform: 'scale(1.1)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      {/* Status bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-2 bg-black/30 backdrop-blur-sm border-b border-white/10 h-12">
        <div className="flex items-center gap-2">
          <img src={COVER} alt="cover" className="w-7 h-7 rounded-md object-cover opacity-80" />
          <span className="text-white font-black text-sm tracking-wider">
            GUITAR<span className="text-blue-400">CHAMPION</span>
          </span>
        </div>

        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
          connected
            ? 'bg-green-500/20 text-green-300 border-green-500/40'
            : 'bg-red-500/20 text-red-300 border-red-500/40'
        }`}>
          {connected ? (
            <><Wifi size={12} /> Conectado</>
          ) : (
            <><WifiOff size={12} /> {error ? 'Error' : 'Conectando…'}</>
          )}
        </div>
      </div>

      {/* Hit feedback message */}
      <div className={`relative z-10 flex justify-center transition-all duration-200 ${msgVisible ? 'opacity-100 -translate-y-0' : 'opacity-0 translate-y-2'}`}
        style={{ height: '32px' }}>
        <span className="text-white font-black text-xl tracking-widest drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">
          {lastMsg}
        </span>
      </div>

      {/* Buttons area */}
      <div className="relative z-10 flex-1 flex flex-row items-center justify-center gap-8 px-8">
        {LANE_COLORS.map((c, lane) => (
          <div key={lane} className="relative flex items-center justify-center">

            {/* Ripple rings */}
            {ripples.filter(r => r.lane === lane).map(r => (
              <span
                key={r.id}
                className={`absolute rounded-full border-4 animate-ping`}
                style={{
                  width: '96px', height: '96px',
                  borderColor: c.glow,
                  opacity: 0.6,
                }}
              />
            ))}

            <button
              onPointerDown={(e) => {
                e.preventDefault();
                handleHit(lane);
              }}
              onContextMenu={(e) => e.preventDefault()}
              className={`
                rounded-full touch-none
                ${c.bg} ${c.shadow} ${c.ring}
                shadow-2xl ring-4 ring-offset-0
                transition-transform duration-75 active:scale-90
                opacity-95 active:opacity-100
              `}
              style={{ width: '76px', height: '76px' }}
              aria-label={`Hit lane ${lane + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Bottom hint */}
      <div className="relative z-10 flex justify-center pb-3">
        {connected ? (
          <p className="text-xs text-white/40 flex items-center gap-1">
            <Zap size={10} /> Toca los círculos al ritmo de la música
          </p>
        ) : (
          <p className="text-xs text-white/40">Esperando conexión con el host…</p>
        )}
      </div>
    </div>
  );
}
