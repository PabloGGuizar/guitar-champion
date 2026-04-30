import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';

const LANE_COLORS = ['#ef4444', '#eab308', '#3b82f6', '#22c55e']; // red, yellow, blue, green
const SPEED = 400; // pixels per second
const HIT_TOLERANCE = 0.15; // 150ms window for a hit
const HIT_ZONE_Y_OFFSET = 100; // Distance from bottom
const COVER_URL = `${import.meta.env.BASE_URL}13156393-a6b5-4dc3-81fb-27412fe1d3d1.jpg`;

// Preload cover image
const coverImg = new Image();
coverImg.src = COVER_URL;

const FEEDBACK_MESSAGES = ['¡PERFECTO!', '¡GENIAL!', '¡BIEN!'];
const COMBO_MILESTONES = [10, 25, 50, 100];

const GameBoard = forwardRef(({ audioEngine, initialNotes, isPlaying }, ref) => {
  const canvasRef = useRef(null);
  const requestRef = useRef();

  const gameState = useRef({
    notes: [],
    score: 0,
    combo: 0,
    hitEffects: [],
    feedbackMessages: [], // { text, x, y, time, color }
    lastComboMilestone: 0,
  });

  const [uiState, setUiState] = useState({ score: 0, combo: 0 });

  useEffect(() => {
    if (initialNotes && initialNotes.length > 0) {
      gameState.current.notes = initialNotes.map(n => ({ ...n, status: null }));
      gameState.current.score = 0;
      gameState.current.combo = 0;
      gameState.current.hitEffects = [];
      gameState.current.feedbackMessages = [];
      gameState.current.lastComboMilestone = 0;
    }
  }, [initialNotes]);

  useImperativeHandle(ref, () => ({
    registerHit: (lane) => {
      if (!isPlaying) return;

      const currentTime = audioEngine.getCurrentTime();
      const notes = gameState.current.notes;

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

      const canvas = canvasRef.current;
      const width = canvas ? canvas.width : 400;
      const height = canvas ? canvas.height : 600;
      const hitZoneY = height - HIT_ZONE_Y_OFFSET;
      const laneWidth = width / 4;
      const x = lane * laneWidth + laneWidth / 2;

      if (hitNoteIndex !== -1) {
        notes[hitNoteIndex].status = 'hit';
        gameState.current.combo += 1;
        gameState.current.score += 10 * gameState.current.combo;

        gameState.current.hitEffects.push({
          lane,
          time: Date.now(),
          color: LANE_COLORS[lane],
        });

        // Feedback message
        const msg = FEEDBACK_MESSAGES[Math.min(Math.floor(minDiff / (HIT_TOLERANCE / 3)), 2)];
        gameState.current.feedbackMessages.push({
          text: msg,
          x,
          y: hitZoneY - 60,
          time: Date.now(),
          color: LANE_COLORS[lane],
        });

        // Combo milestone message
        const combo = gameState.current.combo;
        if (COMBO_MILESTONES.includes(combo) && combo !== gameState.current.lastComboMilestone) {
          gameState.current.lastComboMilestone = combo;
          gameState.current.feedbackMessages.push({
            text: `🔥 ${combo}x COMBO!`,
            x: width / 2,
            y: height / 2,
            time: Date.now(),
            color: '#fde047',
            big: true,
          });
        }
      } else {
        gameState.current.combo = 0;
        gameState.current.feedbackMessages.push({
          text: 'MISS',
          x,
          y: hitZoneY - 60,
          time: Date.now(),
          color: '#6b7280',
        });
      }
    },
  }));

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // --- Background: cover image blurred + dark overlay ---
    if (coverImg.complete && coverImg.naturalWidth > 0) {
      ctx.save();
      ctx.filter = 'blur(18px) brightness(0.35)';
      // Cover and stretch to fill
      const scale = Math.max(width / coverImg.naturalWidth, height / coverImg.naturalHeight);
      const sw = coverImg.naturalWidth * scale;
      const sh = coverImg.naturalHeight * scale;
      ctx.drawImage(coverImg, (width - sw) / 2, (height - sh) / 2, sw, sh);
      ctx.filter = 'none';
      ctx.restore();
    } else {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);
    }

    // Vignette
    const vignette = ctx.createRadialGradient(width / 2, height / 2, height * 0.2, width / 2, height / 2, height * 0.9);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.6)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    const currentTime = audioEngine ? audioEngine.getCurrentTime() : 0;
    const hitZoneY = height - HIT_ZONE_Y_OFFSET;
    const laneWidth = width / 4;

    // Draw Lanes
    for (let i = 0; i < 4; i++) {
      // Subtle lane separator
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillRect(i * laneWidth, 0, laneWidth - 1, height);

      // Lane color tint at bottom
      const laneGrad = ctx.createLinearGradient(0, hitZoneY - 80, 0, height);
      laneGrad.addColorStop(0, 'rgba(0,0,0,0)');
      laneGrad.addColorStop(1, LANE_COLORS[i] + '22');
      ctx.fillStyle = laneGrad;
      ctx.fillRect(i * laneWidth, 0, laneWidth - 1, height);

      // Lane separator line
      if (i > 0) {
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(i * laneWidth, 0);
        ctx.lineTo(i * laneWidth, height);
        ctx.stroke();
      }
    }

    // Hit Zone glow line
    for (let i = 0; i < 4; i++) {
      const grad = ctx.createLinearGradient(i * laneWidth, 0, (i + 1) * laneWidth, 0);
      grad.addColorStop(0, LANE_COLORS[i] + '00');
      grad.addColorStop(0.5, LANE_COLORS[i] + 'aa');
      grad.addColorStop(1, LANE_COLORS[i] + '00');
      ctx.fillStyle = grad;
      ctx.fillRect(i * laneWidth, hitZoneY - 2, laneWidth, 4);
    }

    // Hit zone target circles
    for (let i = 0; i < 4; i++) {
      const cx = i * laneWidth + laneWidth / 2;
      ctx.beginPath();
      ctx.arc(cx, hitZoneY, 22, 0, Math.PI * 2);
      ctx.strokeStyle = LANE_COLORS[i] + '99';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, hitZoneY, 14, 0, Math.PI * 2);
      ctx.fillStyle = LANE_COLORS[i] + '33';
      ctx.fill();
    }

    // Hit Effects
    const now = Date.now();
    gameState.current.hitEffects = gameState.current.hitEffects.filter(eff => now - eff.time < 350);
    gameState.current.hitEffects.forEach(eff => {
      const alpha = 1 - (now - eff.time) / 350;
      const cx = eff.lane * laneWidth + laneWidth / 2;

      // Expanding ring
      const radius = 20 + (1 - alpha) * 50;
      ctx.beginPath();
      ctx.arc(cx, hitZoneY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = eff.color;
      ctx.globalAlpha = alpha * 0.8;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Flash fill
      ctx.fillStyle = eff.color;
      ctx.globalAlpha = alpha * 0.25;
      ctx.fillRect(eff.lane * laneWidth, hitZoneY - 50, laneWidth - 1, 100);
      ctx.globalAlpha = 1;
    });

    // Draw Notes
    const notes = gameState.current.notes;
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (note.status === 'hit') continue;

      const y = hitZoneY - (note.targetTime - currentTime) * SPEED;

      if (note.status === null && currentTime - note.targetTime > HIT_TOLERANCE) {
        note.status = 'missed';
        gameState.current.combo = 0;
      }

      if (y > -50 && y < height + 50) {
        const cx = note.lane * laneWidth + laneWidth / 2;
        const isMissed = note.status === 'missed';
        const color = isMissed ? '#374151' : LANE_COLORS[note.lane];

        // Note body (rounded rect)
        ctx.beginPath();
        ctx.roundRect(note.lane * laneWidth + 12, y - 14, laneWidth - 24, 28, 14);
        ctx.fillStyle = isMissed ? color : color + 'dd';
        ctx.fill();

        if (!isMissed) {
          // Glow
          ctx.shadowColor = color;
          ctx.shadowBlur = 18;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Shine highlight
          ctx.beginPath();
          ctx.roundRect(note.lane * laneWidth + 14, y - 12, laneWidth - 28, 10, 8);
          ctx.fillStyle = 'rgba(255,255,255,0.25)';
          ctx.fill();
        }
      }
    }

    // Feedback messages
    gameState.current.feedbackMessages = gameState.current.feedbackMessages.filter(m => now - m.time < 800);
    gameState.current.feedbackMessages.forEach(m => {
      const age = now - m.time;
      const alpha = 1 - age / 800;
      const offsetY = -age * 0.06;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.textAlign = 'center';

      if (m.big) {
        ctx.font = 'bold 42px Inter, sans-serif';
        ctx.shadowColor = m.color;
        ctx.shadowBlur = 20;
      } else {
        ctx.font = 'bold 22px Inter, sans-serif';
        ctx.shadowColor = m.color;
        ctx.shadowBlur = 10;
      }

      ctx.fillStyle = m.color;
      ctx.fillText(m.text, m.x, m.y + offsetY);
      ctx.restore();
    });

    // HUD
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    // Score
    ctx.textAlign = 'left';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('SCORE', 20, 30);
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(gameState.current.score.toLocaleString(), 20, 58);

    // Combo
    const combo = gameState.current.combo;
    ctx.textAlign = 'right';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('COMBO', width - 20, 30);

    if (combo > 5) {
      ctx.fillStyle = '#fde047';
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 12;
    } else {
      ctx.fillStyle = '#ffffff';
    }
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.fillText(`${combo}x`, width - 20, 58);
    ctx.shadowBlur = 0;

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(draw);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(draw);
    } else {
      draw();
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, audioEngine]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { clientWidth, clientHeight } = canvasRef.current.parentElement;
        canvasRef.current.width = clientWidth;
        canvasRef.current.height = clientHeight;
        if (!isPlaying) draw();
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl shadow-2xl border border-white/10">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
});

export default GameBoard;
