'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { SkillNode, AudienceType, VisualizationMode, HierarchyNode } from './types';
import { renderSunburst } from './visualizations/SunburstLayout';
import { renderNetwork } from './visualizations/NetworkLayout';
import { ControlPanel } from './ControlPanel';
import { SkillModal } from './skillModal';

interface Props {
  data: SkillNode;
}

export function SkillTreeVisualization({ data }: Props): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<any, any> | null>(null);

  const [currentMode, setCurrentMode] = useState<VisualizationMode>('sunburst');
  const [currentAudience, setCurrentAudience] = useState<AudienceType>('visitor');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [highlightedOption, setHighlightedOption] = useState<number>(0);
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation d'onboarding
  useEffect(() => {
    if (!showOnboarding) return;

    const timer1 = setTimeout(() => setHighlightedOption(1), 1500);
    const timer2 = setTimeout(() => setHighlightedOption(2), 3000);
    const timer3 = setTimeout(() => setHighlightedOption(3), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [showOnboarding]);

  // Couleurs du thème
  const theme = {
    background: {
      primary: '#0a0a0a',
      gradient: ['#0a0a0a', '#1a0a2e'] as [string, string]
    },
    nodes: {
      center: '#8b5cf6'
    }
  };

  // Obtenir les données selon l'audience
  const getAudienceData = (node: SkillNode) => {
    if (!node.audiences) {
      if (node.children && node.children.length > 0) {
        return { description: node.name };
      }
      return { level: 0, description: node.name };
    }
    return node.audiences[currentAudience] || node.audiences.visitor || { description: node.name };
  };

  // Variation de couleur
  const getColorVariation = (baseColor: string, index: number): string => {
    const c = d3.color(baseColor);
    if (!c) return baseColor;
    const hsl = d3.hsl(c);
    hsl.h = (hsl.h + (index * 37)) % 360;
    const delta = index % 2 === 0 ? 0.12 : -0.08;
    hsl.l = Math.max(0.25, Math.min(0.85, hsl.l + delta));
    return hsl.formatHex();
  };

  // Conversion hiérarchie
  const convertToHierarchy = (node: SkillNode, parent: any = null, depth: number = 0): HierarchyNode => {
    const audienceData = getAudienceData(node);
    const value = audienceData.level || 1;

    const hierarchyNode: HierarchyNode = {
      name: node.name,
      data: audienceData,
      color: node.color || (parent?.color || theme.nodes.center),
      depth,
      value,
      parent
    };

    if (node.children) {
      hierarchyNode.children = node.children.map((child, i) => {
        const childColor = child.color || getColorVariation(hierarchyNode.color, i);
        return convertToHierarchy({ ...child, color: childColor }, hierarchyNode, depth + 1);
      });
    }

    return hierarchyNode;
  };

  // Effet principal de rendu
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = window.innerWidth;
    const height = window.innerHeight;
    svg.attr('width', width).attr('height', height);

    // Fond avec dégradé
    const defs = svg.append('defs');
    const backgroundGradient = defs
      .append('radialGradient')
      .attr('id', 'themeBackground')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '70%');

    backgroundGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('style', `stop-color:${theme.background.gradient[0]};stop-opacity:1`);

    backgroundGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('style', `stop-color:${theme.background.gradient[1]};stop-opacity:1`);

    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'url(#themeBackground)');

    const g = svg.append('g');

    // Zoom & pan
    svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.3, 3])
        .on('zoom', (event) => g.attr('transform', event.transform))
    );

    // Conversion des données
    const hierarchyData = convertToHierarchy(data);

    // Handler de clic
    const handleNodeClick = (node: any): void => {
      setSelectedNode(node);
      setIsModalOpen(true);
    };

    const vizProps = {
      g,
      data: hierarchyData,
      width,
      height,
      onNodeClick: handleNodeClick
    };

    // Rendu selon le mode
    switch (currentMode) {
      case 'sunburst':
        renderSunburst(vizProps);
        break;
      case 'network':
        renderNetwork(vizProps, simulationRef);
        break;
    }

    return () => {
      if (simulationRef.current) simulationRef.current.stop();
    };
  }, [data, currentMode, currentAudience]);

  const handleSkipOnboarding = (): void => {
    setShowOnboarding(false);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedNode(null);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* SVG principal - Arrière-plan */}
      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full"
        style={{ zIndex: 1 }}
      />

      {/* Overlay d'onboarding */}
      {showOnboarding && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-500">
          {/* Message principal */}
          <div className="absolute left-1/2 top-[15%] -translate-x-1/2 transform px-4 text-center sm:top-1/4">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Bienvenue ! 👋
            </h2>
            <p className="mb-8 text-lg text-gray-300 sm:text-xl">
              Choisissez votre profil pour une expérience personnalisée
            </p>
            <button
              onClick={handleSkipOnboarding}
              className="rounded-full bg-white/10 px-6 py-2 text-sm text-white transition-all hover:bg-white/20"
            >
              Passer l'introduction
            </button>
          </div>

          {/* Flèche pointant vers le panneau - Desktop uniquement */}
          <div className="absolute left-[22rem] top-[40%] hidden animate-bounce lg:block">
            <div className="text-6xl">👈</div>
            <p className="mt-2 text-lg font-semibold text-white">
              C'est ici !
            </p>
          </div>

          {/* Flèche mobile - pointe vers le haut */}
          <div className="absolute left-1/2 top-[35%] -translate-x-1/2 transform animate-bounce lg:hidden">
            <div className="text-6xl">☝️</div>
            <p className="mt-2 text-center text-lg font-semibold text-white">
              Juste ici !
            </p>
          </div>
        </div>
      )}

      {/* Panneau de contrôle - Rétractable */}
      <ControlPanel
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        currentAudience={currentAudience}
        setCurrentAudience={setCurrentAudience}
        showOnboarding={showOnboarding}
        highlightedOption={highlightedOption}
        onSelectAudience={handleSkipOnboarding}
      />

      {/* Modal */}
      <SkillModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedNode}
      />
    </div>
  );
}