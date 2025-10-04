import * as d3 from 'd3';
import { VisualizationProps } from '../types';

export function renderSunburst(props: VisualizationProps): void {
    const { g, data, width, height, onNodeClick, onNodeHover } = props;

    const radius = Math.min(width, height) / 2 - 50;

    const root = d3.hierarchy(data)
        .sum((d: any) => d.value || 1)
        .sort((a, b) => (b.value || 0) - (a.value || 0));

    const partition = d3.partition<any>()
        .size([2 * Math.PI, radius]);

    partition(root);

    // Centrer le sunburst
    g.attr("transform", `translate(${width / 2},${height / 2})`);

    // Arc generator
    const arc = d3.arc<any>()
        .startAngle((d: any) => d.x0)
        .endAngle((d: any) => d.x1)
        .innerRadius((d: any) => d.y0)
        .outerRadius((d: any) => d.y1)
        .padAngle(0.005)
        .padRadius(radius / 2)
        .cornerRadius(3);

    // Segments
    const segments = g.selectAll("path")
        .data(root.descendants())
        .join("path")
        .attr("d", arc)
        .attr("fill", (d: any) => {
            // Dégradé selon la profondeur
            const baseColor = d3.color(d.data.color);
            if (baseColor) {
                const hsl = d3.hsl(baseColor);
                hsl.l = Math.max(0.3, Math.min(0.85, 0.5 + (d.depth / root.height) * 0.3));
                return hsl.toString();
            }
            return d.data.color;
        })
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .attr("opacity", 0.9)
        .style("cursor", "pointer")
        .on("mouseover", function (event: MouseEvent, d: any) {
            if (onNodeHover) onNodeHover(d.data, event);
            d3.select(this)
                .transition()
                .duration(200)
                .attr("opacity", 1)
                .style("filter", "brightness(1.2)");
        })
        .on("mouseout", function (event: MouseEvent, d: any) {
            if (onNodeHover) onNodeHover(null, event);
            d3.select(this)
                .transition()
                .duration(200)
                .attr("opacity", 0.9)
                .style("filter", "brightness(1)");
        })
        .on("click", function (event: MouseEvent, d: any) {
            if (onNodeClick) onNodeClick(d.data);
        });

    // Labels sur les arcs
    const labels = g.selectAll("text")
        .data(root.descendants().filter((d: any) => {
            // Afficher uniquement si suffisamment grand
            const angle = d.x1 - d.x0;
            const arcWidth = d.y1 - d.y0;
            return angle > 0.1 && arcWidth > 20;
        }))
        .join("text")
        .attr("transform", (d: any) => {
            const angle = (d.x0 + d.x1) / 2;
            const radius = (d.y0 + d.y1) / 2;
            const rotation = (angle * 180 / Math.PI - 90);
            const flipText = rotation > 90;

            return `rotate(${rotation}) translate(${radius},0) rotate(${flipText ? 180 : 0})`;
        })
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("fill", "#fff")
        .attr("font-size", (d: any) => {
            if (d.depth === 0) return "14px";
            if (d.depth === 1) return "12px";
            return "10px";
        })
        .attr("font-weight", (d: any) => d.depth <= 1 ? "bold" : "normal")
        .style("text-shadow", "2px 2px 6px #000")
        .style("pointer-events", "none")
        .text((d: any) => {
            const name = d.data.name;
            const angle = d.x1 - d.x0;

            // Tronquer selon l'angle disponible
            if (angle < 0.3 && name.length > 8) {
                return name.substring(0, 6) + '...';
            }
            if (angle < 0.5 && name.length > 12) {
                return name.substring(0, 10) + '...';
            }
            return name;
        });

    // Centre - nom principal
    g.append("circle")
        .attr("r", root.y0 || 40)
        .attr("fill", root.data.color)
        .attr("stroke", "#fff")
        .attr("stroke-width", 4);

    g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("fill", "#fff")
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .style("text-shadow", "2px 2px 6px #000")
        .text(root.data.name);
}