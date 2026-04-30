// AudioEngine.js
// Handles Web Audio API contexts, decoding, and offline onset detection.

export class AudioEngine {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.buffer = null;
    this.source = null;
    this.startTime = 0;
    this.isPlaying = false;
  }

  // Decodes a File or Blob into an AudioBuffer
  async loadAudio(file) {
    const arrayBuffer = await file.arrayBuffer();
    this.buffer = await this.audioContext.decodeAudioData(arrayBuffer);
    return this.buffer;
  }

  // Fetches and decodes an audio file from a URL
  async loadFromUrl(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    this.buffer = await this.audioContext.decodeAudioData(arrayBuffer);
    return this.buffer;
  }

  // Uses an OfflineAudioContext to filter the audio into 4 frequency bands,
  // renders it, and then analyzes the peaks to generate notes.
  async analyzeAudio(buffer) {
    const offlineCtx = new OfflineAudioContext(
      4, // 4 channels for 4 bands
      buffer.length,
      buffer.sampleRate
    );

    const source = offlineCtx.createBufferSource();
    source.buffer = buffer;

    // Filter 1: Bass (Lane 0) < 250Hz
    const filter1 = offlineCtx.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.frequency.value = 250;

    // Filter 2: Low-Mid (Lane 1) 250Hz - 1000Hz
    const filter2 = offlineCtx.createBiquadFilter();
    filter2.type = 'bandpass';
    filter2.frequency.value = 625; // center
    filter2.Q.value = 1;

    // Filter 3: High-Mid (Lane 2) 1000Hz - 4000Hz
    const filter3 = offlineCtx.createBiquadFilter();
    filter3.type = 'bandpass';
    filter3.frequency.value = 2500; // center
    filter3.Q.value = 1;

    // Filter 4: Treble (Lane 3) > 4000Hz
    const filter4 = offlineCtx.createBiquadFilter();
    filter4.type = 'highpass';
    filter4.frequency.value = 4000;

    const merger = offlineCtx.createChannelMerger(4);

    source.connect(filter1);
    filter1.connect(merger, 0, 0);

    source.connect(filter2);
    filter2.connect(merger, 0, 1);

    source.connect(filter3);
    filter3.connect(merger, 0, 2);

    source.connect(filter4);
    filter4.connect(merger, 0, 3);

    merger.connect(offlineCtx.destination);
    source.start(0);

    // Render the filtered audio
    const renderedBuffer = await offlineCtx.startRendering();
    
    // Now analyze the 4 channels
    const notes = [];
    const sampleRate = renderedBuffer.sampleRate;
    const windowSize = Math.floor(sampleRate * 0.02); // 20ms window
    const stepSize = Math.floor(sampleRate * 0.01); // 10ms step for overlap
    
    for (let channel = 0; channel < 4; channel++) {
      const data = renderedBuffer.getChannelData(channel);
      let localPeaks = [];
      
      // Moving average energy for adaptive thresholding
      let energyHistory = [];
      const historySize = 40; // 40 steps = 400ms history

      for (let i = 0; i < data.length - windowSize; i += stepSize) {
        let sum = 0;
        for (let j = 0; j < windowSize; j++) {
          sum += data[i + j] * data[i + j];
        }
        const energy = sum / windowSize; // RMS squared

        energyHistory.push(energy);
        if (energyHistory.length > historySize) {
          energyHistory.shift();
        }

        // Calculate local average
        const avgEnergy = energyHistory.reduce((a, b) => a + b, 0) / energyHistory.length;

        // Threshold logic (adjust multipliers based on testing)
        // Bass needs different threshold than Treble sometimes, but we'll use a general one
        const thresholdMultiplier = channel === 0 ? 1.8 : 2.5; 
        
        if (energy > avgEnergy * thresholdMultiplier && energy > 0.001) {
          const time = i / sampleRate;
          
          // Debounce: ensure we don't place notes too close to each other in the same lane (e.g., min 200ms)
          if (localPeaks.length === 0 || (time - localPeaks[localPeaks.length - 1].time) > 0.2) {
            localPeaks.push({ lane: channel, targetTime: time });
          }
        }
      }
      
      notes.push(...localPeaks);
    }

    // Sort all notes by time
    notes.sort((a, b) => a.targetTime - b.targetTime);
    return notes;
  }

  play() {
    if (!this.buffer) return;
    
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.audioContext.destination);
    
    this.startTime = this.audioContext.currentTime;
    this.source.start(0);
    this.isPlaying = true;

    this.source.onended = () => {
      this.isPlaying = false;
    };
  }

  stop() {
    if (this.source) {
      this.source.stop();
      this.source.disconnect();
    }
    this.isPlaying = false;
  }

  getCurrentTime() {
    if (!this.isPlaying) return 0;
    return this.audioContext.currentTime - this.startTime;
  }
}
