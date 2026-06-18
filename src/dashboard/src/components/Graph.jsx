import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

export default function Graph({ graphData }) {
  const cyRef = useRef(null);

  useEffect(() => {
    if (!graphData) return;

    const cy = cytoscape({
      container: cyRef.current,
      elements: [...graphData.nodes, ...graphData.edges],

      style: [
        {
          selector: "node",
          style: {
            label: "data(label)"
          }
        },

        {
          selector: 'node[type="controllers"]',
          style: {
            "background-color": "blue"
          }
        },

        {
          selector: 'node[type="services"]',
          style:{
            "background-color": "green"
          },
        },

        {
          selector: 'node[type="utils"]',
          style:{
            "background-color": "yellow"
          },
        },

        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#ccc",
            "target-arrow-shape": "triangle",
            "target-arrow-color": "#ccc",
          },
        },
      ],

      layout: {
        name: "cose", // start simple
      },
    });

    return () => cy.destroy(); // cleanup
  }, [graphData]);

  return <div ref={cyRef} className="w-full h-[500px] border" />;
}