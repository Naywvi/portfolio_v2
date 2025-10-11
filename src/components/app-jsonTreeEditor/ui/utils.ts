import { HierarchyNode, NodeContent } from './types';

export const convertToHierarchy = (obj: any, name: string = 'root'): HierarchyNode => {
  const node: HierarchyNode = {
    name: name,
    value: obj,
    type: 'object',
    children: [],
    id: Math.random().toString(36)
  };

  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      node.type = 'array';
      node.children = obj.map((item, i) => convertToHierarchy(item, `[${i}]`));
    } else {
      node.type = 'object';
      node.children = Object.entries(obj).map(([key, value]) =>
        convertToHierarchy(value, key)
      );
    }
  } else {
    node.type = typeof obj as HierarchyNode['type'];
  }

  return node;
};

export const formatNodeContent = (node: HierarchyNode): NodeContent[] => {
  const lines: NodeContent[] = [];

  if (node.children && node.children.length > 0) {
    lines.push({ text: node.name, color: '#60a5fa' });
  } else {
    lines.push({ text: `${node.name}:`, color: '#60a5fa' });

    const value = node.value;
    let displayValue = '';
    let color = '#e2e8f0';

    if (value === null) {
      displayValue = 'null';
      color = '#94a3b8';
    } else if (typeof value === 'string') {
      const maxLen = 22;
      displayValue = `"${value.length > maxLen ? value.substring(0, maxLen) + '...' : value}"`;
      color = '#4ade80';
    } else if (typeof value === 'number') {
      displayValue = String(value);
      color = '#60a5fa';
    } else if (typeof value === 'boolean') {
      displayValue = String(value);
      color = '#c084fc';
    }

    lines.push({ text: displayValue, color });
  }

  return lines;
};

export const getNodeWidth = (node: HierarchyNode): number => {
  if (node.children && node.children.length > 0) return 160;
  const content = formatNodeContent(node);
  const maxLength = Math.max(...content.map(l => l.text.length));
  return Math.max(130, Math.min(maxLength * 7 + 40, 300));
};

export const getNodeHeight = (node: HierarchyNode): number => {
  const lines = formatNodeContent(node);
  return lines.length * 20 + 24;
};
