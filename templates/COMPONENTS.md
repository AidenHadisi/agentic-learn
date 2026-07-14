# Lesson Components

Start with `templates/lesson.html`. Author only the title and content region,
then run `npm run lesson:build -- <path>`. The build detects used capabilities
and inlines them. Never write component JavaScript in a lesson.

## Required Structure

```html
<header class="lesson-header">
  <p class="eyebrow">Topic · Section 2</p>
  <h1>Lesson title</h1>
  <div class="lesson-meta"><span>15 minutes</span></div>
  <p class="lesson-objective"><strong>Objective:</strong> Observable outcome.</p>
</header>
```

Include a `.toc`, worked examples, `.callout-key` takeaways, practice, a private
quiz, and References. Use stable source IDs from the topic source ledger.

## Quiz

```html
<div data-quiz data-source="quiz-data"></div>
<script type="application/json" id="quiz-data">
[
  {
    "q": "Question?",
    "options": ["Plausible A", "Correct B", "Plausible C"],
    "answer": 1,
    "explain": "Why the answer is correct."
  }
]
</script>
```

Write 5–10 understanding questions. Keep distractors plausible and similarly
sized. The runtime shuffles options and keeps the score in the browser.

## Stepper

```html
<div data-stepper>
  <div class="step">First stage</div>
  <div class="step">Second stage</div>
  <div class="stepper-controls">
    <button class="btn" type="button" data-dir="-1">Back</button>
    <span class="stepper-progress"></span>
    <button class="btn btn-primary" type="button" data-dir="1">Next</button>
  </div>
</div>
```

Use for processes where order matters.

## Prediction and Reveal

```html
<div class="reveal" data-reveal>
  <p>Ask the learner to predict before revealing.</p>
  <button class="btn btn-primary" type="button" data-reveal-trigger>
    Reveal explanation
  </button>
  <div data-reveal-content tabindex="-1">Explanation and feedback.</div>
</div>
```

Use before explanations to prompt retrieval, not to hide ordinary prose.

## Branching Scenario

```html
<div data-scenario data-source="scenario-data" aria-live="polite"></div>
<script type="application/json" id="scenario-data">
{
  "start": "start",
  "nodes": [
    {
      "id": "start",
      "title": "Decision",
      "body": "What do you do?",
      "choices": [{"label": "Verify", "next": "result"}]
    },
    {
      "id": "result",
      "title": "Result",
      "body": "The consequence.",
      "feedback": "Why this happened."
    }
  ]
}
</script>
```

Use realistic decisions and consequences. Every branch must teach, not merely
label the learner wrong.

## Ordering Exercise

```html
<div data-ordering data-source="ordering-data"></div>
<script type="application/json" id="ordering-data">
{
  "items": [
    {"id": "first", "label": "First step"},
    {"id": "second", "label": "Second step"}
  ],
  "correct": ["first", "second"],
  "success": "Correct.",
  "retry": "Reconsider what must happen first."
}
</script>
```

The runtime uses keyboard-accessible Up and Down controls. Never require drag
and drop as the only interaction.

## Parameter Playground

```html
<div data-playground data-source="playground-data"></div>
<script type="application/json" id="playground-data">
{
  "controls": [
    {"id": "load", "label": "Load", "min": 0, "max": 10, "step": 1, "value": 5}
  ],
  "outputs": [
    {
      "label": "Cost",
      "terms": {"load": 2},
      "intercept": 1,
      "precision": 0,
      "unit": " ms"
    }
  ]
}
</script>
```

Outputs are linear combinations of controls. Use only with sourced or explicitly
illustrative values; label units and assumptions.

## Tabs

```html
<div data-tabs>
  <div role="tablist" aria-label="Comparison">
    <button class="btn" type="button" role="tab" aria-controls="panel-a">A</button>
    <button class="btn" type="button" role="tab" aria-controls="panel-b">B</button>
  </div>
  <div id="panel-a" role="tabpanel">First view.</div>
  <div id="panel-b" role="tabpanel">Second view.</div>
</div>
```

## Optional Capabilities

Use a capability only when it makes the concept easier to understand.

### Mermaid

```html
<pre data-mermaid>
flowchart LR
  Input --> Process
  Process --> Output
</pre>
```

Best for flows, sequences, states, and architecture.

### Chart.js

```html
<div class="chart-frame">
  <canvas data-chart data-source="chart-data" role="img"
    aria-label="Latency by request volume"></canvas>
</div>
<script type="application/json" id="chart-data">
{
  "type": "line",
  "data": {
    "labels": ["10", "100", "1000"],
    "datasets": [{"label": "Latency (ms)", "data": [4, 8, 30]}]
  },
  "options": {
    "scales": {
      "x": {"title": {"display": true, "text": "Requests per second"}},
      "y": {"title": {"display": true, "text": "Latency (ms)"}}
    },
    "plugins": {"title": {"display": true, "text": "Latency by request volume"}}
  }
}
</script>
```

Label the title, axes, units, series, source, and time range. Do not fabricate
data to make a lesson more visual.

### KaTeX

```html
<span data-katex="inline">E = mc^2</span>
<div data-katex="display">\int_0^1 x^2\,dx</div>
```

### Cytoscape

```html
<div data-cytoscape data-source="graph-data" role="img"
  aria-label="Dependency graph"></div>
<script type="application/json" id="graph-data">
{
  "elements": [
    {"data": {"id": "a", "label": "Source"}},
    {"data": {"id": "b", "label": "Sink"}},
    {"data": {"source": "a", "target": "b"}}
  ],
  "layout": {"name": "breadthfirst", "directed": true}
}
</script>
```

Best for networks the learner benefits from exploring. Use Mermaid for a simple
static flow.

## Quality Rules

- Interactivity must serve the objective; one strong interaction beats several
  decorative widgets.
- All visible controls need meaningful labels and keyboard access.
- JSON must be valid and must not contain the literal text `</script>`.
- Use design tokens and existing classes. Do not add page-specific styling or
  hard-coded colors.
- Keep important content readable without interaction and honor reduced motion.
