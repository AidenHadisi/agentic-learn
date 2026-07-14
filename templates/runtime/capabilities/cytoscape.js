import cytoscape from "cytoscape";

function readConfig(element) {
  const source = document.getElementById(element.dataset.source);
  if (!source) throw new Error(`Missing graph source: ${element.dataset.source}`);
  return JSON.parse(source.textContent);
}

document.addEventListener("DOMContentLoaded", () => {
  const styles = getComputedStyle(document.documentElement);
  const text = styles.getPropertyValue("--text").trim();
  const muted = styles.getPropertyValue("--text-muted").trim();
  const accent = styles.getPropertyValue("--accent").trim();
  const surface = styles.getPropertyValue("--bg-raised").trim();

  document.querySelectorAll("[data-cytoscape]").forEach((container) => {
    const config = readConfig(container);
    const graph = cytoscape({
      container,
      elements: config.elements,
      layout: config.layout || { name: "breadthfirst", directed: true, padding: 24 },
      style: [
        {
          selector: "node",
          style: {
            "background-color": surface,
            "border-color": accent,
            "border-width": 2,
            color: text,
            label: "data(label)",
            "font-size": 12,
            "text-wrap": "wrap",
            "text-max-width": 110,
            width: 72,
            height: 44,
            shape: "round-rectangle",
          },
        },
        {
          selector: "edge",
          style: {
            "curve-style": "bezier",
            "line-color": muted,
            "target-arrow-color": muted,
            "target-arrow-shape": "triangle",
            width: 2,
          },
        },
        {
          selector: ":selected",
          style: {
            "background-color": accent,
            "border-color": accent,
          },
        },
      ],
      minZoom: 0.5,
      maxZoom: 2,
    });
    graph.ready(() => {
      container.dataset.ready = "true";
    });
  });
});
