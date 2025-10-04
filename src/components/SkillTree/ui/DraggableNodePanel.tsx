// 📁 components/DraggableNodePanel.tsx
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface Theme {
  colors?: {
    ui?: {
      glass?: string;
      border?: string;
    };
    text?: {
      primary?: string;
    };
  };
}

interface DraggableNodePanelProps {
  selectedNode: any;
  onClose: () => void;
  renderTooltipContent: (node: any) => React.ReactNode;
  theme?: Theme;
}

export function DraggableNodePanel({
  selectedNode,
  onClose,
  renderTooltipContent,
  theme
}: DraggableNodePanelProps) {
  const [position, setPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  // Calculer la position initiale
  useEffect(() => {
    if (selectedNode && !position) {
      // Attendre que le DOM soit prêt
      setTimeout(() => {
        const isMobile = window.innerWidth < 768;
        const panelWidth = isMobile ? Math.min(window.innerWidth - 32, 384) : 384;
        const panelHeight = panelRef.current?.offsetHeight || 500;

        if (isMobile) {
          // Sur mobile : centré au milieu de l'écran
          setPosition({
            x: (window.innerWidth - panelWidth) / 2,
            y: Math.max(16, (window.innerHeight - panelHeight) / 2)
          });
        } else {
          // Sur desktop : centre à droite
          setPosition({
            x: window.innerWidth - panelWidth - 16,
            y: Math.max(16, (window.innerHeight - panelHeight) / 2)
          });
        }
      }, 0);
    }
  }, [selectedNode, position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!position) return;
    const target = e.target as HTMLElement;
    if (target.closest('.close-button') || target.closest('.content-area')) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !position || !panelRef.current) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    const maxX = window.innerWidth - panelRef.current.offsetWidth;
    const maxY = window.innerHeight - panelRef.current.offsetHeight;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, position]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!position) return;
    const target = e.target as HTMLElement;
    if (target.closest('.close-button') || target.closest('.content-area')) return;

    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !position || !panelRef.current) return;

    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;

    const maxX = window.innerWidth - panelRef.current.offsetWidth;
    const maxY = window.innerHeight - panelRef.current.offsetHeight;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  // Reset position quand on ferme
  useEffect(() => {
    if (!selectedNode) {
      setPosition(null);
    }
  }, [selectedNode]);

  if (!selectedNode || !position) return null;

  const isMobile = window.innerWidth < 768;

  return (
    <div
      ref={panelRef}
      className="fixed backdrop-blur rounded-2xl border shadow-2xl z-30 flex flex-col overflow-y-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isMobile ? 'calc(100vw - 32px)' : '384px',
        maxWidth: '384px',
        maxHeight: 'calc(100vh - 32px)',
        backgroundColor: theme?.colors?.ui?.glass ?? "#222",
        borderColor: theme?.colors?.ui?.border ?? "#444",
        color: theme?.colors?.text?.primary ?? "#fff",
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Header déplaçable */}
      <div
        className="flex items-center justify-between p-4 border-b cursor-grab active:cursor-grabbing shrink-0"
        style={{
          borderColor: theme?.colors?.ui?.border ?? "#444",
        }}
      >
        <h3 className="font-semibold text-lg">Détails du Node</h3>
        <button
          className="close-button p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          onClick={onClose}
          aria-label="Fermer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Contenu */}
      <div
        className="content-area p-6"
        style={{
          overscrollBehavior: 'contain'
        }}
      >
        {renderTooltipContent(selectedNode)}
      </div>
    </div>
  );
}

export default DraggableNodePanel;

// =====================================
// 📱 UTILISATION
// =====================================

/**
 * import { DraggableNodePanel } from './components/DraggableNodePanel';
 * 
 * <DraggableNodePanel
 *   selectedNode={selectedNode}
 *   onClose={() => setSelectedNode(null)}
 *   renderTooltipContent={renderTooltipContent}
 *   theme={theme}
 * />
 * 
 * ✅ Types TypeScript complets
 * ✅ Responsive mobile (centré au milieu)
 * ✅ Responsive desktop (centre à droite)
 * ✅ Déplaçable partout
 * ✅ Support tactile mobile
 */