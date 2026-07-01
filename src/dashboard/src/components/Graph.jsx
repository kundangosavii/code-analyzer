import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

export default function Graph({ graphData, onNodeClick }) {
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
            label: "data(label)",
            backgroundColor : "#8b0000",
            color: "white"
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
          style: {
            "background-color": "green"
          },
        },

        {
          selector: 'node[type="utils"]',
          style: {
            "background-color": "yellow"
          },
        },

        {
          selector: "edge",
          style: {
            width: 1,
            'line-color': '#000000',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          },
        },
      ],

      layout: {
        name: "cose", // start simple
      },
    });

    // cy.zoomingEnabled( false );
    // cy.userZoomingEnabled( true );

    cy.on("tap", "node", (event) => {
      const filePath = event.target.id();
      onNodeClick(filePath);
    });

    return () => cy.destroy(); // cleanup
  }, [graphData]);

  return <div ref={cyRef} className="w-full border border-gray-800 bg-[#171731]" />;
}