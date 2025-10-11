import { VisualizationMode, AudienceType, VisualizationConfig, AudienceConfig } from './types';

export const visualizationModes: Record<VisualizationMode, VisualizationConfig> = {
  sunburst: {
    name: 'Solaire',
    icon: '☀️',
    description: 'Diagramme circulaire hiérarchique',
    color: '#fb923c'
  },
  network: {
    name: 'Réseau',
    icon: '🕸️',
    description: 'Graphe de réseau interactif',
    color: '#a78bfa'
  }
};

export const audienceConfig: Record<AudienceType, AudienceConfig> = {
  visitor: {
    name: 'Visiteur',
    icon: '👋',
    color: '#22c55e',
    description: 'Vue simplifiée et accessible pour découvrir mes compétences',
    badge: 'Découverte'
  },
  hr: {
    name: 'Recruteur',
    icon: '💼',
    color: '#3b82f6',
    description: 'Focus sur l\'impact business, le leadership et les résultats concrets',
    badge: 'Business'
  },
  technical: {
    name: 'Technique',
    icon: '⚙️',
    color: '#f59e0b',
    description: 'Détails techniques complets, architecture et stack technologique',
    badge: 'Expert'
  }
};