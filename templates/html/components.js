/* ============================================================
   Component snippets — dependency-free interaction logic for
   HTML artifacts. Each section below is independently copyable:
   inline only the snippets an artifact actually uses into its
   <script> block. Class names match base.html's design system.
   ============================================================ */


/* ---- Quiz engine ----------------------------------------------------
   One question at a time → click an option → instant feedback +
   explanation reveal → Next → score summary at the end.

   Markup:  <div id="quiz"></div>
   Data:    a QUIZ array; `answer` is the index of the correct option.
*/
(function () {
  const QUIZ = [
    {
      q: "Sample question text?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: 1,
      explain: "Why B is correct and the others are not.",
    },
  ];

  const root = document.getElementById("quiz");
  if (!root) return;
  let current = 0;
  let correct = 0;

  function render() {
    if (current >= QUIZ.length) {
      root.innerHTML =
        '<div class="card"><div class="card-title">Score: ' +
        correct + " / " + QUIZ.length +
        '</div><div class="progress-track"><div class="progress-fill" style="width:' +
        Math.round((correct / QUIZ.length) * 100) +
        '%"></div></div></div>';
      return;
    }
    const item = QUIZ[current];
    root.innerHTML = "";

    const progress = document.createElement("p");
    progress.className = "muted";
    progress.textContent = "Question " + (current + 1) + " of " + QUIZ.length;
    root.appendChild(progress);

    const question = document.createElement("h3");
    question.textContent = item.q;
    root.appendChild(question);

    item.options.forEach(function (text, i) {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = String.fromCharCode(65 + i) + ". " + text;
      btn.addEventListener("click", function () { answer(i); });
      root.appendChild(btn);
    });
  }

  function answer(picked) {
    const item = QUIZ[current];
    const options = root.querySelectorAll(".quiz-option");
    options.forEach(function (btn, i) {
      btn.disabled = true;
      if (i === item.answer) btn.classList.add("is-correct");
      else if (i === picked) btn.classList.add("is-incorrect");
    });
    if (picked === item.answer) correct++;

    const explain = document.createElement("div");
    explain.className = "quiz-explanation";
    explain.innerHTML = "<strong>Why:</strong> " + item.explain;
    root.appendChild(explain);

    const next = document.createElement("button");
    next.className = "btn btn-primary";
    next.textContent = current + 1 < QUIZ.length ? "Next question" : "See score";
    next.addEventListener("click", function () { current++; render(); });
    root.appendChild(next);
  }

  render();
})();


/* ---- Flashcard viewer -----------------------------------------------
   Click a card to flip question ↔ answer; filter buttons narrow the
   list to due cards or a Leitner box. Passive review only — never
   mutates deck state.

   Markup:  <div id="deck-filters"></div><div id="deck"></div>
   Data:    a DECK array embedded at generation time from
            flashcards/deck.md; `due` is YYYY-MM-DD.
*/
(function () {
  const DECK = [
    { q: "Sample question?", a: "Sample answer.", section: "1.1", box: 1, due: "2026-01-01" },
  ];

  const deckRoot = document.getElementById("deck");
  const filterRoot = document.getElementById("deck-filters");
  if (!deckRoot || !filterRoot) return;
  // Local date, not toISOString() — UTC would mark cards due early in the evening.
  const today = new Date().toLocaleDateString("en-CA");

  const FILTERS = [
    { label: "All", test: function () { return true; } },
    { label: "Due", test: function (c) { return c.due <= today; } },
  ];
  [1, 2, 3, 4, 5].forEach(function (box) {
    FILTERS.push({ label: "Box " + box, test: function (c) { return c.box === box; } });
  });
  let active = 0;

  function renderFilters() {
    filterRoot.innerHTML = "";
    FILTERS.forEach(function (f, i) {
      const btn = document.createElement("button");
      btn.className = "btn";
      if (i === active) btn.classList.add("btn-primary");
      btn.textContent = f.label;
      btn.addEventListener("click", function () { active = i; renderFilters(); renderDeck(); });
      filterRoot.appendChild(btn);
    });
  }

  function renderDeck() {
    deckRoot.innerHTML = "";
    const cards = DECK.filter(FILTERS[active].test);
    if (cards.length === 0) {
      deckRoot.innerHTML = '<p class="muted">No cards match this filter.</p>';
      return;
    }
    cards.forEach(function (c) {
      const el = document.createElement("div");
      el.className = "flashcard";
      el.innerHTML =
        '<div class="flashcard-meta">Section ' + c.section +
        " · Box " + c.box + " · Due " + c.due + "</div>" +
        '<div class="flashcard-front"><strong>Q:</strong> ' + c.q + "</div>" +
        '<div class="flashcard-back"><strong>A:</strong> ' + c.a + "</div>";
      el.addEventListener("click", function () { el.classList.toggle("is-flipped"); });
      deckRoot.appendChild(el);
    });
  }

  renderFilters();
  renderDeck();
})();


/* ---- Tutorial stepper -----------------------------------------------
   Shows one .step at a time with Back / Next controls and a progress
   readout.

   Markup:  <div id="stepper">
              <div class="step">Step one…</div>
              <div class="step">Step two…</div>
              <div class="stepper-controls">
                <button class="btn" data-dir="-1">Back</button>
                <span class="stepper-progress"></span>
                <button class="btn btn-primary" data-dir="1">Next</button>
              </div>
            </div>
*/
(function () {
  const stepper = document.getElementById("stepper");
  if (!stepper) return;
  const steps = stepper.querySelectorAll(".step");
  const progress = stepper.querySelector(".stepper-progress");
  const buttons = stepper.querySelectorAll("[data-dir]");
  let index = 0;

  function show() {
    steps.forEach(function (s, i) { s.hidden = i !== index; });
    progress.textContent = "Step " + (index + 1) + " of " + steps.length;
    buttons.forEach(function (btn) {
      const dir = Number(btn.dataset.dir);
      btn.disabled = index + dir < 0 || index + dir >= steps.length;
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      index += Number(btn.dataset.dir);
      show();
    });
  });

  show();
})();


/* ---- Tabs ------------------------------------------------------------
   Markup:  <div class="tab-list">
              <button class="tab is-active" data-tab="one">One</button>
              <button class="tab" data-tab="two">Two</button>
            </div>
            <div class="tab-panel" id="one">…</div>
            <div class="tab-panel" id="two" hidden>…</div>
*/
(function () {
  document.querySelectorAll(".tab-list").forEach(function (list) {
    const tabs = list.querySelectorAll(".tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.toggle("is-active", t === tab);
          const panel = document.getElementById(t.dataset.tab);
          if (panel) panel.hidden = t !== tab;
        });
      });
    });
  });
})();


/* ---- Collapsible sections ---------------------------------------------
   No JS needed — use native <details>/<summary>, styled by base.html:

   <details>
     <summary>Show the hint</summary>
     <p>Hidden content.</p>
   </details>
*/
