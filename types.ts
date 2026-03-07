import React from 'react';

export type LabType = 'glass' | 'neon' | 'cube' | 'blob' | 'neumorphism' | 'glitch' | 'gradient-text' | 'long-shadow' | 'gradient-border';

export interface GlassState {
  blur: number;
  opacity: number;
  saturation: number;
  borderRadius: number;
}

export interface NeonState {
  text: string;
  hue: number;
  spread: number;
  flicker: boolean;
}

export interface CubeState {
  rotateX: number;
  rotateY: number;
  scale: number;
  spacing: number;
}

export interface BlobState {
  v1: number;
  v2: number;
  v3: number;
  v4: number;
  gradient1: string;
  gradient2: string;
}

export interface NeumorphismState {
  size: number;
  radius: number;
  distance: number;
  blur: number;
  intensity: number;
  shape: 'flat' | 'concave' | 'convex' | 'pressed';
}

export interface GlitchState {
  text: string;
  offset: number;
  color1: string;
  color2: string;
}

export interface GradientTextState {
  text: string;
  degree: number;
  c1: string;
  c2: string;
  c3: string;
  animate: boolean;
}

export interface LongShadowState {
  text: string;
  angle: number;
  length: number;
  color: string;
  fade: boolean;
}

export interface GradientBorderState {
  width: number;
  radius: number;
  c1: string;
  c2: string;
  bg: string;
}

export interface LabConfig {
  id: LabType;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
}