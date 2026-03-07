import React, { useState } from 'react';
import { Copy, Check, Code2, RefreshCcw, Hexagon } from 'lucide-react';
import { LABS, DEFAULT_GLASS, DEFAULT_NEON, DEFAULT_CUBE, DEFAULT_BLOB, DEFAULT_NEUMORPHISM, DEFAULT_GLITCH, DEFAULT_GRADIENT_TEXT, DEFAULT_LONG_SHADOW, DEFAULT_GRADIENT_BORDER } from './constants';
import { LabType, GlassState, NeonState, CubeState, BlobState, NeumorphismState, GlitchState, GradientTextState, LongShadowState, GradientBorderState } from './types';

// --- Shared Components ---

const Slider = ({ label, value, min, max, onChange, unit = '' }: { label: string, value: number, min: number, max: number, onChange: (val: number) => void, unit?: string }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-3 items-baseline">
      <label className="text-xs font-bold text-playground-muted uppercase tracking-wider">{label}</label>
      <span className="text-sm font-mono text-white">{value}{unit}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value))}
      step={max > 10 ? 1 : 0.1}
    />
  </div>
);

const Toggle = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (val: boolean) => void }) => (
  <div className="flex items-center justify-between mb-6 cursor-pointer group select-none" onClick={() => onChange(!checked)}>
    <label className="text-xs font-bold text-playground-muted uppercase tracking-wider group-hover:text-white transition-colors cursor-pointer">{label}</label>
    <button 
      className={`w-10 h-5 rounded-full relative transition-all duration-300 ${checked ? 'bg-white' : 'bg-zinc-800'}`}
    >
      <div className={`absolute top-1 left-1 w-3 h-3 rounded-full transition-transform duration-300 ${checked ? 'translate-x-5 bg-black' : 'translate-x-0 bg-zinc-500'}`} />
    </button>
  </div>
);

const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => (
    <div className="mb-6">
        <label className="text-xs font-bold text-playground-muted uppercase tracking-wider mb-3 block">{label}</label>
        <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full border border-white/20 overflow-hidden shrink-0">
                <div className="absolute inset-0" style={{ backgroundColor: value }}></div>
                <input 
                    type="color" 
                    value={value} 
                    onChange={(e) => onChange(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" 
                />
            </div>
            <input 
                type="text" 
                value={value} 
                onChange={(e) => onChange(e.target.value)} 
                className="flex-1 bg-transparent border-b border-white/10 py-2 text-sm font-mono text-white focus:border-white focus:outline-none transition-all uppercase placeholder-zinc-700"
                placeholder="#000000"
            />
        </div>
    </div>
);

// --- Labs Renderers ---

const GlassLab = ({ state }: { state: GlassState }) => (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[80%] bg-gradient-to-tr from-indigo-500/20 via-transparent to-rose-500/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
             <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>

        <div 
          className="relative z-10 p-10 w-[420px] min-h-[260px] flex flex-col justify-between text-white transition-all duration-300"
          style={{
            background: `rgba(255, 255, 255, ${state.opacity})`,
            backdropFilter: `blur(${state.blur}px) saturate(${state.saturation}%)`,
            WebkitBackdropFilter: `blur(${state.blur}px) saturate(${state.saturation}%)`,
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: `${state.borderRadius}px`,
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
          }}
        >
          <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/20 to-transparent border border-white/10 mb-6"></div>
              <h3 className="text-2xl font-semibold mb-2">Glass Effect</h3>
              <p className="text-white/60 text-sm leading-relaxed">Experience depth and texture through blurred backdrops.</p>
          </div>
          <div className="mt-8 flex items-center gap-4">
              <div className="h-10 w-full bg-white/10 rounded-lg"></div>
              <div className="h-10 w-10 bg-white/10 rounded-lg"></div>
          </div>
        </div>
    </div>
);

const NeonLab = ({ state }: { state: NeonState }) => (
    <div className="w-full h-full flex items-center justify-center relative bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
        <style>{`@keyframes flicker { 0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; } 20%, 24%, 55% { opacity: 0.4; } }`}</style>
        <h1 
          className="relative z-10 text-6xl md:text-9xl font-sans font-bold text-center tracking-tighter"
          style={{
            color: '#fff',
            textShadow: `
              0 0 7px hsl(${state.hue}, 100%, 50%),
              0 0 20px hsl(${state.hue}, 100%, 50%),
              0 0 ${40 + state.spread}px hsl(${state.hue}, 100%, 50%)
            `,
            animation: state.flicker ? 'flicker 1.5s infinite alternate' : 'none'
          }}
        >
          {state.text}
        </h1>
    </div>
);

const CubeLab = ({ state }: { state: CubeState }) => (
    <div className="w-full h-full flex items-center justify-center relative perspective-[1200px] overflow-hidden bg-[#050505]">
        <div 
          className="relative w-64 h-64 transition-transform duration-100 ease-linear"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg) scale(${state.scale})`
          }}
        >
          {[
            { id: '1', t: `translateZ(${100 + state.spacing}px)` },
            { id: '2', t: `translateZ(-${100 + state.spacing}px) rotateY(180deg)` },
            { id: '3', t: `translateX(${100 + state.spacing}px) rotateY(90deg)` },
            { id: '4', t: `translateX(-${100 + state.spacing}px) rotateY(-90deg)` },
            { id: '5', t: `translateY(-${100 + state.spacing}px) rotateX(90deg)` },
            { id: '6', t: `translateY(${100 + state.spacing}px) rotateX(-90deg)` },
          ].map((face, i) => (
            <div 
              key={i}
              className="absolute inset-0 border border-white/40 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/80 font-mono text-2xl"
              style={{ transform: face.t }}
            >
                0{face.id}
            </div>
          ))}
        </div>
    </div>
);

const BlobLab = ({ state }: { state: BlobState }) => {
  const borderRadius = `${state.v1}% ${100 - state.v1}% ${100 - state.v3}% ${state.v3}% / ${state.v4}% ${state.v2}% ${100 - state.v2}% ${100 - state.v4}%`;
  return (
    <div className="w-full h-full flex items-center justify-center relative bg-[#050505]">
        <div 
          className="relative w-[400px] h-[400px] transition-all duration-1000 ease-in-out blur-2xl opacity-60 absolute"
          style={{
            background: `linear-gradient(135deg, ${state.gradient1}, ${state.gradient2})`,
            borderRadius: borderRadius,
            transform: 'scale(1.1)'
          }}
        />
        <div 
          className="relative w-[400px] h-[400px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-10"
          style={{
            background: `linear-gradient(135deg, ${state.gradient1}, ${state.gradient2})`,
            borderRadius: borderRadius
          }}
        />
    </div>
  );
};

const NeumorphismLab = ({ state }: { state: NeumorphismState }) => {
  const baseColor = '#101010';
  const lightShadow = `${state.shape === 'pressed' ? 'inset ' : ''}-${state.distance}px -${state.distance}px ${state.blur}px rgba(255, 255, 255, ${0.04 * (state.intensity * 3)})`;
  const darkShadow = `${state.shape === 'pressed' ? 'inset ' : ''}${state.distance}px ${state.distance}px ${state.blur}px rgba(0, 0, 0, ${0.8 * (state.intensity * 2)})`;
  const gradient = state.shape === 'concave' ? 'linear-gradient(145deg, #0a0a0a, #141414)' : state.shape === 'convex' ? 'linear-gradient(145deg, #141414, #0a0a0a)' : baseColor;

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-[#101010]">
        <div 
          className="flex items-center justify-center text-white transition-all duration-200"
          style={{
            width: `${state.size}px`,
            height: `${state.size}px`,
            background: gradient,
            borderRadius: `${state.radius}px`,
            boxShadow: `${darkShadow}, ${lightShadow}`
          }}
        >
            <div className="w-1/3 h-1/3 rounded-full border border-white/5 bg-white/5"></div>
        </div>
    </div>
  );
};

const GlitchLab = ({ state }: { state: GlitchState }) => (
    <div className="w-full h-full flex items-center justify-center relative bg-black">
        <h1 
            className="text-8xl md:text-[10rem] font-bold tracking-tighter relative z-0"
            style={{
                color: 'white',
                textShadow: `${state.offset}px 0 ${state.color1}, -${state.offset}px 0 ${state.color2}`
            }}
        >
            {state.text}
        </h1>
    </div>
);

const GradientTextLab = ({ state }: { state: GradientTextState }) => (
    <div className="w-full h-full flex items-center justify-center relative bg-black">
         <style>{`@keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}</style>
        <h1 
          className="text-7xl md:text-[9rem] font-black text-center px-4 leading-none tracking-tight"
          style={{
            background: `linear-gradient(${state.degree}deg, ${state.c1}, ${state.c2}, ${state.c3})`,
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: state.animate ? 'gradient 3s linear infinite' : 'none'
          }}
        >
          {state.text}
        </h1>
    </div>
);

const LongShadowLab = ({ state }: { state: LongShadowState }) => {
  const generateShadows = () => {
    let shadows = [];
    for(let i = 1; i <= state.length; i++) {
        const rad = state.angle * (Math.PI / 180);
        const x = Math.round(Math.sin(rad) * i);
        const y = Math.round(Math.cos(rad) * i);
        shadows.push(`${x}px ${y}px 0 ${state.color}`);
    }
    return shadows.join(',\n  ');
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-[#050505] overflow-hidden">
        <h1 
          className="text-8xl md:text-[11rem] font-black text-white p-4 leading-none"
          style={{ textShadow: generateShadows().replace(/\n/g, '') }}
        >
          {state.text}
        </h1>
    </div>
  );
};

const GradientBorderLab = ({ state }: { state: GradientBorderState }) => (
    <div className="w-full h-full flex items-center justify-center relative bg-[#050505]">
        <div 
            className="w-[500px] h-[300px] flex flex-col items-center justify-center text-white font-bold text-3xl shadow-2xl relative z-10"
            style={{
                background: `linear-gradient(${state.bg}, ${state.bg}) padding-box, linear-gradient(45deg, ${state.c1}, ${state.c2}) border-box`,
                border: `${state.width}px solid transparent`,
                borderRadius: `${state.radius}px`
            }}
        >
            <div className="text-center">
                <div className="text-4xl mb-2">Gradient</div>
                <div className="text-sm font-normal text-white/50 font-mono">BORDER MODULE</div>
            </div>
        </div>
    </div>
);

// --- Main App ---

const App: React.FC = () => {
  const [activeLabId, setActiveLabId] = useState<LabType>('glass');
  
  // States
  const [glassState, setGlassState] = useState(DEFAULT_GLASS);
  const [neonState, setNeonState] = useState(DEFAULT_NEON);
  const [cubeState, setCubeState] = useState(DEFAULT_CUBE);
  const [blobState, setBlobState] = useState(DEFAULT_BLOB);
  const [neumorphismState, setNeumorphismState] = useState(DEFAULT_NEUMORPHISM);
  const [glitchState, setGlitchState] = useState(DEFAULT_GLITCH);
  const [gradientTextState, setGradientTextState] = useState(DEFAULT_GRADIENT_TEXT);
  const [longShadowState, setLongShadowState] = useState(DEFAULT_LONG_SHADOW);
  const [gradientBorderState, setGradientBorderState] = useState(DEFAULT_GRADIENT_BORDER);

  const activeLabConfig = LABS.find(l => l.id === activeLabId)!;

  const renderPreview = () => {
    switch(activeLabId) {
        case 'glass': return <GlassLab state={glassState} />;
        case 'neon': return <NeonLab state={neonState} />;
        case 'cube': return <CubeLab state={cubeState} />;
        case 'blob': return <BlobLab state={blobState} />;
        case 'neumorphism': return <NeumorphismLab state={neumorphismState} />;
        case 'glitch': return <GlitchLab state={glitchState} />;
        case 'gradient-text': return <GradientTextLab state={gradientTextState} />;
        case 'long-shadow': return <LongShadowLab state={longShadowState} />;
        case 'gradient-border': return <GradientBorderLab state={gradientBorderState} />;
        default: return null;
    }
  };

  const renderControls = () => {
    switch(activeLabId) {
        case 'glass': return (
            <>
                <Slider label="Blur Strength" value={glassState.blur} min={0} max={40} unit="px" onChange={(v) => setGlassState({...glassState, blur: v})} />
                <Slider label="Opacity" value={glassState.opacity} min={0} max={1} unit="" onChange={(v) => setGlassState({...glassState, opacity: v})} />
                <Slider label="Saturation" value={glassState.saturation} min={0} max={200} unit="%" onChange={(v) => setGlassState({...glassState, saturation: v})} />
                <Slider label="Border Radius" value={glassState.borderRadius} min={0} max={50} unit="px" onChange={(v) => setGlassState({...glassState, borderRadius: v})} />
            </>
        );
        case 'neon': return (
            <>
                 <div className="mb-6">
                    <label className="text-xs font-bold text-playground-muted uppercase tracking-wider mb-3 block">Text Content</label>
                    <input type="text" value={neonState.text} onChange={(e) => setNeonState({...neonState, text: e.target.value.toUpperCase()})} maxLength={12} className="w-full bg-transparent border-b border-white/10 py-2 text-sm font-mono text-white focus:border-white focus:outline-none transition-all" />
                 </div>
                 <Slider label="Hue" value={neonState.hue} min={0} max={360} unit="°" onChange={(v) => setNeonState({...neonState, hue: v})} />
                 <Slider label="Glow Spread" value={neonState.spread} min={0} max={100} unit="px" onChange={(v) => setNeonState({...neonState, spread: v})} />
                 <Toggle label="Flicker Effect" checked={neonState.flicker} onChange={(v) => setNeonState({...neonState, flicker: v})} />
            </>
        );
        case 'cube': return (
            <>
                <Slider label="Rotate X" value={cubeState.rotateX} min={-180} max={180} unit="°" onChange={(v) => setCubeState({...cubeState, rotateX: v})} />
                <Slider label="Rotate Y" value={cubeState.rotateY} min={-180} max={180} unit="°" onChange={(v) => setCubeState({...cubeState, rotateY: v})} />
                <Slider label="Scale" value={cubeState.scale} min={0.5} max={1.5} unit="x" onChange={(v) => setCubeState({...cubeState, scale: v})} />
                <Slider label="Explode" value={cubeState.spacing} min={0} max={100} unit="px" onChange={(v) => setCubeState({...cubeState, spacing: v})} />
            </>
        );
        case 'blob': return (
            <>
                 <ColorInput label="Gradient Start" value={blobState.gradient1} onChange={(v) => setBlobState({...blobState, gradient1: v})} />
                 <ColorInput label="Gradient End" value={blobState.gradient2} onChange={(v) => setBlobState({...blobState, gradient2: v})} />
                 <div className="h-6"></div>
                 <Slider label="Morph Top" value={blobState.v1} min={0} max={100} unit="%" onChange={(v) => setBlobState({...blobState, v1: v})} />
                 <Slider label="Morph Right" value={blobState.v2} min={0} max={100} unit="%" onChange={(v) => setBlobState({...blobState, v2: v})} />
                 <Slider label="Morph Bottom" value={blobState.v3} min={0} max={100} unit="%" onChange={(v) => setBlobState({...blobState, v3: v})} />
                 <Slider label="Morph Left" value={blobState.v4} min={0} max={100} unit="%" onChange={(v) => setBlobState({...blobState, v4: v})} />
                 <div className="mt-6">
                    <button onClick={() => setBlobState({...blobState, v1: Math.random() * 80 + 10, v2: Math.random() * 80 + 10, v3: Math.random() * 80 + 10, v4: Math.random() * 80 + 10})} className="w-full py-3 bg-zinc-900 border border-white/5 hover:border-white/20 rounded-lg text-xs font-bold text-white uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                        <RefreshCcw size={14} /> Randomize Shape
                    </button>
                 </div>
            </>
        );
        case 'neumorphism': return (
            <>
                <div className="mb-8 grid grid-cols-2 gap-3">
                    {['flat', 'pressed', 'concave', 'convex'].map(shape => (
                        <button key={shape} onClick={() => setNeumorphismState({...neumorphismState, shape: shape as any})} className={`py-3 text-[10px] font-bold uppercase tracking-wider border rounded-lg transition-all ${neumorphismState.shape === shape ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-white/5 hover:border-white/10'}`}>{shape}</button>
                    ))}
                </div>
                <Slider label="Size" value={neumorphismState.size} min={50} max={400} unit="px" onChange={(v) => setNeumorphismState({...neumorphismState, size: v})} />
                <Slider label="Radius" value={neumorphismState.radius} min={0} max={200} unit="px" onChange={(v) => setNeumorphismState({...neumorphismState, radius: v})} />
                <Slider label="Distance" value={neumorphismState.distance} min={5} max={50} unit="px" onChange={(v) => setNeumorphismState({...neumorphismState, distance: v})} />
                <Slider label="Blur" value={neumorphismState.blur} min={0} max={100} unit="px" onChange={(v) => setNeumorphismState({...neumorphismState, blur: v})} />
                <Slider label="Intensity" value={neumorphismState.intensity} min={0.1} max={1} unit="" onChange={(v) => setNeumorphismState({...neumorphismState, intensity: v})} />
            </>
        );
        case 'glitch': return (
            <>
                <div className="mb-6">
                    <label className="text-xs font-bold text-playground-muted uppercase tracking-wider mb-3 block">Text</label>
                    <input type="text" value={glitchState.text} onChange={(e) => setGlitchState({...glitchState, text: e.target.value.toUpperCase()})} maxLength={10} className="w-full bg-transparent border-b border-white/10 py-2 text-sm font-mono text-white focus:border-white focus:outline-none transition-all" />
                </div>
                <ColorInput label="Left Channel" value={glitchState.color1} onChange={(v) => setGlitchState({...glitchState, color1: v})} />
                <ColorInput label="Right Channel" value={glitchState.color2} onChange={(v) => setGlitchState({...glitchState, color2: v})} />
                <Slider label="Distortion" value={glitchState.offset} min={0} max={20} unit="px" onChange={(v) => setGlitchState({...glitchState, offset: v})} />
            </>
        );
        case 'gradient-text': return (
             <>
                <div className="mb-6">
                    <label className="text-xs font-bold text-playground-muted uppercase tracking-wider mb-3 block">Text</label>
                    <input type="text" value={gradientTextState.text} onChange={(e) => setGradientTextState({...gradientTextState, text: e.target.value})} maxLength={10} className="w-full bg-transparent border-b border-white/10 py-2 text-sm font-mono text-white focus:border-white focus:outline-none transition-all" />
                </div>
                <ColorInput label="Stop 1" value={gradientTextState.c1} onChange={(v) => setGradientTextState({...gradientTextState, c1: v})} />
                <ColorInput label="Stop 2" value={gradientTextState.c2} onChange={(v) => setGradientTextState({...gradientTextState, c2: v})} />
                <ColorInput label="Stop 3" value={gradientTextState.c3} onChange={(v) => setGradientTextState({...gradientTextState, c3: v})} />
                <Slider label="Direction" value={gradientTextState.degree} min={0} max={360} unit="deg" onChange={(v) => setGradientTextState({...gradientTextState, degree: v})} />
                <Toggle label="Animate Flow" checked={gradientTextState.animate} onChange={(v) => setGradientTextState({...gradientTextState, animate: v})} />
             </>
        );
        case 'long-shadow': return (
            <>
                <div className="mb-6">
                    <label className="text-xs font-bold text-playground-muted uppercase tracking-wider mb-3 block">Text</label>
                    <input type="text" value={longShadowState.text} onChange={(e) => setLongShadowState({...longShadowState, text: e.target.value.toUpperCase()})} maxLength={6} className="w-full bg-transparent border-b border-white/10 py-2 text-sm font-mono text-white focus:border-white focus:outline-none transition-all" />
                </div>
                <ColorInput label="Shadow Tint" value={longShadowState.color} onChange={(v) => setLongShadowState({...longShadowState, color: v})} />
                <Slider label="Projection Angle" value={longShadowState.angle} min={0} max={360} unit="deg" onChange={(v) => setLongShadowState({...longShadowState, angle: v})} />
                <Slider label="Shadow Depth" value={longShadowState.length} min={0} max={200} unit="px" onChange={(v) => setLongShadowState({...longShadowState, length: v})} />
            </>
        );
        case 'gradient-border': return (
            <>
                <ColorInput label="Background" value={gradientBorderState.bg} onChange={(v) => setGradientBorderState({...gradientBorderState, bg: v})} />
                <ColorInput label="Stop A" value={gradientBorderState.c1} onChange={(v) => setGradientBorderState({...gradientBorderState, c1: v})} />
                <ColorInput label="Stop B" value={gradientBorderState.c2} onChange={(v) => setGradientBorderState({...gradientBorderState, c2: v})} />
                <Slider label="Stroke Width" value={gradientBorderState.width} min={1} max={20} unit="px" onChange={(v) => setGradientBorderState({...gradientBorderState, width: v})} />
                <Slider label="Radius" value={gradientBorderState.radius} min={0} max={50} unit="px" onChange={(v) => setGradientBorderState({...gradientBorderState, radius: v})} />
            </>
        );
        default: return null;
    }
  };

  const getCSS = () => {
    switch(activeLabId) {
        case 'glass': return `background: rgba(255, 255, 255, ${glassState.opacity});\nbackdrop-filter: blur(${glassState.blur}px) saturate(${glassState.saturation}%);\nborder-radius: ${glassState.borderRadius}px;`;
        case 'neon': return `text-shadow: 0 0 7px hsl(${neonState.hue}, 100%, 50%),\n0 0 21px hsl(${neonState.hue}, 100%, 50%);`;
        case 'cube': return `transform: rotateX(${cubeState.rotateX}deg) rotateY(${cubeState.rotateY}deg);`;
        case 'blob': return `border-radius: ${blobState.v1}% ${100-blobState.v1}% ...; \nbackground: linear-gradient(${blobState.gradient1}, ${blobState.gradient2});`;
        case 'neumorphism': return `box-shadow: ${neumorphismState.distance}px ${neumorphismState.distance}px ${neumorphismState.blur}px #000, ...;`;
        case 'glitch': return `text-shadow: ${glitchState.offset}px 0 ${glitchState.color1}, -${glitchState.offset}px 0 ${glitchState.color2};`;
        case 'gradient-text': return `background: linear-gradient(${gradientTextState.degree}deg, ${gradientTextState.c1}, ...);\n-webkit-background-clip: text;`;
        case 'long-shadow': return `text-shadow: 1px 1px 0 ${longShadowState.color}, 2px 2px 0 ${longShadowState.color}, ...;`;
        case 'gradient-border': return `background: linear-gradient(${gradientBorderState.bg}, ${gradientBorderState.bg}) padding-box, \nlinear-gradient(45deg, ${gradientBorderState.c1}, ${gradientBorderState.c2}) border-box;\nborder: ${gradientBorderState.width}px solid transparent;`;
        default: return '';
    }
  };

  const [copied, setCopied] = useState(false);
  const copyCSS = () => {
    navigator.clipboard.writeText(getCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden relative">
      
      {/* 1. Sidebar */}
      <aside className="w-[80px] lg:w-[260px] flex flex-col border-r border-white/5 bg-black z-30 transition-all duration-300">
         {/* Brand */}
         <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/5">
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <Hexagon size={20} strokeWidth={2.5} />
             </div>
             <span className="hidden lg:block ml-4 font-bold text-lg tracking-tight">CSS Designer</span>
         </div>

         {/* Navigation */}
         <nav className="flex-1 overflow-y-auto py-6 space-y-1 px-2 lg:px-4">
             <div className="hidden lg:block text-xs font-bold text-zinc-500 uppercase tracking-widest px-2 mb-4">Generators</div>
             {LABS.map(lab => (
                 <button
                    key={lab.id}
                    onClick={() => setActiveLabId(lab.id)}
                    className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 group relative ${activeLabId === lab.id ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                 >
                    {activeLabId === lab.id && <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full"></div>}
                    <lab.icon size={20} className={activeLabId === lab.id ? 'text-white' : 'group-hover:text-white'} />
                    <span className="hidden lg:block font-medium text-sm">{lab.label}</span>
                 </button>
             ))}
         </nav>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black">
         {/* Top Header */}
         <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-black/50 backdrop-blur-md z-20">
             <div>
                 <h1 className="text-2xl font-bold tracking-tight text-white mb-1">{activeLabConfig.label}</h1>
                 <p className="text-xs text-zinc-500 font-mono hidden md:block">{activeLabConfig.description}</p>
             </div>
             {/* Header actions removed */}
         </header>

         {/* Scrollable Content */}
         <div className="flex-1 overflow-y-auto p-4 lg:p-8">
             <div className="max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6 h-full min-h-[600px]">
                 
                 {/* Preview Canvas (Takes up most space) */}
                 <div className="xl:col-span-8 nebula-card relative overflow-hidden min-h-[400px] flex flex-col">
                     <div className="absolute top-6 left-6 z-10 flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md text-zinc-400">Preview Mode</span>
                     </div>
                     <div className="flex-1 relative">
                        {renderPreview()}
                     </div>
                 </div>

                 {/* Controls Panel (Right Sidebar) */}
                 <div className="xl:col-span-4 flex flex-col gap-6 h-full">
                     
                     {/* Configuration Card */}
                     <div className="nebula-card p-6 flex-1 flex flex-col min-h-0 overflow-hidden">
                         <div className="flex items-center justify-between mb-6 shrink-0">
                             <h3 className="text-lg font-bold">Configuration</h3>
                         </div>
                         
                         <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                            {renderControls()}
                         </div>
                     </div>

                     {/* CSS Output Card */}
                     <div className="nebula-card p-6 flex flex-col shrink-0">
                         <div className="flex items-center justify-between mb-4">
                              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Generated CSS</h3>
                              <button 
                                 onClick={copyCSS}
                                 className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${copied ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-zinc-200'}`}
                              >
                                 {copied ? <Check size={14} /> : <Copy size={14} />}
                                 {copied ? 'Copied' : 'Copy'}
                              </button>
                         </div>
                         <div className="bg-black/50 rounded-lg p-4 border border-white/5 relative group">
                              <pre className="text-xs font-mono text-blue-300 whitespace-pre-wrap break-all leading-relaxed">
                                 {getCSS()}
                              </pre>
                         </div>
                     </div>
                 </div>

             </div>
         </div>
      </main>

    </div>
  );
};

export default App;