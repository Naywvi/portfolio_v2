// SkillTreeVisualization.tsx - Composant principal
'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { SkillNode, NodeData, AudienceType, VisualizationMode, HierarchyNode } from './types';
import { visualizationModes, audienceConfig } from './visualizationConfig';
import { renderOrganic } from './visualizations/OrganicLayout';
import { renderRadial } from './visualizations/RadialLayout';
import { renderTreeMap } from './visualizations/TreeMapLayout';
import { renderSunburst } from './visualizations/SunburstLayout';
import { renderNetwork } from './visualizations/NetworkLayout';
import { themes } from './themes';
import { Github, Linkedin, Book, Link2Icon, Braces, Code, FileJson2, LampDesk, BookCopy, Library, Zap, School } from 'lucide-react';
import { DraggableNodePanel } from './DraggableNodePanel';
import { ControlPanel } from './ControlPanel';

interface Props {
  data: SkillNode;
}

export function SkillTreeVisualization({ data }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<NodeData, any> | null>(null);

  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<string>('vscode');
  const [currentMode, setCurrentMode] = useState<VisualizationMode>('organic');
  const [currentAudience, setCurrentAudience] = useState<AudienceType>('visitor');
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    data: any;
  }>({ show: false, x: 0, y: 0, data: null });

  const theme = themes[currentTheme];

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
  const getColorVariation = (baseColor: string, index: number) => {
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
      color: node.color || (parent?.color || theme?.colors?.nodes?.center || '#666'),
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

  // Rendu de la tooltip
  const renderTooltipContent = (data: any) => {
    if (!data) return null;

    const linkIcons: Record<string, any> = {
      Github: Github,
      Linkedin: Linkedin,
      Documentation: Book,
      Javascript: Braces,
      HTML5: FileJson2,
      CSS3: Code,
      Officiel: LampDesk,
      Hooks: BookCopy,
      Patterns: Library,
      Performance: Zap,
      Tutoriel: School,
    }

    const audienceData = data.data || data;

    const renderSection = (key: string, value: any) => {
      if (!value) return null;

      // Objet de traductions
      const translations: Record<string, string> = {
        'Years Experience': 'Années d\'expérience',
        'Skills': 'Compétences',
        'Languages': 'Langues',
        'Education': 'Formation',
        'Business Value': 'Valeur d\'entreprise',
        'Team Impact': 'Impact d\'équipe',
        'web_development': 'Développement web ',
        'Best_practices': 'Bonne pratiques'
      };

      const displayName = key
        .replace(/_/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Appliquer la traduction si elle existe
      const translatedName = translations[displayName] || displayName;

      let sectionColor = '#60a5fa';
      if (currentAudience === 'hr') {
        if (key.includes('business') || key.includes('impact')) sectionColor = '#fbbf24';
        else if (key.includes('team') || key.includes('leadership')) sectionColor = '#8b5cf6';
      } else if (currentAudience === 'technical') {
        if (key.includes('tech') || key.includes('feature')) sectionColor = '#06b6d4';
        else if (key.includes('performance')) sectionColor = '#10b981';
      }

      if (key === 'projects') {
        return (
          <>
            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
            <div key={key} className="text-sm">
              <span className="font-semibold text-green-400">Projets:</span>
              <ul className="mt-1 space-y-1">
                {Object.entries(value).map(([projectKey, projectData]: [string, any], i: number) => (
                  <li key={i} className="text-gray-300 text-xs flex items-center">
                    <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
                    <span>
                      <span className="font-medium text-green-300">{projectKey}:</span> {projectData.name}
                      <br></br>
                      {projectData.link && (
                        <a
                          href={projectData.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-400 hover:text-blue-200 underline"
                        >
                          Voir le projet
                        </a>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div >
          </>
        );
      }

      if (key === 'links') {
        return (
          <>
            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
            <div key={key} className="text-sm">
              <span className="flex items-center gap-2 font-semibold text-purple-400">
                <Link2Icon className="w-6 h-6" />
                Liens utiles:
              </span>
              <div className="mt-2 space-y-2">
                {Object.entries(value).map(([linkKey, linkUrl]: [string, any], i: number) => {
                  const Icon = linkIcons[linkKey];
                  console.log(linkKey, Icon);
                  if (!Icon) return null;
                  return (
                    <div key={i}>
                      <a
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-200 underline text-xs"
                      >
                        <Icon className="w-4 h-4" />
                        {linkKey}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div >
          </>
        );
      }
      const getRandomColor = () => {
        //couleur random dérivé de sectionColor couleur pastel de base foncée text en blanc donc attention
        //couleur tenden vers le foncé
        const color = d3.color(sectionColor);
        if (!color) return sectionColor;
        const hsl = d3.hsl(color);
        hsl.h = (hsl.h + Math.random() * 100 - 30) % 600; // Variation de teinte
        hsl.l = Math.max(0.3, Math.min(0.7, hsl.l + (Math.random() * 0.5 - 0.10))); // Variation de luminosité
        hsl.s = Math.max(0.4, Math.min(0.8, hsl.s + (Math.random() * 0.1 - 0.1))); // Variation de saturatio

        return hsl.formatHex();
      }
      if (key === 'Hooks' || key === 'Patterns' || key === 'Performance' || key === 'rendering' || key === 'deployment' || key === 'concepts' || key === 'runtime' || key === 'modules' || key === 'core' || key === 'stdlib' || key === 'ecosystem' || key === 'toolchain' || key === 'concurrency' || key === 'modern_php' || key === 'web' || key === 'Dotnet' || key === 'Oop' || key === 'systems' || key === 'performance') {//|| key ===''
        // with random color
        const randomColor = getRandomColor();

        return (
          <>
            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
            <div key={key} className="text-sm">
              <span className="font-semibold" style={{ color: sectionColor }}>{translatedName}:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {value.map((item: string, i: number) => (
                  <span key={i} className=" px-2 py-1 rounded text-xs" style={{ backgroundColor: randomColor }}>{item}</span>
                ))}
              </div>
            </div>
          </>
        );
      }

      if (Array.isArray(value)) {
        return (
          <><hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
            <div key={key} className="text-sm">
              <span className="font-semibold" style={{ color: sectionColor }}>{translatedName}:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {value.map((item: string, i: number) => (
                  <span key={i} className="bg-gray-700 px-2 py-1 rounded text-xs">{item}</span>
                ))}
              </div>
            </div>
          </>
        );
      }

      if (typeof value === 'string') {
        return (
          <>
            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
            <div key={key} className="text-sm">
              <span className="font-semibold" style={{ color: sectionColor }}>{translatedName}:</span>
              <p className="text-gray-300 text-xs mt-1">{value}</p>
            </div>
          </>
        );
      }

      if (typeof value === 'number') {
        return (
          <div key={key} className="text-sm">
            <span className="font-semibold" style={{ color: sectionColor }}>{translatedName}:</span>
            <span className="text-gray-300 ml-2">{value.toLocaleString()}</span>
          </div>
        );
      }
      return null;
    };
    return (

      <div className="space-y-2">

        <h4 className="font-bold text-lg mb-2 text-blue-400">{data.name}</h4>

        {audienceData.description && (
          <p className="text-sm text-gray-300">{audienceData.description}</p>
        )}

        {audienceData.level && (
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-300 mr-2">Niveau:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <div
                  key={star}
                  className={`w-3 h-3 rounded-full mr-1 ${star <= audienceData.level ? 'bg-yellow-400' : 'bg-gray-600'
                    }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 ml-1">({audienceData.level}/5)</span>
          </div>
        )}

        {Object.entries(audienceData)
          .filter(([key]) => !['description', 'level'].includes(key))
          .map(([key, value]) => renderSection(key, value))
          .filter(Boolean)}
      </div>
    );
  };

  // Effet principal de rendu
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = window.innerWidth;
    const height = window.innerHeight;
    svg.attr("width", width).attr("height", height);

    // Fond avec dégradé
    const defs = svg.append("defs");
    const backgroundGradient = defs.append("radialGradient")
      .attr("id", "themeBackground")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "70%");

    backgroundGradient.append("stop")
      .attr("offset", "0%")
      .attr("style", `stop-color:${theme?.colors?.background?.gradient[0]};stop-opacity:1`);

    backgroundGradient.append("stop")
      .attr("offset", "100%")
      .attr("style", `stop-color:${theme?.colors?.background?.gradient[1]};stop-opacity:1`);

    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#themeBackground)");

    const g = svg.append("g");

    // Zoom & pan
    svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.3, 3])
        .on("zoom", (event) => g.attr("transform", event.transform))
    );

    // Conversion des données
    const hierarchyData = convertToHierarchy(data);

    // Handlers
    const handleNodeClick = (node: any) => {
      setSelectedNode(node);
    };

    const handleNodeHover = (node: any, event: MouseEvent) => {
      if (node) {
        const [mouseX, mouseY] = d3.pointer(event, document.body);
        setTooltip({ show: true, x: mouseX + 15, y: mouseY - 15, data: node });
      } else {
        setTooltip({ show: false, x: 0, y: 0, data: null });
      }
    };

    const vizProps = {
      g,
      data: hierarchyData,
      width,
      height,
      onNodeClick: handleNodeClick,
      onNodeHover: handleNodeHover
    };

    // Rendu selon le mode
    switch (currentMode) {
      case 'organic':
        renderOrganic(vizProps, simulationRef);
        break;
      case 'radial':
        renderRadial(vizProps);
        break;
      case 'treemap':
        renderTreeMap(vizProps);
        break;
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
  }, [data, currentTheme, currentMode, currentAudience]);

  return (
    <div
      className="relative flex justify-center items-center min-h-screen overflow-hidden"
      style={{ backgroundColor: theme?.colors?.background?.primary }}
    >
      {/* Panneau de contrôle */}
      <ControlPanel
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        visualizationModes={visualizationModes}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        themes={themes}
        currentAudience={currentAudience}
        setCurrentAudience={setCurrentAudience}
        audienceConfig={audienceConfig}
        theme={theme}
      />

      {/* SVG principal */}
      <svg ref={svgRef} className="drop-shadow-2xl"></svg>

      {/* Détails du node sélectionné */}
      {/* {selectedNode && (
        <div
          className="absolute right-4 top-4 bottom-4 w-96 backdrop-blur p-6 rounded-2xl border overflow-y-auto z-30"
          style={{
            backgroundColor: theme?.colors?.ui?.glass ?? "#222",
            borderColor: theme?.colors?.ui?.border ?? "#444",
            color: theme?.colors?.text?.primary ?? "#fff",
          }}
        >
          {renderTooltipContent(selectedNode)}
          <button
            className="mt-4 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
            onClick={() => setSelectedNode(null)}
          >
            Fermer
          </button>
        </div>
      )} */}
      {/* Détails du node sélectionné petite fenetre déplaçable et avec une croix en haut à droite pour la fermé + adaptable sur telephone => responsive */}
      <DraggableNodePanel
        selectedNode={selectedNode}
        onClose={() => setSelectedNode(null)}
        renderTooltipContent={renderTooltipContent}
        theme={theme}
      />

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="absolute backdrop-blur-sm text-white p-4 rounded-2xl shadow-2xl z-30 max-w-sm border"
          style={{
            left: Math.min(tooltip.x, window.innerWidth - 250),
            top: Math.max(tooltip.y - 20, 20),
            backgroundColor: theme?.colors?.ui?.tooltip + "E6",
            borderColor: theme?.colors?.ui?.border,
          }}
        >
          {renderTooltipContent(tooltip.data)}
        </div>
      )}
    </div>
  );
}