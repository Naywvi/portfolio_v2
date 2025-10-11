'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Download, Link2 } from 'lucide-react';

import { JsonEditor } from './JsonEditor';
import { ContextMenuComponent } from './ContextMenu';
import { EditModalComponent } from './EditModal';
import { AddChildModalComponent } from './AddChildModal';
import { ConfirmModalComponent } from './ConfirmModal';

import { HierarchyNode, ContextMenu, EditModal, AddChildModal, ConfirmModal } from './types';
import { convertToHierarchy, getNodeHeight, getNodeWidth, formatNodeContent } from './utils';

import './JsonTree.css';

export function JsonTreeEditor() {
  const [jsonText, setJsonText] = useState<string>('{}');
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<string>('');

  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const [editModal, setEditModal] = useState<EditModal | null>(null);
  const [addChildModal, setAddChildModal] = useState<AddChildModal | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmModal | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- JSON Handling
  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonText);
      setData(parsed);
      setError('');
    } catch (err) {
      setError('Invalid JSON');
    }
  }, [jsonText]);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement> | { target: { value: string } }): void => {
    const newText = e.target.value;
    setJsonText(newText);

    if (!newText.trim()) {
      setError('');
      setData({});
      return;
    }

    try {
      const parsed = JSON.parse(newText);
      setData(parsed);
      setError('');
    } catch (err) {
      setError('Erreur JSON');
    }
  };

  // --- DRAW GRAPH ---
  useEffect(() => {
    if (!data || !svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        g.attr('transform', event.transform.toString());
      });

    svg.call(zoom);

    const root = d3.hierarchy<HierarchyNode>(convertToHierarchy(data, 'root'));
    const nodeCount = root.descendants().length;
    const verticalSpacing = Math.max(100, Math.min(200, 20000 / nodeCount));

    const treeLayout = d3.tree<HierarchyNode>()
      .size([verticalSpacing * nodeCount, width - 500])
      .nodeSize([verticalSpacing, 250])
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.8));

    const treeRoot = treeLayout(root) as d3.HierarchyPointNode<HierarchyNode>;

    // --- LINKS ---
    const links = treeRoot.links();

    const pathFn = (d: any) => {
      const sourceX = (d.source.y ?? 0) + 200;
      const sourceY = (d.source.x ?? 0) + height / 2;
      const targetX = (d.target.y ?? 0) + 200;
      const targetY = (d.target.x ?? 0) + height / 2;
      return `M ${sourceX},${sourceY} C ${(sourceX + targetX) / 2},${sourceY} ${(sourceX + targetX) / 2},${targetY} ${targetX},${targetY}`;
    };

    const linkElements = g.selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', pathFn); // ✅ draw dès le départ

    // --- NODES ---
    const nodes = g.selectAll<SVGGElement, d3.HierarchyPointNode<HierarchyNode>>('.node')
      .data(treeRoot.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${(d.y ?? 0) + 200},${(d.x ?? 0) + height / 2})`)
      .style('cursor', 'move');

    nodes.append('rect')
      .attr('class', 'node-bg')
      .attr('x', -10)
      .attr('y', (d) => -getNodeHeight(d.data) / 2)
      .attr('width', (d) => getNodeWidth(d.data))
      .attr('height', (d) => getNodeHeight(d.data))
      .on('contextmenu', (event, d) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenu({ x: event.clientX, y: event.clientY, node: d });
      });

    // --- DRAG ---
    const drag = d3.drag<SVGGElement, d3.HierarchyPointNode<HierarchyNode>>()
      .on('start', function (event, d) {
        d3.select(this).raise();
        const transform = d3.zoomTransform(svg.node()!);
        (d as any).dragStartX = (event.x - transform.x) / transform.k;
        (d as any).dragStartY = (event.y - transform.y) / transform.k;
        (d as any).nodeStartX = (d.y ?? 0) + 200;
        (d as any).nodeStartY = (d.x ?? 0) + height / 2;
      })
      .on('drag', function (event, d) {
        const transform = d3.zoomTransform(svg.node()!);
        const mouseX = (event.x - transform.x) / transform.k;
        const mouseY = (event.y - transform.y) / transform.k;

        const deltaX = mouseX - (d as any).dragStartX;
        const deltaY = mouseY - (d as any).dragStartY;

        const newX = (d as any).nodeStartX + deltaX;
        const newY = (d as any).nodeStartY + deltaY;

        d.y = newX - 200;
        d.x = newY - height / 2;

        d3.select(this).attr('transform', `translate(${newX},${newY})`);

        linkElements.attr('d', pathFn); // ✅ update en drag
      });

    nodes.call(drag);

    // --- CONTENT ---
    nodes.each(function (d) {
      const node = d3.select(this);
      const content = formatNodeContent(d.data);
      const nodeHeight = getNodeHeight(d.data);
      let yOffset = -nodeHeight / 2 + 22;

      content.forEach((line, idx) => {
        node.append('text')
          .attr('x', 10)
          .attr('y', yOffset)
          .attr('class', idx === 0 ? 'key' : 'value')
          .text(line.text);
        yOffset += 20;
      });
    });

    // --- CHILD COUNT ---
    nodes.filter((d) => d.data.children && d.data.children.length > 0)
      .append('circle')
      .attr('cx', (d) => getNodeWidth(d.data) - 15)
      .attr('cy', (d) => -getNodeHeight(d.data) / 2 + 15)
      .attr('r', 10);

    nodes.filter((d) => d.data.children && d.data.children.length > 0)
      .append('text')
      .attr('x', (d) => getNodeWidth(d.data) - 15)
      .attr('y', (d) => -getNodeHeight(d.data) / 2 + 19)
      .attr('class', 'count')
      .attr('text-anchor', 'middle')
      .text((d) => d.data.children.length);

  }, [data]);

  return (
    <div className="h-screen bg-[#0f111a] text-white overflow-hidden flex flex-col">
      {/* --- HEADER --- */}
      <div className="bg-[#1c1f2e] border-b border-[#3b3f5c] px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
            <span className="text-xs font-bold">{'{ }'}</span>
          </div>
          <h1 className="text-base font-semibold">Json Tree Editor</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const blob = new Blob([jsonText], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'data.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm transition flex items-center gap-2"
          >
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* --- BODY --- */}
      <div className="flex flex-1 overflow-hidden">
        <JsonEditor
          value={jsonText}
          onChange={(value: string) =>
            handleJsonChange({ target: { value } } as React.ChangeEvent<HTMLTextAreaElement>)
          }
          error={error}
        />
        <div ref={containerRef} className="graph-container flex-1 relative overflow-hidden">
          <svg ref={svgRef} className="w-full h-full" />
        </div>
      </div>

      {/* --- MODALS --- */}
      {contextMenu && (
        <ContextMenuComponent
          contextMenu={contextMenu}
          onEdit={(node) => {
            setEditModal({ node, key: node.data.name, value: JSON.stringify(node.data.value, null, 2) });
            setContextMenu(null);
          }}
          onAddChild={(node) => {
            setAddChildModal({ node, key: 'newKey', value: '', type: 'string' });
            setContextMenu(null);
          }}
          onDelete={(node) => {
            setConfirmModal({
              title: 'Supprimer ce noeud ?',
              message: `Voulez-vous vraiment supprimer "${node.data.name}" ?`,
              onConfirm: () => {
                // TODO suppression logique
                setConfirmModal(null);
              },
              onCancel: () => setConfirmModal(null)
            });
            setContextMenu(null);
          }}
        />
      )}

      {addChildModal && (
        <AddChildModalComponent
          modal={addChildModal}
          onSave={() => setAddChildModal(null)}
          onClose={() => setAddChildModal(null)}
        />
      )}

      {editModal && (
        <EditModalComponent
          modal={editModal}
          onSave={() => setEditModal(null)}
          onClose={() => setEditModal(null)}
        />
      )}

      {confirmModal && <ConfirmModalComponent modal={confirmModal} />}
    </div>
  );
}
