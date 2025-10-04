import { VisualizationMode, AudienceType, VisualizationConfig, AudienceConfig } from './types';

export const visualizationModes: Record<VisualizationMode, VisualizationConfig> = {
  organic: {
    name: 'Organique',
    icon: '🫧',
    description: 'Bulles organiques avec physique',
    color: '#60a5fa'
  },
  radial: {
    name: 'Radiale',
    icon: '⭐',
    description: 'Cercles concentriques',
    color: '#fbbf24'
  },
  // treemap: {
  //   name: 'TreeMap',
  //   icon: '🗂️',
  //   description: 'Rectangles imbriqués',
  //   color: '#f472b6'
  // },
  sunburst: {
    name: 'Solaire',
    icon: '☀️',
    description: 'Diagramme circulaire hiérarchique',
    color: '#fb923c'
  },
  network: {
    name: 'Réseau',
    icon: '🕸️',
    description: 'Graphe de réseau optimisé',
    color: '#a78bfa'
  }
};

export const audienceConfig: Record<AudienceType, AudienceConfig> = {
  visitor: {
    name: 'Je suis un simple visiteur',
    icon: '👋',
    color: '#22c55e'
  },
  hr: {
    name: 'Je suis RH',
    icon: '💼',
    color: '#3b82f6'
  },
  technical: {
    name: "J'ai un profil technique",
    icon: '⚙️',
    color: '#f59e0b'
  }
};