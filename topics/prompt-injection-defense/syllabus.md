# Prompt Injection Defense

A comprehensive study of prompt injection — the #1 LLM security risk (OWASP LLM01:2025). Covers the full attack taxonomy, every known defense approach, production architecture patterns, application-specific hardening (RAG, agents, chatbots), red-teaming methodology, and the fundamental limits of defense.

## Success Criteria
- Can threat-model an LLM application for injection surfaces (sources → sinks)
- Can explain why prompt injection is structurally hard and what "unsolvable" means practically
- Can identify direct, indirect, multimodal, and tool-based injection vectors in a real system
- Can design defense-in-depth architecture using established patterns (Dual LLM, CaMeL, Rule of Two)
- Can harden RAG, agent, and chatbot systems against injection with concrete techniques
- Can red-team an LLM application using industry tools (Promptfoo, Garak, PyRIT)

## Out of Scope
- General LLM alignment / RLHF theory (covered only where it intersects injection defense)
- Adversarial ML on non-language models (image classifiers, etc.)
- Full OWASP LLM Top 10 coverage beyond prompt injection interactions

## Sections
- [x] 1. **The Confused Deputy** — Understand why LLMs can't separate instructions from data, the lethal trifecta, and how prompt injection maps to OWASP LLM01:2025
- [ ] 2. **Attack Taxonomy: Direct & Indirect** — Master the full spectrum of direct injection (jailbreaks, role-play, payload splitting) and indirect injection (RAG poisoning, web content, email, tool outputs) with real incident analysis
- [ ] 3. **Advanced Attack Techniques** — Study adversarial suffixes (GCG), automated attack generation (TAP, PAIR), many-shot jailbreaking, Crescendo, encoding/obfuscation, multimodal injection, and tool-calling hijacks
- [ ] 4. **Input & Prompt-Level Defenses** — Apply input filtering, sanitization, classifiers, prompt hardening, delimiters, spotlighting, instruction hierarchy, and understand their limits under adaptive attack
- [ ] 5. **Architecture-Level Defenses** — Design systems using Dual LLM, CaMeL, Plan-Then-Execute, Rule of Two, least privilege, capability tracking, and HITL patterns
- [ ] 6. **Securing RAG, Agents & Chatbots** — Apply defense patterns to the three major LLM application types with hands-on hardening exercises
- [ ] 7. **Detection, Monitoring & Red Teaming** — Set up canaries, guardrails, output monitoring, and continuous red-teaming in CI using Promptfoo, Garak, and PyRIT
- [ ] 8. **Limits & Governance** — Confront the "unsolvable" debate, residual risk acceptance, and how to communicate LLM security posture to stakeholders
