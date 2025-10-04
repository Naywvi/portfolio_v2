export interface Theme {
  id: string;
  name: string;
  icon: string;
  colors: {
    background: {
      primary: string;
      secondary: string;
      gradient: [string, string];
    };
    nodes: {
      center: string;
      categories: Record<string, string>;
    };
    links: string;
    text: {
      primary: string;
      secondary: string;
      shadow: string;
    };
    ui: {
      tooltip: string;
      border: string;
      glass: string;
    };
  };
  effects: {
    glow: boolean;
    breathing: boolean;
    particles: boolean;
    shadows: string;
  };
  nodeStyle?: {
    borderRadius?: string;
    borderWidth?: number;
  };
}

export const themes: Record<string, Theme> = {
  sobre: {
    id: 'sobre',
    name: 'Sobre',
    icon: '🏢',
    colors: {
      background: {
        primary: '#f8f9fa',
        secondary: '#ffffff',
        gradient: ['#f8f9fa', '#e9ecef']
      },
      nodes: {
        center: '#495057',
        categories: {
          'Développement': '#6c757d',
          'Infrastructure': '#495057',
          'Sécurité': '#343a40',
          'Management': '#6c757d',
          'Spécialisations': '#495057'
        }
      },
      links: '#ced4da',
      text: {
        primary: '#212529',
        secondary: '#6c757d',
        shadow: 'rgba(0,0,0,0.1)'
      },
      ui: {
        tooltip: '#ffffff',
        border: '#dee2e6',
        glass: 'rgba(255,255,255,0.9)'
      }
    },
    effects: {
      glow: false,
      breathing: false,
      particles: false,
      shadows: '0 2px 4px rgba(0,0,0,0.1)'
    }
  },

  chill: {
    id: 'chill',
    name: 'Chill',
    icon: '🌸',
    colors: {
      background: {
        primary: '#fef7f0',
        secondary: '#fff8f3',
        gradient: ['#fef7f0', '#f3e8ff']
      },
      nodes: {
        center: '#d8b4fe',
        categories: {
          'Développement': '#fb7185',
          'Infrastructure': '#34d399',
          'Sécurité': '#60a5fa',
          'Management': '#fbbf24',
          'Spécialisations': '#c084fc'
        }
      },
      links: '#e5b3f7',
      text: {
        primary: '#374151',
        secondary: '#6b7280',
        shadow: 'rgba(0,0,0,0.1)'
      },
      ui: {
        tooltip: '#ffffff',
        border: '#f3e8ff',
        glass: 'rgba(255,255,255,0.8)'
      }
    },
    effects: {
      glow: true,
      breathing: true,
      particles: true,
      shadows: '0 8px 32px rgba(0,0,0,0.1)'
    }
  },

  vscode: {
    id: 'vscode',
    name: 'VS Code',
    icon: '💻',
    colors: {
      background: {
        primary: '#1e1e1e',
        secondary: '#252526',
        gradient: ['#1e1e1e', '#2d2d30']
      },
      nodes: {
        center: '#007acc',
        categories: {
          'Développement': '#f92672',
          'Infrastructure': '#66d9ef',
          'Sécurité': '#a6e22e',
          'Management': '#fd971f',
          'Spécialisations': '#ae81ff'
        }
      },
      links: '#3e3e42',
      text: {
        primary: '#d4d4d4',
        secondary: '#9cdcfe',
        shadow: 'rgba(0,0,0,0.8)'
      },
      ui: {
        tooltip: '#252526',
        border: '#3e3e42',
        glass: 'rgba(37, 37, 38, 0.9)'
      }
    },
    effects: {
      glow: true,
      breathing: false,
      particles: false,
      shadows: '0 4px 16px rgba(0,0,0,0.4)'
    }
  },

  neon: {
    id: 'neon',
    name: 'Neon',
    icon: '⚡',
    colors: {
      background: {
        primary: '#0a0a0a',
        secondary: '#1a0a1a',
        gradient: ['#0a0a0a', '#1a0a2e']
      },
      nodes: {
        center: '#ff00ff',
        categories: {
          'Développement': '#00ffff',
          'Infrastructure': '#ff6600',
          'Sécurité': '#00ff00',
          'Management': '#ffff00',
          'Spécialisations': '#ff0099'
        }
      },
      links: '#ff00ff',
      text: {
        primary: '#ffffff',
        secondary: '#00ffff',
        shadow: 'rgba(255,0,255,0.5)'
      },
      ui: {
        tooltip: '#0a0a0a',
        border: '#ff00ff',
        glass: 'rgba(10, 10, 10, 0.9)'
      }
    },
    effects: {
      glow: true,
      breathing: true,
      particles: true,
      shadows: '0 0 20px rgba(255,0,255,0.3)'
    }
  },

  nature: {
    id: 'nature',
    name: 'Nature',
    icon: '🌿',
    colors: {
      background: {
        primary: '#f0f4e6',
        secondary: '#e8f5e8',
        gradient: ['#f0f4e6', '#e1f5fe']
      },
      nodes: {
        center: '#8bc34a',
        categories: {
          'Développement': '#4caf50',
          'Infrastructure': '#795548',
          'Sécurité': '#607d8b',
          'Management': '#ff9800',
          'Spécialisations': '#9c27b0'
        }
      },
      links: '#a5d6a7',
      text: {
        primary: '#2e7d32',
        secondary: '#388e3c',
        shadow: 'rgba(0,0,0,0.2)'
      },
      ui: {
        tooltip: '#ffffff',
        border: '#c8e6c9',
        glass: 'rgba(255,255,255,0.8)'
      }
    },
    effects: {
      glow: false,
      breathing: true,
      particles: false,
      shadows: '0 4px 12px rgba(76, 175, 80, 0.2)'
    }
  },

  mindmap: {
    id: 'mindmap',
    name: 'Mind Map',
    icon: '🎨',
    colors: {
      background: {
        primary: '#ffffff',
        secondary: '#fafafa',
        gradient: ['#ffffff', '#f5f5f5']
      },
      nodes: {
        center: '#9b87f5',
        categories: {
          'Développement': '#ffa5a5',
          'Infrastructure': '#a5e6d1',
          'Sécurité': '#ffd4a5',
          'Management': '#c5a5ff',
          'Spécialisations': '#ffb5d4'
        }
      },
      links: '#333333',
      text: {
        primary: '#2d2d2d',
        secondary: '#555555',
        shadow: 'rgba(0,0,0,0.15)'
      },
      ui: {
        tooltip: '#ffffff',
        border: '#e0e0e0',
        glass: 'rgba(255,255,255,0.95)'
      }
    },
    effects: {
      glow: false,
      breathing: false,
      particles: false,
      shadows: '0 3px 8px rgba(0,0,0,0.12)'
    },
    nodeStyle: {
      borderRadius: '12px',
      borderWidth: 3
    }
  },

  permaculture: {
    id: 'permaculture',
    name: 'Permaculture',
    icon: '🌱',
    colors: {
      background: {
        primary: '#fefdfb',
        secondary: '#f9f8f6',
        gradient: ['#fefdfb', '#f5f3ef']
      },
      nodes: {
        center: '#e8a87c',
        categories: {
          'Développement': '#c9ada7',
          'Infrastructure': '#9fc5cf',
          'Sécurité': '#e8b5ce',
          'Management': '#d4a5a5',
          'Spécialisations': '#b8c9a3'
        }
      },
      links: '#8b7355',
      text: {
        primary: '#4a3f35',
        secondary: '#6b5d52',
        shadow: 'rgba(75,63,53,0.15)'
      },
      ui: {
        tooltip: '#ffffff',
        border: '#d4c4b0',
        glass: 'rgba(255,253,250,0.92)'
      }
    },
    effects: {
      glow: false,
      breathing: false,
      particles: false,
      shadows: '0 2px 6px rgba(139,115,85,0.15)'
    },
    nodeStyle: {
      borderRadius: '8px',
      borderWidth: 2
    }
  }
};

export type AudienceType = 'visitor' | 'hr' | 'technical';

export const audienceConfig = {
  visitor: {
    name: 'Je suis un simple visiteur',
    icon: '👋',
    description: 'Vue simplifiée et accessible',
    color: '#22c55e'
  },
  hr: {
    name: 'Je suis RH',
    icon: '💼',
    description: 'Impact business et leadership',
    color: '#3b82f6'
  },
  technical: {
    name: 'J\'ai un profil technique',
    icon: '⚙️',
    description: 'Détails techniques complets',
    color: '#f59e0b'
  }
};

export type LayoutMode = 'organic' | 'radial';

export const layoutConfig = {
  organic: {
    name: 'Organique',
    icon: '🫧',
    description: 'Disposition naturelle et fluide'
  },
  radial: {
    name: 'Radial',
    icon: '⭐',
    description: 'Disposition circulaire'
  }
};