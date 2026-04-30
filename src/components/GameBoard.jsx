import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';

const LANE_COLORS = ['#ef4444', '#eab308', '#3b82f6', '#22c55e']; // red, yellow, blue, green
const SPEED = 400; // pixels per second
const HIT_TOLERANCE = 0.15; // 150ms window for a hit
const HIT_ZONE_Y_OFFSET = 100; // Distance from bottom

const GameBoard = forwardRef(({ audioEngine, initialNotes, isPlaying }, ref) => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  
  // Mutable game state (to avoid React re-renders on every frame)
  const gameState = useRef({
    notes: [], // Will copy initialNotes and add 'status' to them (null, 'hit', 'missed')
    score: 0,
    combo: 0,
    hitEffects: [], // For visual feedback on hit
  });

  const [uiState, setUiState] = useState({ score: 0, combo: 0 }); // Just for initial or optional React UI overlay, though we draw on canvas

  // Initialize notes when initialNotes changes
  useEffect(() => {
    if (initialNotes && initialNotes.length > 0) {
      gameState.current.notes = initialNotes.map(n => ({ ...n, status: null }));
      gameState.current.score = 0;
      gameState.current.combo = 0;
      gameState.current.hitEffects = [];
    }
  }, [initialNotes]);

  useImperativeHandle(ref, () => ({
    registerHit: (lane) => {
      if (!isPlaying) return;
      
      const currentTime = audioEngine.getCurrentTime();
      const notes = gameState.current.notes;
      
      // Find the earliest un-hit note in this lane
      let hitNoteIndex = -1;
      let minDiff = Infinity;

      for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        if (note.lane === lane && note.status === null) {
          const diff = Math.abs(note.targetTime - currentTime);
          if (diff < HIT_TOLERANCE && diff < minDiff) {
            minDiff = diff;
            hitNoteIndex = i;
          }
        }
      }

      if (hitNoteIndex !== -1) {
        // Hit!
        notes[hitNoteIndex].status = 'hit';
        gameState.current.combo += 1;
        gameState.current.score += 10 * gameState.current.combo;
        
        // Add visual effect
        gameState.current.hitEffects.push({
          lane,
          time: Date.now(),
          color: LANE_COLORS[lane]
        });
      } else {
        // Miss (pressed but no note in window)
        gameState.current.combo = 0;
      }
    }
  }));

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const currentTime = audioEngine ? audioEngine.getCurrentTime() : 0;
    const hitZoneY = height - HIT_ZONE_Y_OFFSET;
    const laneWidth = width / 4;

    // Draw Lanes
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(i * laneWidth, 0, laneWidth - 2, height);
    }

    // Draw Hit Zone
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(0, hitZoneY - 20, width, 40);
    ctx.beginPath();
    ctx.moveTo(0, hitZoneY);
    ctx.lineTo(width, hitZoneY);
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    // Draw Hit Effects
    const now = Date.now();
    gameState.current.hitEffects = gameState.current.hitEffects.filter(eff => now - eff.time < 300);
    gameState.current.hitEffects.forEach(eff => {
      const alpha = 1 - (now - eff.time) / 300;
      ctx.fillStyle = eff.color;
      ctx.globalAlpha = alpha * 0.5;
      ctx.fillRect(eff.lane * laneWidth, hitZoneY - 30, laneWidth - 2, 60);
      ctx.globalAlpha = 1.0;
    });

    // Draw Notes
    const notes = gameState.current.notes;
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (note.status === 'hit') continue; // Don't draw hit notes

      const y = hitZoneY - (note.targetTime - currentTime) * SPEED;

      // Check for missed notes
      if (note.status === null && currentTime - note.targetTime > HIT_TOLERANCE) {
        note.status = 'missed';
        gameState.current.combo = 0;
      }

      // Draw if on screen
      if (y > -50 && y < height + 50) {
        ctx.fillStyle = note.status === 'missed' ? '#4b5563' : LANE_COLORS[note.lane]; // Gray if missed
        
        // Draw note block
        ctx.beginPath();
        ctx.roundRect(note.lane * laneWidth + 10, y - 15, laneWidth - 22, 30, 8);
        ctx.fill();
        
        // Optional glow
        if (note.status !== 'missed') {
            ctx.shadowColor = LANE_COLORS[note.lane];
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
        }
      }
    }

    // Draw HUD
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${gameState.current.score}`, 20, 40);
    
    ctx.textAlign = 'right';
    if (gameState.current.combo > 5) {
        ctx.fillStyle = '#fde047';
        ctx.shadowColor = '#fde047';
        ctx.shadowBlur = 10;
    }
    ctx.fillText(`${gameState.current.combo}x Combo`, width - 20, 40);
    ctx.shadowBlur = 0;

    // Loop
    if (isPlaying) {
        requestRef.current = requestAnimationFrame(draw);
    }
  };

  useEffect(() => {
    // Start loop if playing, or draw at least once
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(draw);
    } else {
      draw(); // Draw initial state
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, audioEngine]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Adjust canvas internal resolution to its CSS size
        const { clientWidth, clientHeight } = canvasRef.current.parentElement;
        canvasRef.current.width = clientWidth;
        canvasRef.current.height = clientHeight;
        if (!isPlaying) draw();
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial resize
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full relative bg-slate-900 overflow-hidden border border-slate-800 rounded-lg shadow-2xl">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
      />
    </div>
  );
});

export default GameBoard;
