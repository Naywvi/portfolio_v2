// visualizations/TreeMapLayout.tsx
import * as d3 from 'd3';
import { VisualizationProps } from '../types';

export function renderTreeMap(props: VisualizationProps): void {
    const { g, data, width, height, onNodeClick, onNodeHover } = props;

    // Calcul de valeurs plus équilibrées
    const root = d3.hierarchy(data)
        .sum((d: any) => {
            // Si c'est une feuille avec un niveau, utiliser le niveau
            if (!d.children && d.data?.level) {
                return d.data.level * 20; // Multiplier pour avoir des tailles visibles
            }
            // Sinon, valeur par défaut
            return d.children ? 0 : 100;
        })
        .sort((a, b) => (b.value || 0) - (a.value || 0));

    const treemapLayout = d3.treemap<any>()
        .size([width - 40, height - 40])
        .paddingInner(3)
        .paddingOuter(6)
        .paddingTop(20) // Espace pour les labels des parents
        .round(true);

    treemapLayout(root);

    // Groupe principal
    const mainGroup = g.append("g")
        .attr("transform", "translate(20, 20)");

    // Tous les nœuds
    const nodes = root.descendants();

    // Rectangles
    const rects = mainGroup.selectAll("g")
        .data(nodes)
        .join("g")
        .attr("class", (d: any) => `depth-${d.depth}`)
        .attr("transform", (d: any) => `translate(${d.x0},${d.y0})`);

    rects.append("rect")
        .attr("width", (d: any) => Math.max(0, d.x1 - d.x0))
        .attr("height", (d: any) => Math.max(0, d.y1 - d.y0))
        .attr("fill", (d: any) => {
            // Opacité selon la profondeur pour différencier visuellement
            const baseColor = d3.color(d.data.color);
            if (baseColor) {
                if (d.depth === 0) {
                    baseColor.opacity = 0.3;
                } else if (d.depth === 1) {
                    baseColor.opacity = 0.5;
                } else if (d.children) {
                    // Parent avec enfants = plus transparent
                    baseColor.opacity = 0.4;
                } else {
                    // Feuilles = plus opaque
                    baseColor.opacity = 0.85;
                }
            }
            return baseColor ? baseColor.toString() : d.data.color;
        })
        .attr("stroke", "#fff")
        .attr("stroke-width", (d: any) => {
            if (d.depth === 0) return 6;
            if (d.depth === 1) return 4;
            if (d.children) return 3;
            return 2;
        })
        .attr("rx", 8)
        .style("cursor", "pointer")
        .on("mouseover", function (event: MouseEvent, d: any) {
            if (onNodeHover) onNodeHover(d.data, event);
            d3.select(this)
                .transition()
                .duration(200)
                .attr("stroke-width", 5)
                .style("filter", "brightness(1.2)");
        })
        .on("mouseout", function (event: MouseEvent, d: any) {
            if (onNodeHover) onNodeHover(null, event);
            d3.select(this)
                .transition()
                .duration(200)
                .attr("stroke-width", d.depth === 0 ? 6 : d.depth === 1 ? 4 : d.children ? 3 : 2)
                .style("filter", "brightness(1)");
        })
        .on("click", function (event: MouseEvent, d: any) {
            if (onNodeClick) onNodeClick(d.data);
        });

    // Labels - Positionnement intelligent selon la taille
    rects.each(function (d: any) {
        const rectWidth = d.x1 - d.x0;
        const rectHeight = d.y1 - d.y0;
        const area = rectWidth * rectHeight;

        // Ne pas afficher de label si trop petit
        if (area < 1000) return;

        const textGroup = d3.select(this);

        // Taille de police adaptative
        let fontSize = 11;
        if (d.depth === 0) fontSize = 18;
        else if (d.depth === 1) fontSize = 14;
        else if (area > 10000) fontSize = 13;
        else if (area > 5000) fontSize = 12;
        else if (area > 2000) fontSize = 11;
        else fontSize = 10;

        // Nom du nœud
        const nameText = textGroup.append("text")
            .attr("x", rectWidth / 2)
            .attr("y", d.children ? 12 : rectHeight / 2)
            .attr("text-anchor", "middle")
            .attr("dy", d.children ? 0 : "0.35em")
            .attr("fill", "#fff")
            .attr("font-size", `${fontSize}px`)
            .attr("font-weight", d.depth <= 1 ? "bold" : d.children ? "600" : "500")
            .style("text-shadow", "2px 2px 6px #000")
            .style("pointer-events", "none");

        // Tronquer le texte selon la largeur
        const name = d.data.name;
        const maxChars = Math.floor(rectWidth / (fontSize * 0.6));

        if (name.length > maxChars && maxChars > 3) {
            nameText.text(name.substring(0, maxChars - 3) + '...');
        } else if (maxChars > 3) {
            nameText.text(name);
        }

        // Niveau pour les feuilles (si assez de place)
        if (!d.children && d.data.data?.level && area > 2000) {
            textGroup.append("text")
                .attr("x", rectWidth / 2)
                .attr("y", rectHeight / 2 + fontSize + 5)
                .attr("text-anchor", "middle")
                .attr("fill", "#fbbf24")
                .attr("font-size", `${Math.max(9, fontSize - 2)}px`)
                .attr("font-weight", "bold")
                .style("text-shadow", "1px 1px 3px #000")
                .style("pointer-events", "none")
                .text(`★ ${d.data.data.level}/5`);
        }
    });
}