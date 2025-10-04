import * as d3 from 'd3';
import { VisualizationProps } from '../types';

export function renderRadial(props: VisualizationProps): void {
    const { g, data, width, height, onNodeClick, onNodeHover } = props;

    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 100;

    const root = d3.hierarchy(data);
    const descendants = root.descendants();

    // Calcul de la position de chaque nœud
    descendants.forEach((node: any, index: number) => {
        // Angle basé sur l'index des frères et sœurs
        const siblings = node.parent ? node.parent.children : [node];
        const siblingIndex = siblings.indexOf(node);
        const totalSiblings = siblings.length;

        const angleOffset = node.parent ? (node.parent.data.angleStart || 0) : 0;
        const angleRange = node.parent ? (node.parent.data.angleRange || 2 * Math.PI) : 2 * Math.PI;

        const angle = angleOffset + (siblingIndex / Math.max(totalSiblings - 1, 1)) * angleRange;

        // Sauvegarde pour les enfants
        node.data.angleStart = angle - angleRange / (2 * totalSiblings);
        node.data.angleRange = angleRange / totalSiblings;

        // Rayon basé sur la profondeur
        const radius = (node.depth / (root.height || 1)) * maxRadius;

        node.x = cx + radius * Math.cos(angle - Math.PI / 2);
        node.y = cy + radius * Math.sin(angle - Math.PI / 2);
    });

    // Liens
    const linkGroup = g.append("g").attr("class", "links");
    root.links().forEach((link: any) => {
        linkGroup.append("line")
            .attr("x1", link.source.x)
            .attr("y1", link.source.y)
            .attr("x2", link.target.x)
            .attr("y2", link.target.y)
            .attr("stroke", link.source.data.color || "#475569")
            .attr("stroke-width", link.source.depth === 0 ? 3 : 1.5)
            .attr("opacity", 0.6)
            .attr("stroke-dasharray", link.source.depth > 1 ? "3,3" : "none");
    });

    // Nœuds
    const nodeGroup = g.append("g").attr("class", "nodes");

    descendants.forEach((node: any) => {
        const nodeRadius = node.depth === 0 ? 40 :
            node.depth === 1 ? 30 :
                15 + (node.data.data.level || 0) * 3;

        const nodeG = nodeGroup.append("g")
            .attr("transform", `translate(${node.x},${node.y})`);

        // Cercle du nœud
        nodeG.append("circle")
            .attr("r", nodeRadius)
            .attr("fill", node.data.color)
            .attr("stroke", "#fff")
            .attr("stroke-width", node.depth === 0 ? 4 : node.depth === 1 ? 3 : 2)
            .attr("opacity", 0.9)
            .style("cursor", "pointer")
            .on("mouseover", function (event: MouseEvent) {
                if (onNodeHover) onNodeHover(node.data, event);
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("r", nodeRadius * 1.2)
                    .attr("opacity", 1);
            })
            .on("mouseout", function (event: MouseEvent) {
                if (onNodeHover) onNodeHover(null, event);
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("r", nodeRadius)
                    .attr("opacity", 0.9);
            })
            .on("click", function (event: MouseEvent) {
                if (onNodeClick) onNodeClick(node.data);
            });

        // Label
        const labelDistance = nodeRadius + 15;
        const angle = Math.atan2(node.y - cy, node.x - cx);
        const labelX = Math.cos(angle) * labelDistance;
        const labelY = Math.sin(angle) * labelDistance;

        nodeG.append("text")
            .attr("x", node.depth === 0 ? 0 : labelX)
            .attr("y", node.depth === 0 ? 0 : labelY)
            .attr("text-anchor", node.depth === 0 ? "middle" : (node.x > cx ? "start" : "end"))
            .attr("dy", node.depth === 0 ? "0.35em" : "0.35em")
            .attr("fill", "#fff")
            .attr("font-size", node.depth === 0 ? "14px" : node.depth === 1 ? "12px" : "10px")
            .attr("font-weight", node.depth <= 1 ? "bold" : "normal")
            .style("text-shadow", "2px 2px 6px #000")
            .style("pointer-events", "none")
            .text(node.data.name);
    });
}