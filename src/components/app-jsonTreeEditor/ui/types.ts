import * as d3 from 'd3';

export interface HierarchyNode {
  name: string;
  value: any;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null' | 'undefined';
  children: HierarchyNode[];
  id?: string;
}

export interface NodeContent {
  text: string;
  color: string;
}

export interface ContextMenu {
  x: number;
  y: number;
  node: d3.HierarchyPointNode<HierarchyNode>;
}

export interface EditModal {
  node: d3.HierarchyPointNode<HierarchyNode>;
  key: string;
  value: string;
}

export interface AddChildModal {
  node: d3.HierarchyPointNode<HierarchyNode>;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null';
}

export interface ConfirmModal {
  title: string;
  message: string;
  currentValue?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
