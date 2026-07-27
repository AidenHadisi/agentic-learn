# Learning Journal — Evaluating and Improving AI Workflows

## Student Profile
- **Background**: Senior engineer who builds production AI workflows across every shape — deterministic LLM DAGs, agentic loops, RAG over own data, structured extraction/classification, and open-ended generation. Currently has **no systematic evaluation at all**: eyeballs outputs and tweaks prompts. No eval platform, no tracing, no scoring.
- **Goal**: The full course — build a real eval harness with CI gates, run a systematic improve loop, master LLM-as-judge, and monitor live production workflows. Stated pain: "I create a lot of automatic AI workflows and DAGs but don't know how to improve or evaluate them automatically."
- **Constraints**: None stated
- **Depth**: Full depth, hands-on — theory plus exercises run against his own workflows. Working-level statistics baked in (confidence intervals, sample size, significance on eval results), not a heavy statistical-testing treatment.

## Established Knowledge
- **Mathematics**: College Calc I–III, linear algebra, probability coursework. Currently working through the `ds-math-stats` topic; Section 1 (descriptive statistics) verified by cold retrieval — mean/median/variance, robust statistics, breakdown points, MSE/MAE ↔ mean/median, Bessel's correction.
- **Statistics not yet held**: standard error, confidence intervals, hypothesis testing, power. Sections 8 and 9 must teach these from scratch; do not assume them.
- **LLM engineering**: Ships production LLM systems. Sibling topics `prompt-injection-defense` (§1 complete) and `llm-jailbreaking` establish solid grasp of confused-deputy reasoning, the instruction/data boundary, and that LLM defenses are probabilistic rather than structural.
- **Failure attribution instinct**: On calibration, claimed he could attribute an end-to-end failure to the specific step in a multi-step pipeline that caused it. Unverified — probe in Section 12 before teaching it as new. Partial support on 2026-07-25: read "all nodes green, end-to-end red" as composition failure or unscored dimension, not as a broken outcome metric.
- **Test vs eval (assertion vs measurement)**: Demonstrated 2026-07-25. Rejected "pin seed + retry until green," naming both that determinism is unavailable and that retry-until-pass destroys the signal. Diagnosed a permanently-green substring suite as false-greening *and* as suppressing prompt changes.
- **Nondeterminism mechanism**: Demonstrated. Knows temperature 0 is a sampling guarantee only, and that serving-side batching plus non-associative floating point makes identical requests diverge.
- **Model-update drift**: Demonstrated. Inferred unprompted that a prompt's "best" ranking is only valid for the model version it was compared on, and that pinning a snapshot merely defers the problem.
- **Deterministic shell**: Demonstrated. Correctly sorted schema/tool-arg validity, cited-order-ID-in-retrieved-records, and date-parser correctness into deterministic assertions while excluding tone *and* "doesn't promise anything outside policy" — caught that the policy check only looks mechanical.
- **The eval taxonomy**: Demonstrated. Placed "are replies drifting off-policy this month" as system / online / reference-free / end-to-end with no errors.
- **Evals vs guardrails**: Demonstrated, including the harder half — identified a 2-second model-based checker as an instrument being misused for in-request enforcement, and rejected guardrail fire rate as a quality metric because it ignores misses and false alarms.
- **Error analysis before metrics**: Demonstrated 2026-07-26. Named brainstorm-first suites as measuring imagination, not observed failures.
- **Judgeable traces**: Demonstrated. Refused to open-code RAG without retrieved chunks; required logging fix first.
- **Open coding craft**: Demonstrated. Chose the specific observational note over fix-prescription, premature category label, and Likert fog.
- **First-upstream-failure rule**: Demonstrated on a RAG cascade — coded wrong-document retrieval, not downstream symptoms.
- **Axial coding / mode naming**: Demonstrated. Merged same-mechanism retrieval misses under an actionable name; rejected generic `hallucination` and wording-only splits.
- **Saturation as stop signal**: Demonstrated. Stop after ~20 consecutive with no new mode (given ~100 floor); re-run after major changes — not "read forever" and not "zero residual risk."
- **Not yet held (self-reported on calibration)**: sample-size reasoning for eval sets (why pass@1 on 30 examples can't separate 70% from 80%), chance-corrected agreement between a judge and human labels, and choosing a decision threshold from a precision/recall tradeoff. Sections 5, 7, 8, and 9 own these.
- **Not yet demonstrated (hands-on)**: producing a counted taxonomy from his own production traces (Practice 3). Method checks passed; artifact pending.

## Log
### 2026-07-25 — Discovery
- **Covered**: Scoped the topic, interviewed the student, researched the field across seven parallel angles (foundations and error analysis, LLM-as-judge, multi-step and agent evaluation, RAG and structured output, eval statistics, tooling and production practice, the improvement loop), and designed an 18-section curriculum
- **Evidence**: Interview answers — wants the full course at full depth with hands-on exercises; builds all five workflow shapes; has zero eval tooling today; could only claim step attribution on the calibration question
- **Next**: Section 1 — Why AI Systems Break Normal Testing

### 2026-07-25 — Section 1 (Why AI Systems Break Normal Testing)
- **Covered**: The three properties that break testing (batch-invariance nondeterminism at temperature 0, open-ended output space, criteria drift); what survives from software testing; Air Canada and the GPT-4o sycophancy rollback as failures no assertion catches; the assertion→measurement reframe with the performance-benchmarking and manufacturing-QA analogies and the flaky-test trap; the four axes (model/system, offline/online, reference-based/free, node/end-to-end); evals vs tests vs guardrails vs tracing; eval-run vocabulary; validity / reliability / discriminating power / actionability / cost and their tensions
- **Evidence**: 7 for 7 on application checks across three questionnaires, all answered without hesitation. Strongest signals: independently derived that a prompt's ranking is version-scoped; excluded the policy-compliance check from the deterministic bucket while keeping the order-ID invariant; rejected guardrail fire rate as a quality metric on the grounds that it ignores both misses and false alarms. No stumbles to re-teach.
- **Engagement note**: Completed all three checks this session — reverses the pattern of cancelled questionnaires in `ds-math-stats`. Multi-question batched forms appear to work better for him than single questions.
- **Next**: Section 2 — Error Analysis: Reading Your Own Failures. Practice 2 (listing unwritten criteria from 20 real outputs) is deliberate setup; ask whether he did it, and use his own list as the raw material for open coding.

### 2026-07-26 — Section 2 (Error Analysis: Reading Your Own Failures)
- **Covered**: Why error analysis precedes metrics (imagination vs observed failures); judgeable traces and logging prerequisites; open coding with the four note rules and domain-expert ownership; first-upstream-failure labeling hygiene; axial coding into a counted, actionably named taxonomy; saturation (~100 floor / ~20 no-new-category stop) as a local stop signal
- **Evidence**: 6 for 6 on application checks, all correct without hesitation — brainstorm-first suite diagnosis; refuse RAG open-coding without chunks; pick observational note over fix/category/Likert; code first upstream on RAG cascade; merge same-mechanism retrieval misses and reject generic `hallucination`; treat saturation as stop-and-act not read-forever or zero-risk. Did not confirm whether §1 Practice 2 was done; proceeded with worked examples.
- **Next**: Section 3 — Building the Eval Dataset. Ask whether Practice 3 (own counted taxonomy) was produced; use it as seed material if yes.

## Weak Spots
- **Teaching-style note (carried from `ds-math-stats`)**: Prefers concrete enumerated examples over algebraic derivation. Lead with worked numbers; keep derivations short. Single-question checks also got full engagement this session (6/6); batched forms remain a good default but aren't required.
- None subject-specific yet. Sections 1–2 produced no wrong answers.
