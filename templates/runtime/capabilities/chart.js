import Chart from "chart.js/auto";

function readConfig(element) {
  const source = document.getElementById(element.dataset.source);
  if (!source) throw new Error(`Missing chart source: ${element.dataset.source}`);
  return JSON.parse(source.textContent);
}

document.addEventListener("DOMContentLoaded", () => {
  const styles = getComputedStyle(document.documentElement);
  const text = styles.getPropertyValue("--text").trim();
  const border = styles.getPropertyValue("--border").trim();
  const accent = styles.getPropertyValue("--accent").trim();
  Chart.defaults.color = text;
  Chart.defaults.borderColor = border;

  document.querySelectorAll("canvas[data-chart]").forEach((canvas) => {
    const config = readConfig(canvas);
    config.data.datasets = config.data.datasets.map((dataset) => ({
      borderColor: accent,
      backgroundColor: accent,
      ...dataset,
    }));
    config.options = {
      responsive: true,
      maintainAspectRatio: false,
      ...config.options,
      animation: false,
      plugins: {
        ...config.options?.plugins,
        legend: {
          ...config.options?.plugins?.legend,
          labels: { color: text, ...config.options?.plugins?.legend?.labels },
        },
      },
    };
    new Chart(canvas, config);
    canvas.dataset.ready = "true";
  });
});
