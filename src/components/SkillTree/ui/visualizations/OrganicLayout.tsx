import * as d3 from 'd3';
import { VisualizationProps, NodeData } from '../types';

export function renderOrganic(
    props: VisualizationProps,
    simulationRef: React.MutableRefObject<d3.Simulation<NodeData, any> | null>
): d3.Simulation<NodeData, any> {
    const { g, data, width, height, onNodeClick, onNodeHover } = props;

    const nodes: NodeData[] = [];
    const links: any[] = [];

    // Collecte récursive des nœuds
    const collectNodes = (node: any, parentId: string | null, categoryName: string, depth: number) => {
        const nodeId = `node-${nodes.length}`;

        let nodeType: 'center' | 'category' | 'subcategory' | 'skill';
        let radius: number;

        if (depth === 0) {
            nodeType = 'center';
            radius = 50;
        } else if (depth === 1) {
            nodeType = 'category';
            radius = 35;
        } else if (node.children && node.children.length > 0) {
            nodeType = 'subcategory';
            radius = 25;
        } else {
            nodeType = 'skill';
            radius = 8 + (node.data.level || 0) * 3;
        }

        nodes.push({
            id: nodeId,
            name: node.name,
            data: node.data,
            color: node.color,
            category: categoryName || node.name,
            type: nodeType,
            radius,
            depth
        });

        if (parentId) {
            const linkStrength = depth === 1 ? 0.8 : depth === 2 ? 0.6 : 0.4;
            links.push({ source: parentId, target: nodeId, strength: linkStrength });
        }

        if (node.children) {
            node.children.forEach((child: any) => {
                collectNodes(child, nodeId, categoryName || node.name, depth + 1);
            });
        }

        return nodeId;
    };

    collectNodes(data, null, '', 0);

    // Simulation de forces
    const simulation = d3.forceSimulation<NodeData>(nodes)
        .force("link", d3.forceLink(links)
            .id((d: any) => d.id)
            .distance((d: any) => {
                if (d.source.depth === 0) return 140;
                if (d.source.depth === 1) return 80;
                if (d.source.depth === 2) return 50;
                return 50 + Math.random() * 20;
            })
            .strength(d => d.strength)
        )
        .force("charge", d3.forceManyBody<NodeData>().strength(d => {
            switch (d.type) {
                case 'center': return -1500;
                case 'category': return -1000;
                case 'subcategory': return -600;
                case 'skill': return -300 - d.radius * 10;
                default: return -400;
            }
        }))
        .force("collision", d3.forceCollide<NodeData>().radius(d => d.radius + 20).strength(0.8))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(0.05));

    simulationRef.current = simulation;

    // Filtre de glow
    const defs = g.append("defs");
    const glowFilter = defs.append("filter")
        .attr("id", "glow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");
    glowFilter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur");
    const feMerge = glowFilter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Liens
    const linkGroup = g.append("g").attr("class", "links");
    const link = linkGroup.selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", (d: any) => {
            if (d.source.depth === 0) return '#64748b';
            return d.source.color;
        })
        .attr("stroke-opacity", (d: any) => {
            if (d.source.depth <= 2) return 0.8;
            return 0.4;
        })
        .attr("stroke-width", (d: any) => {
            if (d.source.depth === 0) return 4;
            if (d.source.depth === 1) return 3;
            if (d.source.depth === 2) return 2;
            return 1;
        });

    // Nœuds
    const nodeGroup = g.append("g").attr("class", "nodes");
    const node = nodeGroup.selectAll("g").data(nodes).join("g").attr("class", "node");

    node.append("circle")
        .attr("r", d => d.radius)
        .attr("fill", d => d.color)
        .attr("stroke", "#fff")
        .attr("stroke-width", d => d.type === 'center' ? 4 : d.type === 'category' ? 3 : 2)
        .attr("opacity", d => d.type === 'skill' && d.data.level ? 0.3 + (d.data.level / 5) * 0.7 : 0.9)
        .style("filter", "url(#glow)")
        .style("cursor", "pointer")
        .on("mouseover", function (event: MouseEvent, d: NodeData) {
            if (onNodeHover) onNodeHover(d, event);
            d3.select(this).transition().duration(300).ease(d3.easeElastic).attr("r", d.radius * 1.3);
        })
        .on("mouseout", function (event: MouseEvent, d: NodeData) {
            if (onNodeHover) onNodeHover(null, event);
            d3.select(this).transition().duration(300).ease(d3.easeElastic).attr("r", d.radius);
        })
        .on("click", function (event: MouseEvent, d: NodeData) {
            if (onNodeClick) onNodeClick(d);
        });

    node.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", d =>
            d.type === 'center' || d.type === 'category' || d.type === 'subcategory'
                ? "0.35em"
                : `${d.radius + 18}px`
        )
        .attr("fill", "#fff")
        .attr("font-size", d =>
            d.type === 'center' ? "16px" :
                d.type === 'category' || d.type === 'subcategory' ? "13px" :
                    "11px"
        )
        .attr("font-weight", d =>
            d.type === 'center' || d.type === 'category' || d.type === 'subcategory'
                ? "bold"
                : "500"
        )
        .style("text-shadow", "2px 2px 6px #000")
        .style("pointer-events", "none")
        .text(d =>
            d.name.length > 12 && d.type === 'skill'
                ? d.name.substring(0, 10) + '...'
                : d.name
        );

    // Drag behavior
    const drag = d3.drag<SVGGElement, NodeData>()
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
            if (d.type !== 'center') {
                d.fx = null;
                d.fy = null;
            }
        });

    (node as any).call(drag);

    // Animation tick
    simulation.on("tick", () => {
        link
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y);

        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return simulation;
}