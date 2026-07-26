# Evaluating and Improving AI Workflows

You build LLM workflows — DAGs, agents, RAG pipelines, extractors — and today you judge them by eye. This course turns that into engineering. You will learn to read your own failures systematically, build datasets and scorers that detect them, put honest error bars on the numbers, decompose a multi-step system so you can tell *which step* is costing you, and then close the loop: choose the highest-value fix, apply it, prove it worked, and lock it in so it never regresses. The last third covers automatic optimization (letting a search process improve your prompts and pipelines against your metric), the harness you run all of this in, and how to keep measuring once real users are involved.

## Success Criteria

- Explain why LLM systems break normal software testing, and pick the right kind of eval for a given question
- Take 100 real traces from one of your workflows and produce a failure taxonomy with counts, derived from the traces rather than from a generic metric menu
- Build a versioned eval dataset — bootstrapped synthetically when you have no data — with a held-out split you don't tune against
- Write deterministic scorers first, and know exactly when a criterion genuinely needs a model to judge it
- Compute precision, recall, F1, and a confusion matrix for a classification or extraction node, and choose an operating threshold from the cost of each error type
- Build an LLM-as-judge for a criterion, name the biases it is subject to, and mitigate them
- Validate that judge against human labels using chance-corrected agreement, and correct a judge-reported pass rate for the judge's own error rates
- Put a confidence interval on any eval score, and say how many items you need to detect a difference you care about
- Decide whether version B actually beats version A using a paired comparison, and avoid fooling yourself with repeated peeking or multiple metrics
- Evaluate retrieval separately from generation, using recall@k, MRR, and NDCG, and measure whether an answer is actually grounded in what was retrieved
- Instrument a DAG so every node has its own score, and localize an end-to-end failure to the step that caused it
- Evaluate an agent's trajectory — tool choice, arguments, efficiency, termination — and report reliability (pass^k), not just best-of-n capability
- Run a ceiling analysis to find which node is the bottleneck, and pick the improvement lever your evals actually point to
- Use an automatic prompt optimizer (DSPy/MIPROv2, GEPA) on a real pipeline, and defend against it gaming your metric
- Build an eval harness with versioned experiment identity, gate CI on it, and run online evaluation on production traffic

## Out of Scope

- Training, fine-tuning, or RLHF internals — fine-tuning appears only as one improvement lever among many
- Building public benchmarks or leaderboards; the focus is product-specific evaluation of systems you own
- Safety red-teaming and jailbreak evaluation (covered in the `llm-jailbreaking` and `prompt-injection-defense` topics)
- Real-time guardrails as a production safety control — distinguished from evals, but not taught as its own discipline
- Classical ML evaluation beyond what LLM workflows need (no ROC-AUC theory, learning curves, or cross-validation schemes)

## Sections

- [x] 1. **Why AI Systems Break Normal Testing** — Explain what an eval is as measurement rather than assertion, and classify any evaluation question along the model/system, offline/online, reference-based/free, and unit/end-to-end axes
- [ ] 2. **Error Analysis: Reading Your Own Failures** — Turn a pile of traces into a counted failure taxonomy using open and axial coding, the first-upstream-failure rule, and saturation
- [ ] 3. **Building the Eval Dataset** — Bootstrap a dataset from nothing with dimensional synthetic generation, split it for honest reporting, and version it so it can grow without rotting
- [ ] 4. **Deterministic Scorers and Metric Design** — Score what code can score, choose binary over Likert for good reasons, and place every criterion on the scorer ladder from cheapest to most expensive
- [ ] 5. **Classification and Extraction Metrics** — Read a confusion matrix, compute precision/recall/F1 for a structured-output node, handle class imbalance and macro vs micro averaging, and pick a threshold from the cost of each error
- [ ] 6. **LLM-as-a-Judge: Building One** — Write pointwise, pairwise, and reference-guided judges with real rubrics, and name and mitigate position, verbosity, self-preference, and clumping biases
- [ ] 7. **Validating the Judge** — Treat the judge as a classifier: measure chance-corrected agreement against human labels, run the alignment loop, and correct a judge-reported rate for the judge's own error rates
- [ ] 8. **Error Bars: Your Score Is a Sample** — Compute the standard error and confidence interval of a pass rate, separate item-sampling noise from generation noise, and bootstrap a CI for any metric
- [ ] 9. **Did B Actually Beat A?** — Run a paired comparison and McNemar's test, size an eval set with a power calculation, and avoid inflating your own error rate through peeking, multiple metrics, and holdout abuse
- [ ] 10. **Retrieval Evaluation** — Measure retrieval on its own with precision@k, recall@k, hit rate, MRR, MAP, and NDCG, and know which one your RAG design actually depends on
- [ ] 11. **Grounding, Citations, and Abstention** — Measure whether an answer is supported by retrieved context using claim decomposition, score citation quality, and test that the system refuses when the evidence isn't there
- [ ] 12. **Evaluating Multi-Step Pipelines** — Reason about compounding reliability, score every node as well as the whole graph, and localize an end-to-end failure to its decisive step with span scores and counterfactual replay
- [ ] 13. **Evaluating Agents** — Score trajectories and tool calls, grade on goal state rather than transcript, track efficiency and termination, and report pass^k reliability from reproducible simulated runs
- [ ] 14. **From Measurement to Improvement** — Run a ceiling analysis over your pipeline, size failure modes by expected value, and choose the improvement lever your evals point to instead of the one you feel like
- [ ] 15. **Automatic Optimization** — Explain and use DSPy's optimizers and GEPA's reflective evolution, handle credit assignment across modules, and defend against an optimizer that learns to game your judge
- [ ] 16. **Building the Harness** — Assemble dataset store, runner, scorers, result store, caching, budgets, and a versioned experiment identity, and choose tooling honestly from the 2026 landscape
- [ ] 17. **Evals in CI** — Decide what blocks a merge versus what only reports, manage flaky nondeterministic checks, tier your suites by cost, and grow a permanent regression suite from fixed bugs
- [ ] 18. **Production Evaluation and the Flywheel** — Trace live traffic, score sampled production runs reference-free, read implicit user feedback honestly, detect drift, and feed real failures back into the dataset
