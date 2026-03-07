import { Layers, Zap, Box, Shapes, MousePointer2, Activity, Palette, MoveDownRight, Frame } from 'lucide-react';
import { LabConfig, GlassState, NeonState, CubeState, BlobState, NeumorphismState, GlitchState, GradientTextState, LongShadowState, GradientBorderState } from './types';

export const LABS: LabConfig[] = [
  {
    id: 'glass',
    label: 'Glassmorphism',
    icon: Layers,
    description: 'Design frosted glass effects with backdrop-filters.'
  },
  {
    id: 'neon',
    label: 'Neon Glow',
    icon: Zap,
    description: 'Create electrified text with multiple shadow layers.'
  },
  {
    id: 'cube',
    label: '3D Transform',
    icon: Box,
    description: 'Manipulate CSS 3D space and perspectives.'
  },
  {
    id: 'blob',
    label: 'Morphing Blob',
    icon: Shapes,
    description: 'Generate organic shapes using border-radius morphing.'
  },
  {
    id: 'neumorphism',
    label: 'Neumorphism',
    icon: MousePointer2,
    description: 'Soft UI generator for extruded plastic interfaces.'
  },
  {
    id: 'glitch',
    label: 'Glitch Text',
    icon: Activity,
    description: 'Retro RGB-split text effects and distortion.'
  },
  {
    id: 'gradient-text',
    label: 'Gradient Text',
    icon: Palette,
    description: 'Clip gradients to text with optional animations.'
  },
  {
    id: 'long-shadow',
    label: 'Long Shadow',
    icon: MoveDownRight,
    description: 'Generate deep, flat shadows for a dramatic effect.'
  },
  {
    id: 'gradient-border',
    label: 'Gradient Border',
    icon: Frame,
    description: 'Create borders with gradient fills using masking.'
  }
];

export const DEFAULT_GLASS: GlassState = {
  blur: 12,
  opacity: 0.15,
  saturation: 180,
  borderRadius: 24
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
  text: 'ERROR_404',
  offset: 3,
  color1: '#ff00ff', // Magenta
  color2: '#00ffff'  // Cyan
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