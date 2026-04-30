import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Play, Upload, Smartphone, Music, CheckCircle2 } from 'lucide-react';
import { usePeer } from '../hooks/usePeer';
import { AudioEngine } from '../utils/AudioEngine';
import { generatedSongMap } from '../utils/songMap';
import GameBoard from './GameBoard';

export default function Host() {
  const { peerId, connected, onMessage } = usePeer(true);
  const [audioEngine] = useState(() => new AudioEngine());
  const [audioFile, setAudioFile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const gameBoardRef = useRef(null);

  // Handle incoming peer messages
  useEffect(() => {
    const unsubscribe = onMessage((data) => {
      if (data && data.action === 'HIT' && gameBoardRef.current) {
        // Forward hit to game board
        gameBoardRef.current.registerHit(data.lane);
      }
    });
    return unsubscribe;
  }, [onMessage]);

  // Load song automatically on mount
  useEffect(() => {
    const initGame = async () => {
      setIsProcessing(true);
      try {
        await audioEngine.loadFromUrl(`${import.meta.env.BASE_URL}song.mp3`);
        setNotes(generatedSongMap);
        setAudioFile({ name: "La entropía en el cristal" });
        setIsLoaded(true);
        console.log(`Loaded song with ${generatedSongMap.length} notes`);
      } catch (err) {
        console.error("Failed to load song:", err);
      } finally {
        setIsProcessing(false);
      }
    };
    initGame();
  }, [audioEngine]);

  const startGame = async () => {
    if (!audioFile || notes.length === 0) return;
    
    // We need user gesture to resume audio context
    if (audioEngine.audioContext.state === 'suspended') {
        await audioEngine.audioContext.resume();
    }
    
    setIsPlaying(true);
    audioEngine.play();
  };

  const connectionUrl = peerId ? `${window.location.origin}${window.location.pathname}?id=${peerId}` : '';

  return (
    <div className="w-full max-w-5xl mx-auto p-6 flex flex-col gap-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
        <div className="flex-1 bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 mb-4">
            <Music className="text-blue-400" />
            Track Setup
          </h2>
          
          <div className="flex flex-col gap-4">
            {isProcessing ? (
              <div className="flex items-center justify-center w-full h-32 px-4 transition bg-slate-900 border-2 border-slate-700 border-dashed rounded-xl">
                <div className="flex flex-col items-center gap-2 text-blue-400 font-medium animate-pulse">
                  <Music className="w-8 h-8" />
                  Loading song and chords...
                </div>
              </div>
            ) : isLoaded ? (
              <div className="flex items-center justify-center w-full h-32 px-4 bg-slate-900 border-2 border-green-500/50 rounded-xl">
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                  <span className="font-medium text-green-400">
                    {audioFile.name} Ready
                  </span>
                  <span className="text-sm text-green-500/70">
                    {notes.length} notes mapped
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-red-400 font-medium text-center py-4 bg-slate-900 rounded-xl border border-red-500/50">
                Failed to load audio
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 mb-4">
            <Smartphone className={connected ? "text-green-400" : "text-blue-400"} />
            Controller Status
          </h2>
          
          {!peerId ? (
            <div className="animate-pulse text-slate-400">Generating connection...</div>
          ) : !connected ? (
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-white rounded-xl">
                <QRCodeSVG value={connectionUrl} size={150} />
              </div>
              <p className="text-sm text-slate-400 max-w-[250px]">
                Scan with your phone to use it as the controller.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              </div>
              <p className="text-xl font-bold text-green-400">Connected!</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-200">Stage</h3>
          <button 
            onClick={startGame}
            disabled={!audioFile || notes.length === 0 || isProcessing || isPlaying}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-full transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30"
          >
            <Play fill="currentColor" size={20} />
            Start Session
          </button>
        </div>

        <div className="w-full h-[600px]">
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
