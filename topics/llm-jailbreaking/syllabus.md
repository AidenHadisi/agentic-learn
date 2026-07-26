# LLM Jailbreaking

A red-team and research-oriented study of jailbreaking: bypassing an LLM's safety / refusal policy. Covers why alignment fails (competing objectives, mismatched generalization, shallow alignment), attack mechanisms from roleplay through optimization, multi-turn, and weight-space attacks, how to measure success honestly, defense layers under adaptive attackers, and how to run a real red-team program with industry tools.

## Success Criteria
- Can distinguish jailbreaks from prompt injection and pick the right threat model for a system
- Can explain *why* jailbreaks work using competing objectives, mismatched generalization, and shallow alignment — not just name attack prompts
- Can classify an unfamiliar attack by its dominant mechanism and predict which defenses it will and won't bypass
- Can design an evaluation that survives common ASR pitfalls (judge quality, empty compliance, single-turn-only suites, attempt budgets)
- Can map defense-in-depth layers and argue residual risk honestly to stakeholders
- Can choose among Garak, Promptfoo, PyRIT, HarmBench, and JailbreakBench for a given red-team goal

## Out of Scope
- Prompt-injection *application* architecture (Dual LLM, lethal trifecta hardening, RAG trust boundaries) — covered in `prompt-injection-defense`
- Deep alignment theory (scheming, scalable oversight, full RLHF derivation)
- Non-language adversarial ML (image classifiers, etc.) except where it directly motivates GCG-class attacks
- Ready-to-copy payloads aimed at real-world crime or CBRN assistance — examples stay at policy-benign levels (system-prompt extraction, copyright refusal, fictional policy bypass)

## Sections
- [ ] 1. **Policy Bypass, Not Injection** — Define jailbreaking vs prompt injection vs related threats, draw the threat model (assets, attacker access, win conditions), and explain why the distinction changes what you patch
- [ ] 2. **Why Alignment Is Soft** — Explain competing objectives, mismatched generalization, shallow (early-token) alignment, and latent capability — the mechanisms that make every later attack class possible
- [ ] 3. **Semantic & Representation Attacks** — Master roleplay/persuasion, encoding/obfuscation, and multilingual gaps as attacks on *which manifold* safety was trained on
- [ ] 4. **Search Attacks: Gradients & LLM Attackers** — Understand GCG-style discrete optimization, transfer from open weights, and PAIR/TAP-style LLM-as-attacker loops
- [ ] 5. **Context, Sessions & Test-Time Compute** — Analyze many-shot ICL, Crescendo-style multi-turn escalation, and Best-of-N / decoding-time attacks — the methods that dominate serious product risk
- [ ] 6. **Beyond Chat: Weights & Modalities** — Assess fine-tuning / LoRA / FaaS attacks and multimodal channel bypasses as different control planes from prompt-only jailbreaks
- [ ] 7. **Measuring Jailbreaks** — Design evaluations using HarmBench, JailbreakBench, StrongREJECT, and XSTest; diagnose ASR inflation and over-refusal blind spots
- [ ] 8. **Defense Layers Under Adaptive Attack** — Map training-time, inference-time, decoding, and architectural defenses; apply the "attacker moves second" lesson to product claims
- [ ] 9. **Red-Teaming Practice** — Run a threat-model → manual → automated → report loop; choose Garak vs Promptfoo vs PyRIT for breadth, CI, and depth
- [ ] 10. **Frontiers & Residual Risk** — Situate circuit breakers, deliberative alignment, Constitutional Classifiers++, and agentic risk; communicate what "prevention" can and cannot mean
