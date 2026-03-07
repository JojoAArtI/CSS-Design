import { Layers, Zap, Box, Shapes, MousePointer2, Activity, Palette, MoveDownRight, Frame } from 'lucide-react';
import { LabConfig, GlassState, NeonState, CubeState, BlobState, NeumorphismState, GlitchState, GradientTextState, LongShadowState, GradientBorderState } from './types';

export const LABS: LabConfig[] = [
  {
    id: 'glass',
    label: 'Glassmorphism',
    icon: Layers,
    description: 'Depth through frosted surfaces and backdrop-filters.'
  },
  {
    id: 'neon',
    label: 'Neon Glow',
    icon: Zap,
    description: 'High-end lighting with layered text-shadows.'
  },
  {
    id: 'cube',
    label: '3D Transform',
    icon: Box,
    description: 'Orthographic and perspective 3D transformations.'
  },
  {
    id: 'blob',
    label: 'Morphing Blob',
    icon: Shapes,
    description: 'Smooth, fluid containers via border-radius morphing.'
  },
  {
    id: 'neumorphism',
    label: 'Neumorphism',
    icon: MousePointer2,
    description: 'Extruded surfaces using distance-based shading.'
  },
  {
    id: 'glitch',
    label: 'Glitch Text',
    icon: Activity,
    description: 'Achromatic channel splitting and distortion patterns.'
  },
  {
    id: 'gradient-text',
    label: 'Gradient Text',
    icon: Palette,
    description: 'Linear gradients clipped to typographic forms.'
  },
  {
    id: 'long-shadow',
    label: 'Long Shadow',
    icon: MoveDownRight,
    description: 'Deep orthographic shadows for visual weight.'
  },
  {
    id: 'gradient-border',
    label: 'Gradient Border',
    icon: Frame,
    description: 'Precise boundary highlights with masked gradients.'
  }
];

export const DEFAULT_GLASS: GlassState = {
  blur: 16,
  opacity: 0.1,
  saturation: 140,
  borderRadius: 16
};

export const DEFAULT_NEON: NeonState = {
  text: 'CYBERPUNK',
  hue: 310,
  spread: 10,
  flicker: false
};

export const DEFAULT_CUBE: CubeState = {
  rotateX: -25,
  rotateY: 45,
  scale: 1,
  spacing: 0
};

export const DEFAULT_BLOB: BlobState = {
  v1: 60,
  v2: 40,
  v3: 30,
  v4: 70,
  gradient1: '#38bdf8', // Light Blue
  gradient2: '#818cf8'  // Indigo
};

export const DEFAULT_NEUMORPHISM: NeumorphismState = {
  size: 200,
  radius: 30,
  distance: 20,
  blur: 40,
  intensity: 0.15,
  shape: 'flat'
};

export const DEFAULT_GLITCH: GlitchState = {
  text: 'STOCHASTIC',
  offset: 2,
  color1: 'rgba(255,255,255,0.4)',
  color2: 'rgba(255,255,255,0.2)'
};

export const DEFAULT_GRADIENT_TEXT: GradientTextState = {
  text: 'AWESOME',
  degree: 45,
  c1: '#f472b6',
  c2: '#22d3ee',
  c3: '#facc15',
  animate: true
};

export const DEFAULT_LONG_SHADOW: LongShadowState = {
  text: 'DEPTH',
  angle: 45,
  length: 50,
  color: '#020617', // Slate 950
  fade: true
};

export const DEFAULT_GRADIENT_BORDER: GradientBorderState = {
  width: 4,
  radius: 12,
  c1: '#ec4899',
  c2: '#8b5cf6',
  bg: '#1e293b'
};