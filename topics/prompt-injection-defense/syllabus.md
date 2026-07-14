# Prompt Injection Security for LLM Applications

## Why
Prompt injection is a system-level security problem for applications that mix
untrusted natural language with private data, delegated identity, tools, memory,
and side effects. The goal is not to memorize attack strings, but to design,
audit, test, and operate LLM systems so a manipulated model cannot silently
inherit authority.

## Success Criteria
- Classify an attack by delivery path, objective, technique, persistence, and impact.
- Trace direct, indirect, multimodal, stored, and multi-stage injections through an application.
- Produce a trust-labelled data-flow diagram and source-to-sink threat model for an LLM system.
- Distinguish probabilistic risk reducers from deterministic authorization and isolation controls.
- Design a defense-in-depth architecture for RAG, memory, tools, MCP, browser, and coding agents.
- Build a realistic security evaluation that measures benign utility and attacker-goal success.
- Audit an application, explain residual risk, and make an evidence-backed release recommendation.
- Define monitoring, containment, recovery, and improvement steps for an injection incident.

## Constraints
- Practical and technical, with code and architecture rather than a purely conceptual survey.
- No fixed deadline; optimize for durable mastery.
- Attack exercises remain defensive, isolated, and use inert markers or simulated assets.

## Out of Scope
- Instructions for compromising real systems, stealing real data, or bypassing safeguards for abuse.
- Exhaustive coverage of general model safety, adversarial ML, or conventional application security.
- Claims that any model, prompt, detector, benchmark, or architecture is universally injection-proof.

## Sections
- [ ] 1. **Foundations and Taxonomy** — Explain the authority/provenance failure and classify direct, indirect, jailbreak, multimodal, multi-stage, and persistent attacks.
- [ ] 2. **Attack-Surface and Threat Modeling** — Map trust boundaries, context construction, assets, identities, capabilities, and source-to-sink attack paths.
- [ ] 3. **Injection Across Modern Architectures** — Analyze RAG, documents, email, memory, MCP/tools, browser, coding, multimodal, and multi-agent variants.
- [ ] 4. **Why Simple Defenses Fail** — Evaluate sanitization, delimiters, system prompts, classifiers, canaries, model judges, and model hardening without mistaking them for security boundaries.
- [ ] 5. **Secure Architecture by Design** — Apply provenance, permission-aware retrieval, control/data separation, least privilege, scoped credentials, egress limits, and sandboxing.
- [ ] 6. **Action and Output Safeguards** — Enforce schemas, authorization, policy mediation, parameter-bound approval, safe rendering, and constrained tool execution.
- [ ] 7. **Adversarial Evaluation and Red Teaming** — Define attacker goals, build stateful tests, preserve utility, include adaptive and repeated attacks, and set regression gates.
- [ ] 8. **Monitoring, Incident Response, and Design Review** — Instrument decisions and side effects, contain poisoned state, recover safely, and defend a release decision.
