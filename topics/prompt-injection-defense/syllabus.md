# Preventing Prompt Injection

## Goal
Practical defense patterns for AI agents. Student is actively building agents, already understands what prompt injection is, wants enough depth to be dangerous in 1-2 hours.

## Sections
- [ ] 1. Attack surface map — direct vs indirect injection, first-party vs third-party context, why agents are uniquely vulnerable
- [ ] 2. Input-layer defenses — detection heuristics, input sanitization, prompt/data separation, canary tokens
- [ ] 3. Architecture-level defenses — least privilege, sandboxed tool calls, dual-LLM patterns, system prompt hardening
- [ ] 4. Output & tool-call safety — output filtering, human-in-the-loop gates, confirmation patterns for destructive actions
- [ ] 5. Red-teaming your own agents — testing methodology, common bypass techniques, building a prompt injection test suite
