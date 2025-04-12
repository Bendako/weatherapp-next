'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string; // The Mermaid definition string
  id?: string; // Optional unique ID for the diagram container
}

// Initialize Mermaid only once
mermaid.initialize({
  startOnLoad: false, // We will render manually
  theme: 'default', // Or 'dark', 'forest', 'neutral'
  // You can add more configuration options here
  // See: https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults
});

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = id || `mermaid-diagram-${Math.random().toString(36).substring(2, 15)}`;

  useEffect(() => {
    console.log("MermaidDiagram useEffect triggered. Chart:", !!chart, "Ref:", !!containerRef.current);
    let isCancelled = false; // Flag to prevent updates after cleanup

    if (containerRef.current && chart) {
      const currentContainer = containerRef.current;
      console.log(`Attempting mermaid.render with id: ${uniqueId}`);
      // Clear previous render if any
      currentContainer.innerHTML = '';

      try {
        mermaid.render(uniqueId, chart).then(({ svg, bindFunctions }) => {
          if (!isCancelled) { // Check flag before updating DOM
            console.log("Mermaid rendering successful. SVG length:", svg.length);
            if (currentContainer) {
              currentContainer.innerHTML = svg;
              if (bindFunctions) {
                console.log("Binding functions...");
                bindFunctions(currentContainer);
              }
            }
          }
        }).catch(renderError => {
           if (!isCancelled) {
             console.error('Error during mermaid.render promise:', renderError);
             if (currentContainer) {
               currentContainer.innerHTML = 'Error rendering diagram (promise catch).';
             }
           }
        });
      } catch (error) {
        if (!isCancelled) {
            console.error('Error calling mermaid.render:', error);
            if (currentContainer) {
            currentContainer.innerHTML = 'Error rendering diagram (try/catch).';
            }
        }
      }
    }
    // Cleanup function
    return () => {
      isCancelled = true; // Set flag
      console.log(`Cleanup for MermaidDiagram id: ${uniqueId}`);
      // Optionally, clear the container on cleanup, though the flag should suffice
      // if (containerRef.current) {
      //   containerRef.current.innerHTML = '';
      // }
    };
  }, [chart, uniqueId]);

  // Use a key based on the chart content to force re-render 
  // if the chart string itself changes significantly, 
  // helping with potential Mermaid state issues.
  return <div ref={containerRef} key={chart} className="mermaid-container"></div>;
};

export default MermaidDiagram; 