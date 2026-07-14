import mermaid from "mermaid";

document.addEventListener("DOMContentLoaded", async () => {
  const nodes = [...document.querySelectorAll("[data-mermaid]")];
  if (!nodes.length) return;

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "neutral",
  });
  nodes.forEach((node) => node.classList.add("mermaid"));
  await mermaid.run({ nodes });
  nodes.forEach((node) => {
    node.dataset.ready = "true";
  });
});
