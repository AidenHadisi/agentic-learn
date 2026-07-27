# Sources — Evaluating and Improving AI Workflows

Everything read while researching this topic. Append as you go; dedupe by URL.

- **Are Large Language Models Reliable? Analyzing the Impact of Silent LLM API Updates** — Ma, C., Yang, J. and Kästner, C., 2023 · https://arxiv.org/abs/2311.11123
  arXiv preprint — empirical evidence that stable API aliases still drift in behavior; good for the silent-update / provider-drift claim.
  Used for: §1
- **Defeating Nondeterminism in LLM Inference** — He, H. and Thinking Machines Lab, 2025 · https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/
  Lab engineering blog — primary write-up of batch-dependent floating-point nondeterminism at temperature 0; worth reading directly for the mechanism.
  Used for: §1
- **Expanding on what we missed with sycophancy** — OpenAI, 2025 · https://openai.com/index/expanding-on-sycophancy/
  Vendor postmortem — OpenAI's own account of the sycophancy failure; useful as an incident case study, not as neutral eval methodology.
  Used for: §1
- **Frequently Asked Questions About LLM Evals** — Husain, H., 2025 · https://hamel.dev/blog/posts/evals-faq/
  Practitioner blog — clear test-vs-eval framing, rubric drift, and eval-set saturation; strong practical guidance for builders.
  Used for: §1
- **Why is error analysis so important in LLM evals, and how is it performed?** — Husain, H., 2025 · https://hamel.dev/blog/posts/evals-faq/why-is-error-analysis-so-important-in-llm-evals-and-how-is-it-performed.html
  Canonical FAQ page — open coding, axial coding, first-upstream-failure, ~100 / ~20 saturation heuristics; the procedural definition for §2.
  Used for: §2
- **Measuring What Matters: Construct Validity in Large Language Model Benchmarks** — Reuel, A. et al., 2025 · https://arxiv.org/abs/2511.04703
  arXiv preprint — construct-validity lens on what benchmarks actually measure; good for "are we scoring the right thing?"
  Used for: §1
- **Moffatt v. Air Canada, 2024 BCCRT 149** — British Columbia Civil Resolution Tribunal, 2024 · https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html
  Legal decision — concrete liability case for chatbot hallucinations; use for the real-world stakes of unverified AI output, not for eval technique.
  Used for: §1
- **Reproducible outputs with the seed parameter** — OpenAI, 2025 · https://developers.openai.com/cookbook/examples/reproducible_outputs_with_the_seed_parameter
  Official cookbook docs — documents seed/reproducibility knobs and their limits; pair with the Thinking Machines piece, don't treat alone as a determinism guarantee.
  Used for: §1
- **Who Validates the Validators? Aligning LLM-Assisted Evaluation of LLM Outputs with Human Preferences** — Shankar, S. et al., 2024 · https://arxiv.org/abs/2404.12272
  arXiv preprint — LLM-as-judge vs human preference alignment; criteria drift; good foundation for model-based scorers and their failure modes.
  Used for: §1, §2 (criteria-drift bridge only)
- **Error Analysis Is the Eval Work. Here's How to Actually Do It.** — Avesta, 2026 · https://avestahq.com/blog/how-to-do-error-analysis
  Practitioner how-to — best pedagogical recipe: judgeable traces, four note rules, worked RAG taxonomy with counts, trap list. Mild vendor CTA at end.
  Used for: §2
- **Read the outputs. Then read more.** — lainlog, 2026-05-03 · https://lainlog.com/posts/look-at-the-data
  Practitioner primer — strongest motivation piece: imagination-vs-reading, Monday spreadsheet recipe, explicit Strauss & Corbin citation.
  Used for: §2
- **Machine Learning Yearning** — Ng, A., ~2018 · https://info.deeplearning.ai/hubfs/andrew-ng-machine-learning-yearning-1.pdf
  Classical ML handbook — Ch. 14–15 error-analysis / ceiling precedent (~100 mislabels); bridge for ML-fluent engineers, not LLM-specific.
  Used for: §2
- **Error analysis to find failure modes** — Strick, A., 2025-05-23 · https://alexstrick.com/posts/2025-05-23-error-analysis-to-find-failure-modes.html
  Course notes — fog metaphor, pitfalls; useful for "code observable behavior, not diagnosis" nuance. Clarify first-upstream vs deep RCA.
  Used for: §2
- **LLM Evals Lesson 2: Error Analysis** — thingsithinkithink, 2025-06-21 · https://thingsithinkithink.blog/posts/2025/06-21-llm-evals-lesson-2-error-analysis/
  Course notes — NurtureBoss live counts, card-sort analogy, binary-vs-Likert intuition; strong secondary teaching reference.
  Used for: §2 (background; not cited in lesson)
- **An LLM-as-Judge Won’t Save the Product. Here’s What Will.** / eval process — Yan, E., 2025-04 · https://eugeneyan.com/writing/eval-process/
  Practitioner essay — scientific-method framing for look-at-the-data; soft on open/axial vocabulary.
  Used for: §2 (background)
- **Building eval systems that improve your AI product** — Lenny's Newsletter / Husain & Shankar, ~2025 · https://www.lennysnewsletter.com/p/building-eval-systems-that-improve
  Executive playbook — don't start with fashionable metrics; error analysis → prioritized failure list.
  Used for: §2 (background)
- **Hamel & Shreya AI Evals masterclass write-up** — Gupta, A., 2026-01-15 · https://www.news.aakashg.com/p/hamel-shreya-podcast-2
  Production narrative — NurtureBoss-style counts, PM-owns-error-analysis claim, time budgets.
  Used for: §2 (background)
- **Error analysis for LLM applications (cookbook)** — Langfuse, ~2026 · https://langfuse.com/guides/cookbook/error-analysis-llm-applications
  Vendor cookbook — Dad Tech Support worked rates; excellent procedure, mildly tool-shaped.
  Used for: §2 (background; micro-example inspiration)
- **Open, Axial, and Selective Coding** — Delve, living · https://delvetool.com/blog/openaxialselective
  Qualitative-methods primer — grounded-theory origins of the vocabulary; too heavy for the lesson body, good teacher background.
  Used for: §2 (background)
- **Building resilient prompts using an evaluation flywheel** — OpenAI Cookbook, 2025 · https://github.com/openai/openai-cookbook/blob/main/examples/evaluation/Building_resilient_prompts_using_an_evaluation_flywheel.md
  Lab cookbook — open→axial with leasing-assistant example; cites Shankar & Husain. Strong but drifts into graders (later sections).
  Used for: §2 (background)
- **Demystifying evals for AI agents** — Anthropic, ~2025 · https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
  Engineering post — read-the-transcripts culture; grader bugs vs model bugs. Light on taxonomy method.
  Used for: —
- **A Recipe for Training Neural Networks** — Karpathy, A., 2019-04-25 · http://karpathy.github.io/2019/04/25/recipe/
  Classic essay — look-at-data culture origin; pre-LLM-product, needs explicit bridge.
  Used for: —
- **Basics of Qualitative Research** — Strauss, A. and Corbin, J., 1990/1998
  Canonical GT textbook — source of open/axial/saturation vocabulary; cite via practitioner adaptations, don't assign the book.
  Used for: §2 (background)
- **Clustering LLM failure modes / living map** — Composo, living · https://www.composo.ai/post/clustering-llm-failure-modes/
  Vendor post — useful point that top-3 modes often dominate; automation caveats. Medium strength.
  Used for: —
- **FutureAGI / LinkedIn “Edition 69” error analysis** — ~2026 · https://www.linkedin.com/pulse/edition-69-error-analysis-llm-apps-7-steps-find-why-your-app-untec
  Weak–mixed — prefers embedding clusters + generic taxonomies; fights the read-first spirit.
  Used for: —
