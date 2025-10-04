import * as d3 from 'd3';
import { VisualizationProps } from '../types';

export function renderNetwork(
    props: VisualizationProps,
    simulationRef: React.MutableRefObject<d3.Simulation<any, any> | null>
): d3.Simulation<any, any> {
    const { g, data, width, height, onNodeClick, onNodeHover } = props;

    const nodes: any[] = [];
    const links: any[] = [];

    // Collecte des nœuds avec ID unique
    const collectNodes = (node: any, parent: any = null, depth: number = 0) => {
        const newNode = {
            id: nodes.length,
            name: node.name,
            data: node.data,
            color: node.color,
            depth,
            value: node.value || 1,
            radius: depth === 0 ? 35 : depth === 1 ? 25 : 10 + (node.data.level || 0) * 2
        };

        nodes.push(newNode);

        if (parent) {
            links.push({
                source: parent.id,
                target: newNode.id,
                value: 1
            });
        }

        if (node.children) {
            node.children.forEach((child: any) => collectNodes(child, newNode, depth + 1));
        }
    };

    collectNodes(data);

    // Simulation de forces optimisée pour network
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links)
            .id((d: any) => d.id)
            .distance((d: any) => {
                const source = d.source as any;
                if (source.depth === 0) return 120;
                if (source.depth === 1) return 80;
                return 60;
            })
            .strength(1)
        )
        .force("charge", d3.forceManyBody()
            .strength((d: any) => {
                if (d.depth === 0) return -800;
                if (d.depth === 1) return -400;
                return -200;
            })
        )
        .force("collision", d3.forceCollide()
            .radius((d: any) => d.radius + 10)
            .strength(0.9)
        )
        .force("center", d3.forceCenter(width / 2, height / 2).strength(0.1))
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05));

    simulationRef.current = simulation;

    // Liens
    const linkGroup = g.append("g").attr("class", "links");
    const link = linkGroup.selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", (d: any) => {
            // Après simulation, d.source est un objet, avant c'est un ID
            const source = typeof d.source === 'object' ? d.source : nodes.find(n => n.id === d.source);
            return source?.color || '#475569';
        })
        .attr("stroke-width", (d: any) => {
            const source = typeof d.source === 'object' ? d.source : nodes.find(n => n.id === d.source);
            if (!source) return 1.5;
            if (source.depth === 0) return 4;
            if (source.depth === 1) return 2.5;
            return 1.5;
        })
        .attr("stroke-opacity", 0.6);

    // Nœuds
    const nodeGroup = g.append("g").attr("class", "nodes");
    const node = nodeGroup.selectAll("g")
        .data(nodes)
        .join("g")
        .attr("class", "node");

    // Cercle externe (halo)
    node.append("circle")
        .attr("r", (d: any) => d.radius + 4)
        .attr("fill", (d: any) => d.color)
        .attr("opacity", 0.3);

    // Cercle principal
    node.append("circle")
        .attr("r", (d: any) => d.radius)
        .attr("fill", (d: any) => d.color)
        .attr("stroke", "#fff")
        .attr("stroke-width", (d: any) => d.depth === 0 ? 3 : 2)
        .attr("opacity", 0.95)
        .style("cursor", "pointer")
        .on("mouseover", function (event: MouseEvent, d: any) {
            if (onNodeHover) onNodeHover(d, event);

            // Highlight du nœud
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", d.radius * 1.3)
                .attr("stroke-width", 4);

            // Highlight des liens connectés
            link.attr("stroke-opacity", (l: any) =>
                l.source.id === d.id || l.target.id === d.id ? 1 : 0.15
            );

            // Highlight des nœuds connectés
            node.selectAll("circle")
                .attr("opacity", (n: any) => {
                    const isConnected = links.some((l: any) =>
                        (l.source.id === d.id && l.target.id === n.id) ||
                        (l.target.id === d.id && l.source.id === n.id) ||
                        n.id === d.id
                    );
                    return isConnected ? 0.95 : 0.3;
                });
        })
        .on("mouseout", function (event: MouseEvent, d: any) {
            if (onNodeHover) onNodeHover(null, event);

            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", d.radius)
                .attr("stroke-width", d.depth === 0 ? 3 : 2);

            link.attr("stroke-opacity", 0.6);
            node.selectAll("circle").attr("opacity", 0.95);
        })
        .on("click", function (event: MouseEvent, d: any) {
            if (onNodeClick) onNodeClick(d);
        });

    // Labels
    node.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", (d: any) => d.radius + 15)
        .attr("fill", "#fff")
        .attr("font-size", (d: any) => d.depth === 0 ? "13px" : d.depth === 1 ? "11px" : "9px")
        .attr("font-weight", (d: any) => d.depth <= 1 ? "bold" : "normal")
        .style("text-shadow", "2px 2px 6px #000")
        .style("pointer-events", "none")
        .text((d: any) => {
            if (d.name.length > 15 && d.depth > 1) {
                return d.name.substring(0, 12) + '...';
            }
            return d.name;
        });

    // Niveau (petite étoile pour les skills)
    node.filter((d: any) => d.data.level && d.depth > 1)
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("fill", "#fbbf24")
        .attr("font-size", "10px")
        .attr("font-weight", "bold")
        .style("pointer-events", "none")
        .text((d: any) => d.data.level);

    // Drag behavior
    const drag = d3.drag<SVGGElement, any>()
        .on("start", function (event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        })
        .on("drag", function (event, d) {
            d.fx = event.x;
            d.fy = event.y;
        })
        .on("end", function (event, d) {
            if (!event.active) simulation.alphaTarget(0);
            if (d.depth !== 0) {
                d.fx = null;
                d.fy = null;
            }
        });

    (node as any).call(drag);

    // Animation
    simulation.on("tick", () => {
        link
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y);

        node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return simulation;
}