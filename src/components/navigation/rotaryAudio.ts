// Web Audio API mechanical tick synthesizer for authentic vintage rotary dial feedback

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function toggleRotarySound(enabled?: boolean): boolean {
  if (enabled !== undefined) {
    soundEnabled = enabled;
  } else {
    soundEnabled = !soundEnabled;
  }
  return soundEnabled;
}

export function isRotarySoundEnabled(): boolean {
  return soundEnabled;
}

export function playMechanicalTick(type: "click" | "snap" | "ratchet" = "click") {
  if (!soundEnabled || typeof window === "undefined") return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }

    const now = audioCtx.currentTime;

    if (type === "click" || type === "ratchet") {
      // Crisp mechanical pawl click: highpass noise + short damped metallic ping
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      const isRatchet = type === "ratchet";
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(isRatchet ? 1800 : 2200, now);
      filter.Q.setValueAtTime(4, now);

      osc.type = "sine";
      osc.frequency.setValueAtTime(isRatchet ? 1200 : 1600, now);
      osc.frequency.exponentialRampToValueAtTime(isRatchet ? 300 : 400, now + 0.022);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.028);
    } else if (type === "snap") {
      // Solid detent lock-in: slightly deeper thud with brass harmonic
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.045);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.055);
    }
  } catch {
    // Graceful silent fallback if Web Audio is blocked or unsupported
  }
}
