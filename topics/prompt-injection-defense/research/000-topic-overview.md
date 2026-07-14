# Prompt Injection Security for LLM Applications — Topic Research

Last reviewed: 2026-07-14

## Mission
Enable an experienced LLM application builder to design, audit, defensively
red-team, and operate systems whose security does not depend on the model
perfectly recognizing malicious natural language.

## Foundations
- Prompt injection occurs when attacker-controlled or accidental content is
  interpreted as instructions and redirects an LLM application from its intended
  objective. Direct and indirect injection differ by delivery path, while
  jailbreak describes a safety-bypass objective that can overlap either path.
  [S001] [S004]
- A useful taxonomy records delivery path, objective, technique, persistence,
  affected asset, and impact independently; one payload can be indirect,
  multimodal, persistent, and tool-manipulating at the same time. [S004] [S047]
- The core engineering problem is provenance and authority: instructions and
  data share a probabilistic model context without a deterministic boundary
  equivalent to parameterized SQL. [S002] [S040]
- Injection becomes a high-impact system exploit when model influence reaches
  private data, delegated identity, privileged tools, persistent state, or an
  exfiltration channel. [S001] [S038] [S050]
- No current prompt, delimiter, classifier, model-hardening method, or static
  benchmark provides universal prevention. Production security therefore
  combines model robustness with deterministic authorization, isolation,
  least privilege, and adaptive evaluation. [S001] [S039] [S046] [S048]

## Prerequisites
- LLM message roles, RAG, tool calling, agent workflows, and API integration:
  established by the student's disclosed experience.
- Basic application-security concepts such as authorization, least privilege,
  trust boundaries, data-flow diagrams, logging, and incident response: useful,
  but not yet established in the journal.

## Learning Sequence
1. **Foundations and Taxonomy** — establish shared language without treating overlapping variants as mutually exclusive.
2. **Attack-Surface and Threat Modeling** — map provenance, authority, assets, and sinks before selecting controls.
3. **Injection Across Modern Architectures** — transfer the model to RAG, memory, tools, MCP, browser, coding, multimodal, and multi-agent systems.
4. **Why Simple Defenses Fail** — learn the exact value and limit of in-band and probabilistic controls.
5. **Secure Architecture by Design** — constrain data flow, identity, authority, egress, and execution outside the model.
6. **Action and Output Safeguards** — mediate concrete side effects with schemas, policy, authorization, and approval.
7. **Adversarial Evaluation and Red Teaming** — test attacker goals and benign utility in realistic, adaptive environments.
8. **Monitoring, Incident Response, and Design Review** — operate the controls and justify residual-risk decisions.

## Applications
- Threat-model a RAG assistant whose corpus includes user-authored documents.
- Audit an MCP or tool-using agent for metadata poisoning, overbroad credentials,
  unauthorized side effects, and exfiltration paths.
- Redesign a browser or coding agent so untrusted content cannot independently
  authorize filesystem, network, repository, or account actions.
- Build a stateful regression harness that checks both legitimate task completion
  and attacker-goal failure across model and prompt changes.
- Conduct a release review and incident tabletop using retained provenance,
  authorization, approval, and side-effect traces.

## Misconceptions
- **Jailbreak and prompt injection are synonyms** — jailbreak describes an
  objective; direct, indirect, and triggered injection describe delivery paths,
  and the taxonomies overlap rather than align perfectly. [S001] [S004]
- **RAG or a trusted connector makes retrieved content trustworthy** — retrieval
  changes how content arrives, not who authored it or what authority it should
  receive. [S001] [S002] [S043]
- **Delimiters and sanitization create a code/data boundary** — they provide
  useful cues and remove narrow syntax, but arbitrary natural-language meaning
  remains model-readable and adaptive attacks can bypass in-band defenses.
  [S022] [S040] [S048]
- **A system prompt or LLM judge can enforce authorization** — model controls can
  reduce risk, but security gates must use deterministic state, identity, and
  policy checks outside adversarial model context. [S039] [S044]
- **One successful refusal proves safety** — probabilistic systems require
  repeated, adaptive, threat-model-specific tests that also measure benign
  utility. [S037] [S042] [S046]

## Assessment Strategy
- Classify unseen attacks on independent taxonomy axes and justify the labels.
- Produce a trust-labelled data-flow diagram and trace attacker-controlled
  values to sensitive sources and consequential sinks.
- Compare controls by assumptions, exact guarantee, blind spots, and utility cost.
- Redesign an unsafe reference agent and explain which attack paths each change
  prevents, detects, or merely makes harder.
- Build or specify a stateful evaluation with benign goals, attacker goals,
  adaptive attempts, deterministic assertions, and regression criteria.
- Complete an evidence-backed design review and incident-response tabletop.

## Conflicts and Gaps
- OWASP groups jailbreaking under prompt injection, while NIST and MITRE use more
  distinct categories. Record delivery, violated principal, objective, and
  impact instead of relying on one label. [S001] [S004] [S047]
- Architectural defenses such as CaMeL offer conditional guarantees under
  explicit provenance and information-flow assumptions, not universal semantic
  safety. Independent adaptive evaluation remains limited. [S039]
- Benchmark attack-success rates are not directly comparable across models,
  tasks, tools, permissions, attack budgets, or evaluators. [S037] [S046]
- Public evidence is stronger for exploitability than for real-world attack
  prevalence; local exposure and impact still determine deployment risk.
  [S004] [S045]
