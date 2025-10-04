export interface SkillNode {
  name: string;
  audiences?: {
    [key in AudienceType]?: {
      level?: number;
      description?: string;
      projects?: string[] | Record<string, any>;
      years_experience?: number;
      business_impact?: string;
      team_impact?: string;
      business_value?: string;
      cost_savings?: string;
      reliability?: string;
      performance?: string;
      scalability?: string;
      security?: string;
      automation?: string;
      adaptability?: string;
      enterprise?: string;
      web_development?: string;
      maintenance?: string;
      integration?: string;
      expertise?: string;
      technologies?: string[];
      certifications?: string[];
      architecture?: string;
      skills?: string;
      lines_of_code?: number;
      links?: Record<string, string>;
      [key: string]: any;
    };
  };
  color?: string;
  icon?: string;
  children?: SkillNode[];
}

export interface NodeData {
  id: string;
  name: string;
  data: any;
  color: string;
  category: string;
  type: 'center' | 'category' | 'subcategory' | 'skill';
  radius: number;
  depth: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  children?: NodeData[];
  parent?: NodeData;
  value?: number;
}

export type AudienceType = 'visitor' | 'hr' | 'technical';
export type VisualizationMode = 'organic' | 'radial' | 'treemap' | 'sunburst' | 'network';

export interface VisualizationConfig {
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface AudienceConfig {
  name: string;
  icon: string;
  color: string;
}

export interface HierarchyNode {
  name: string;
  data: any;
  color: string;
  depth: number;
  value: number;
  parent?: HierarchyNode;
  children?: HierarchyNode[];
}

export interface VisualizationProps {
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
  data: HierarchyNode;
  width: number;
  height: number;
  onNodeClick?: (node: any) => void;
  onNodeHover?: (node: any, event: MouseEvent) => void;
}