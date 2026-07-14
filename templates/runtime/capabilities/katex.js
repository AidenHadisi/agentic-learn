import katex from "katex";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-katex]").forEach((element) => {
    katex.render(element.textContent, element, {
      displayMode: element.dataset.katex === "display",
      throwOnError: false,
      strict: "warn",
    });
    element.dataset.ready = "true";
  });
});
