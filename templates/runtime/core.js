function readConfig(element) {
  const source = document.getElementById(element.dataset.source);
  if (!source) {
    throw new Error(`Missing JSON source: ${element.dataset.source || "(unset)"}`);
  }
  return JSON.parse(source.textContent);
}

function createButton(label, onClick, className = "btn") {
  const element = document.createElement("button");
  element.type = "button";
  element.className = className;
  element.textContent = label;
  element.addEventListener("click", onClick);
  return element;
}

function shuffleQuestion(question) {
  const order = question.options.map((_, index) => index);
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }
  return {
    ...question,
    options: order.map((index) => question.options[index]),
    answer: order.indexOf(question.answer),
  };
}

function initQuizzes() {
  document.querySelectorAll("[data-quiz]").forEach((root) => {
    const questions = readConfig(root).map(shuffleQuestion);
    let current = 0;
    let correct = 0;

    const render = () => {
      root.replaceChildren();
      if (current === questions.length) {
        const summary = document.createElement("div");
        summary.className = "card";
        summary.innerHTML = `<div class="card-title">Score: ${correct} / ${questions.length}</div>
          <p class="muted">This score stays in your browser and is never recorded.</p>`;
        root.append(summary);
        return;
      }

      const question = questions[current];
      const progress = document.createElement("p");
      progress.className = "eyebrow";
      progress.textContent = `Question ${current + 1} of ${questions.length}`;
      const heading = document.createElement("h3");
      heading.textContent = question.q;
      root.append(progress, heading);

      question.options.forEach((option, optionIndex) => {
        root.append(createButton(
          `${String.fromCharCode(65 + optionIndex)}. ${option}`,
          () => {
            const options = [...root.querySelectorAll(".quiz-option")];
            options.forEach((candidate, candidateIndex) => {
              candidate.disabled = true;
              if (candidateIndex === question.answer) {
                candidate.classList.add("is-correct");
              }
              if (candidateIndex === optionIndex && optionIndex !== question.answer) {
                candidate.classList.add("is-incorrect");
              }
            });
            if (optionIndex === question.answer) correct += 1;

            const explanation = document.createElement("div");
            explanation.className = "quiz-explanation";
            const label = document.createElement("strong");
            label.textContent = "Why: ";
            explanation.append(label, document.createTextNode(question.explain));
            root.append(
              explanation,
              createButton(
                current + 1 < questions.length ? "Next question" : "See score",
                () => {
                  current += 1;
                  render();
                },
                "btn btn-primary",
              ),
            );
          },
          "quiz-option",
        ));
      });
    };

    render();
  });
}

function initSteppers() {
  document.querySelectorAll("[data-stepper]").forEach((root) => {
    const steps = [...root.querySelectorAll(".step")];
    const progress = root.querySelector(".stepper-progress");
    const controls = [...root.querySelectorAll("[data-dir]")];
    let current = 0;

    const show = () => {
      steps.forEach((step, index) => {
        step.hidden = index !== current;
      });
      progress.textContent = `Step ${current + 1} of ${steps.length}`;
      controls.forEach((control) => {
        const direction = Number(control.dataset.dir);
        control.disabled = current + direction < 0 || current + direction >= steps.length;
      });
    };
    controls.forEach((control) => {
      control.addEventListener("click", () => {
        current += Number(control.dataset.dir);
        show();
      });
    });
    show();
  });
}

function initReveals() {
  document.querySelectorAll("[data-reveal]").forEach((root) => {
    const trigger = root.querySelector("[data-reveal-trigger]");
    const content = root.querySelector("[data-reveal-content]");
    content.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", () => {
      const willOpen = content.hidden;
      content.hidden = !willOpen;
      trigger.setAttribute("aria-expanded", String(willOpen));
      trigger.textContent = willOpen ? "Hide explanation" : "Reveal explanation";
    });
  });
}

function initScenarios() {
  document.querySelectorAll("[data-scenario]").forEach((root) => {
    const config = readConfig(root);
    const nodes = new Map(config.nodes.map((node) => [node.id, node]));

    const render = (nodeId) => {
      const node = nodes.get(nodeId);
      if (!node) throw new Error(`Unknown scenario node: ${nodeId}`);
      root.replaceChildren();
      const heading = document.createElement("h3");
      heading.textContent = node.title;
      const body = document.createElement("p");
      body.textContent = node.body;
      root.append(heading, body);

      if (node.feedback) {
        const feedback = document.createElement("div");
        feedback.className = "scenario-feedback";
        feedback.textContent = node.feedback;
        root.append(feedback);
      }
      (node.choices || []).forEach((choice) => {
        root.append(createButton(
          choice.label,
          () => render(choice.next),
          "scenario-choice",
        ));
      });
      if (!node.choices?.length) {
        root.append(createButton("Start again", () => render(config.start)));
      }
    };

    render(config.start);
  });
}

function initOrderingExercises() {
  document.querySelectorAll("[data-ordering]").forEach((root) => {
    const config = readConfig(root);
    const items = [...config.items];
    const list = document.createElement("ol");
    list.className = "ordering-list";
    const feedback = document.createElement("p");
    feedback.className = "muted";
    feedback.setAttribute("aria-live", "polite");

    const render = () => {
      list.replaceChildren();
      items.forEach((item, index) => {
        const row = document.createElement("li");
        const label = document.createElement("span");
        label.textContent = item.label;
        const controls = document.createElement("span");
        controls.className = "ordering-controls";
        const up = createButton("Up", () => move(index, -1));
        const down = createButton("Down", () => move(index, 1));
        up.disabled = index === 0;
        down.disabled = index === items.length - 1;
        controls.append(up, down);
        row.append(label, controls);
        list.append(row);
      });
    };
    const move = (index, direction) => {
      const next = index + direction;
      [items[index], items[next]] = [items[next], items[index]];
      render();
      list.children[next].querySelector("button").focus();
    };

    root.append(
      list,
      createButton("Check order", () => {
        const isCorrect = items.every(
          (item, index) => item.id === config.correct[index],
        );
        feedback.className = isCorrect
          ? "feedback is-correct"
          : "feedback is-incorrect";
        feedback.textContent = isCorrect ? config.success : config.retry;
      }, "btn btn-primary"),
      feedback,
    );
    render();
  });
}

function initPlaygrounds() {
  document.querySelectorAll("[data-playground]").forEach((root) => {
    const config = readConfig(root);
    const values = Object.fromEntries(
      config.controls.map((control) => [control.id, control.value]),
    );
    const controls = document.createElement("div");
    controls.className = "playground-controls";
    const output = document.createElement("div");
    output.className = "playground-output";
    output.setAttribute("aria-live", "polite");

    const calculate = () => {
      output.replaceChildren();
      config.outputs.forEach((definition) => {
        const value = Object.entries(definition.terms).reduce(
          (total, [id, coefficient]) => total + values[id] * coefficient,
          definition.intercept || 0,
        );
        const metric = document.createElement("div");
        metric.className = "metric";
        const label = document.createElement("span");
        label.textContent = definition.label;
        const result = document.createElement("strong");
        result.textContent = `${value.toFixed(definition.precision ?? 0)}${definition.unit || ""}`;
        metric.append(label, result);
        output.append(metric);
      });
    };

    config.controls.forEach((control) => {
      const label = document.createElement("label");
      label.textContent = control.label;
      const input = document.createElement("input");
      input.type = "range";
      Object.assign(input, {
        min: control.min,
        max: control.max,
        step: control.step,
        value: control.value,
      });
      const value = document.createElement("output");
      value.textContent = control.value;
      input.addEventListener("input", () => {
        values[control.id] = Number(input.value);
        value.textContent = input.value;
        calculate();
      });
      label.append(input, value);
      controls.append(label);
    });
    root.append(controls, output);
    calculate();
  });
}

function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = [...root.querySelectorAll("[role=tab]")];
    const panels = [...root.querySelectorAll("[role=tabpanel]")];
    const select = (selected) => {
      tabs.forEach((tab, index) => {
        const active = index === selected;
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        panels[index].hidden = !active;
      });
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => select(index));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const next = (index + direction + tabs.length) % tabs.length;
        select(next);
        tabs[next].focus();
      });
    });
    select(0);
  });
}

function initTableOfContents() {
  const links = [...document.querySelectorAll(".toc a[href^='#']")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!links.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-15% 0px -75%" });
  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  initQuizzes();
  initSteppers();
  initReveals();
  initScenarios();
  initOrderingExercises();
  initPlaygrounds();
  initTabs();
  initTableOfContents();
});
