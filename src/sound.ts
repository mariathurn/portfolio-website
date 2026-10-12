// Retro 8-bit sound effects, synthesised with the Web Audio API (no audio files).
// The AudioContext is created on the first user interaction, as browsers require.

let audio: AudioContext | null = null;

const context = () => {
    if (!audio) {
        const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return null;
        audio = new Ctor();
    }
    if (audio.state === 'suspended') void audio.resume();
    return audio;
};

type Tone = {
    type?: OscillatorType;
    from: number; // start frequency in Hz
    to?: number; // end frequency (slide)
    start?: number; // delay in seconds
    duration: number;
    volume?: number;
};

const tone = ({ type = 'square', from, to, start = 0, duration, volume = 0.08 }: Tone) => {
    const ctx = context();
    if (!ctx) return;
    const t = ctx.currentTime + start;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, t);
    if (to) osc.frequency.exponentialRampToValueAtTime(to, t + duration);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + duration + 0.02);
};

const noise = (duration: number, volume = 0.06) => {
    const ctx = context();
    if (!ctx) return;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    // Coarse, "crunchy" noise like old sound chips
    for (let i = 0; i < data.length; i += 8) {
        const value = Math.random() * 2 - 1;
        for (let j = i; j < i + 8 && j < data.length; j++) data[j] = value;
    }
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = buffer;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    source.connect(gain).connect(ctx.destination);
    source.start();
};

export const sfx = {
    // Call from a click/tap so the browser allows audio
    unlock: () => { context(); },
    start: () => {
        tone({ from: 392, duration: 0.08 });
        tone({ from: 587, start: 0.08, duration: 0.12 });
    },
    jump: () => tone({ from: 260, to: 620, duration: 0.14 }),
    doubleJump: () => tone({ from: 420, to: 900, duration: 0.14 }),
    collect: () => {
        tone({ from: 988, duration: 0.07, volume: 0.06 });
        tone({ from: 1319, start: 0.07, duration: 0.2, volume: 0.06 });
    },
    hit: () => {
        tone({ type: 'square', from: 300, to: 70, duration: 0.3, volume: 0.09 });
        noise(0.18);
    },
    win: () => {
        [523, 659, 784, 1047].forEach((freq, i) => tone({ from: freq, start: i * 0.1, duration: 0.12 }));
        tone({ type: 'triangle', from: 1047, start: 0.4, duration: 0.45, volume: 0.1 });
    },
};
