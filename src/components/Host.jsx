import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Play, Smartphone, Music, CheckCircle2, Zap, HelpCircle, X } from 'lucide-react';
import { usePeer } from '../hooks/usePeer';
import { AudioEngine } from '../utils/AudioEngine';
import { generatedSongMap, filterByDifficulty } from '../utils/songMap';
import GameBoard from './GameBoard';

const COVER = `${import.meta.env.BASE_URL}13156393-a6b5-4dc3-81fb-27412fe1d3d1.jpg`;

// ─── Instructions Modal ───────────────────────────────────────────────────────
function InstructionsModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-lg bg-slate-900/90 border border-white/15 rounded-3xl shadow-2xl p-7 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={COVER} alt="cover" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <h2 className="text-white font-black text-xl tracking-tight">¿Cómo jugar?</h2>
              <p className="text-slate-400 text-xs">Guitar Champion — Guía rápida</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <hr className="border-white/10" />

        {/* Steps */}
        <ol className="flex flex-col gap-4">
          {[
            {
              n: '1',
              title: 'Configura la dificultad',
              desc: 'Elige entre 🟢 Básico, 🟡 Intermedio o 🔴 Avanzado antes de iniciar. Básico muestra menos notas; Avanzado usa el mapa completo.',
            },
            {
              n: '2',
              title: 'Conecta tu celular',
              desc: 'Escanea el código QR con la cámara de tu teléfono. Se abrirá el controlador con cuatro botones de colores. No cierres la pestaña del host.',
            },
            {
              n: '3',
              title: 'Inicia la sesión',
              desc: 'Pulsa "¡Iniciar!" en el host (PC). La música comenzará y las notas bajarán por el tablero hacia la zona de impacto.',
            },
            {
              n: '4',
              title: 'Toca las notas a tiempo',
              desc: 'Cuando una nota llegue a la línea de impacto, presiona el botón del color correspondiente en el celular. ¡Cuanto más preciso seas, más puntos ganas!',
            },
            {
              n: '5',
              title: 'Encadena combos',
              desc: 'Acertar notas consecutivas multiplica tu puntaje. ¡Llega a 10x, 25x o 50x combo para desbloquear mensajes especiales! 🔥',
            },
          ].map(({ n, title, desc }) => (
            <li key={n} className="flex gap-4">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                {n}
              </span>
              <div>
                <p className="text-white font-bold text-sm">{title}</p>
                <p className="text-slate-400 text-xs leading-relaxed mt-0.5">{desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <hr className="border-white/10" />

        {/* Lane legend */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Carriles</p>
          <div className="flex gap-3">
            {[
              { color: 'bg-red-500',    label: 'Carril 1' },
              { color: 'bg-yellow-400', label: 'Carril 2' },
              { color: 'bg-blue-500',   label: 'Carril 3' },
              { color: 'bg-green-500',  label: 'Carril 4' },
            ].map(({ color, label }) => (
              <div key={label} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-9 h-9 rounded-full ${color} shadow-lg`} />
                <span className="text-xs text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/30"
        >
          ¡Entendido, a jugar!
        </button>
      </div>
    </div>
  );
}

// ─── Host ─────────────────────────────────────────────────────────────────────
export default function Host() {
  const { peerId, connected, onMessage } = usePeer(true);
  const [audioEngine] = useState(() => new AudioEngine());
  const [audioFile, setAudioFile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [showHelp, setShowHelp] = useState(false);

  const gameBoardRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onMessage((data) => {
      if (data && data.action === 'HIT' && gameBoardRef.current) {
        gameBoardRef.current.registerHit(data.lane);
      }
    });
    return unsubscribe;
  }, [onMessage]);

  useEffect(() => {
    const initGame = async () => {
      setIsProcessing(true);
      try {
        await audioEngine.loadFromUrl(`${import.meta.env.BASE_URL}song.mp3`);
        const filtered = filterByDifficulty(generatedSongMap, difficulty);
        setNotes(filtered);
        setAudioFile({ name: 'La entropía en el cristal' });
        setIsLoaded(true);
      } catch (err) {
        console.error('Failed to load song:', err);
      } finally {
        setIsProcessing(false);
      }
    };
    initGame();
  }, [audioEngine]);

  const startGame = async () => {
    if (!audioFile || notes.length === 0) return;
    if (audioEngine.audioContext.state === 'suspended') {
      await audioEngine.audioContext.resume();
    }
    setIsPlaying(true);
    audioEngine.play();
  };

  const connectionUrl = peerId
    ? `${window.location.origin}${window.location.pathname}?id=${peerId}`
    : '';

  const difficultyConfig = {
    easy:   { label: '🟢 Básico',     hint: 'Perfecto para empezar' },
    medium: { label: '🟡 Intermedio', hint: 'Un reto equilibrado' },
    hard:   { label: '🔴 Avanzado',   hint: '¡Todas las notas!' },
  };

  return (
    <div className="min-h-screen w-full relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${COVER}')`, filter: 'blur(20px) brightness(0.25)', transform: 'scale(1.1)' }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Modal */}
      {showHelp && <InstructionsModal onClose={() => setShowHelp(false)} />}

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto p-6 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <img src={COVER} alt="Album cover" className="w-16 h-16 rounded-xl object-cover shadow-2xl ring-2 ring-white/20" />
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white">
                GUITAR<span className="text-blue-400">CHAMPION</span>
              </h1>
              <p className="text-slate-400 text-sm font-medium">La entropía en el cristal</p>
            </div>
          </div>

          {/* Help button */}
          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-semibold transition-all backdrop-blur-sm"
          >
            <HelpCircle size={16} />
            ¿Cómo jugar?
          </button>
        </div>

        {/* Cards row */}
        <div className="flex flex-col md:flex-row gap-4">

          {/* Song card */}
          <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Music size={18} className="text-blue-400" /> Canción
            </h2>

            {isProcessing ? (
              <div className="flex items-center gap-3 text-blue-300 animate-pulse py-4">
                <Music className="w-6 h-6 animate-spin" />
                <span className="font-medium">Cargando pista de audio…</span>
              </div>
            ) : isLoaded ? (
              <div className="flex items-center gap-3">
                <img src={COVER} alt="cover" className="w-12 h-12 rounded-lg object-cover shadow-lg" />
                <div>
                  <p className="text-white font-semibold text-sm">{audioFile.name}</p>
                  <p className="text-green-400 text-xs flex items-center gap-1">
                    <CheckCircle2 size={12} /> Lista · {notes.length} notas
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-red-400 text-sm">Error al cargar la canción</p>
            )}

            {/* Difficulty */}
            <div className="flex flex-col gap-2 pt-1">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Dificultad</p>
              <div className="flex gap-2">
                {Object.entries(difficultyConfig).map(([key, cfg]) => (
                  <button
                    key={key}
                    disabled={isPlaying}
                    onClick={() => {
                      setDifficulty(key);
                      setNotes(filterByDifficulty(generatedSongMap, key));
                    }}
                    title={cfg.hint}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                      difficulty === key
                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {cfg.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 italic">{difficultyConfig[difficulty].hint}</p>
            </div>
          </div>

          {/* Controller card */}
          <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col items-center gap-3 text-center">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Smartphone size={18} className={connected ? 'text-green-400' : 'text-blue-400'} />
              Controlador
            </h2>

            {!peerId ? (
              <p className="text-slate-400 animate-pulse text-sm">Generando conexión…</p>
            ) : !connected ? (
              <>
                <div className="p-3 bg-white rounded-xl shadow-xl">
                  <QRCodeSVG value={connectionUrl} size={130} />
                </div>
                <p className="text-xs text-slate-400 max-w-[200px]">
                  Escanea con tu celular para usarlo como control
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 py-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center ring-2 ring-green-500/40">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-green-400 font-bold">¡Celular conectado!</p>
                <p className="text-xs text-slate-500">Listo para jugar</p>
              </div>
            )}
          </div>
        </div>

        {/* Start button */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg">Tablero de juego</span>
            {isPlaying && (
              <span className="text-blue-400 text-xs font-medium animate-pulse flex items-center gap-1">
                <Zap size={12} /> Sesión en curso…
              </span>
            )}
          </div>
          <button
            onClick={startGame}
            disabled={!audioFile || notes.length === 0 || isProcessing || isPlaying}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-full transition-all flex items-center gap-2 shadow-xl shadow-blue-500/30 text-lg"
          >
            <Play fill="currentColor" size={20} />
            {isPlaying ? 'Jugando…' : '¡Iniciar!'}
          </button>
        </div>

        {/* Game board */}
        <div className="w-full h-[580px]">
          <GameBoard
            ref={gameBoardRef}
            audioEngine={audioEngine}
            initialNotes={notes}
            isPlaying={isPlaying}
          />
        </div>
      </div>
    </div>
  );
}
