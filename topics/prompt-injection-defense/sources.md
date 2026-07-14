# Prompt Injection Security for LLM Applications Sources

Last reviewed: 2026-07-14

## Source Ledger
### [S001] LLM01:2025 Prompt Injection
- **Author / Publisher**: OWASP GenAI Security Project
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://genai.owasp.org/llmrisk/llm01-prompt-injection/
- **Type**: official
- **Trust**: Current practitioner consensus and canonical application-risk overview; not proof of control effectiveness.
- **Supports**: Direct and indirect injection, impacts, residual risk, and layered mitigations.
- **Used in**: Overview; planned Sections 1–7

### [S002] Not What You've Signed Up For
- **Author / Publisher**: Greshake et al.
- **Date**: 2023
- **Accessed**: 2026-07-14
- **URL**: https://doi.org/10.1145/3605764.3623985
- **Type**: paper
- **Trust**: Peer-reviewed foundational research demonstrating indirect prompt injection in integrated applications.
- **Supports**: Instruction/data ambiguity, remote delivery, exfiltration, tool manipulation, and propagation.
- **Used in**: Overview; planned Sections 1–3

### [S003] LLM Prompt Injection Prevention Cheat Sheet
- **Author / Publisher**: OWASP Cheat Sheet Series
- **Date**: Unknown
- **Accessed**: 2026-07-14
- **URL**: https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html
- **Type**: official
- **Trust**: Maintained practitioner guidance with implementation patterns; recommendations require local validation.
- **Supports**: Input handling, instruction separation, output validation, least privilege, and monitoring.
- **Used in**: Historical Sections 1–2; planned Sections 4–7

### [S004] Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations
- **Author / Publisher**: NIST
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://csrc.nist.gov/pubs/ai/100/2/e2025/final
- **Type**: standard
- **Trust**: Final government taxonomy synthesizing adversarial-ML literature; terminology will continue to evolve.
- **Supports**: Attacker capabilities, direct and indirect injection, jailbreak distinctions, objectives, and evaluation limits.
- **Used in**: Overview; planned Sections 1–3 and 7

### [S005] Mitigating Prompt Injection Attacks with a Layered Defense Strategy
- **Author / Publisher**: Google Security Blog
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://blog.google/security/mitigating-prompt-injection-attacks/
- **Type**: official
- **Trust**: First-party production account; implementation details and evaluations are selective.
- **Supports**: Classifiers, model hardening, system safeguards, and defense in depth.
- **Used in**: Historical Section 2; planned Sections 4–5

### [S006] Advancing Gemini's Security Safeguards
- **Author / Publisher**: Google DeepMind
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://deepmind.google/blog/advancing-geminis-security-safeguards/
- **Type**: official
- **Trust**: Primary vendor account whose internal evaluations are only partly reproducible.
- **Supports**: Automated red teaming, model hardening, and continuous layered mitigation.
- **Used in**: Historical Section 2; planned Sections 4 and 7

### [S007] Lessons from Defending Gemini Against Indirect Prompt Injections
- **Author / Publisher**: Google researchers
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://arxiv.org/html/2505.14534
- **Type**: paper
- **Trust**: Primary technical report with adaptive evaluation; vendor-specific and not fully independent.
- **Supports**: Spotlighting, warning defenses, adaptive attacks, and defense limitations.
- **Used in**: Historical Section 2; planned Sections 4 and 7

### [S008] How Vulnerable Are AI Agents to Indirect Prompt Injections?
- **Author / Publisher**: NIST CAISI researchers
- **Date**: 2026
- **Accessed**: 2026-07-14
- **URL**: https://arxiv.org/abs/2603.15714
- **Type**: paper
- **Trust**: Primary competition analysis with a large attempt budget; preprint conclusions remain context-specific.
- **Supports**: Agent vulnerability, repeated attacks, and large-scale evaluation methodology.
- **Used in**: Historical research; planned Section 7

### [S009] Data Exfiltration from Slack AI
- **Author / Publisher**: PromptArmor
- **Date**: 2024
- **Accessed**: 2026-07-14
- **URL**: https://promptarmor.substack.com/p/data-exfiltration-from-slack-ai-via
- **Type**: expert
- **Trust**: Original vulnerability disclosure from a security vendor; useful as a case study, not general evidence.
- **Supports**: Indirect injection and cross-context data exposure.
- **Used in**: Historical Section 1; planned Section 3

### [S010] EchoLeak
- **Author / Publisher**: Reddy and Gujral
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://arxiv.org/html/2509.10540
- **Type**: paper
- **Trust**: Primary case-study paper for CVE-2025-32711; production prevalence is not established.
- **Supports**: Zero-click indirect injection, exfiltration chains, and architectural lessons.
- **Used in**: Historical Section 1; planned Sections 2–3

### [S011] Indirect Prompt Injection in the Wild
- **Author / Publisher**: Cloud Security Alliance
- **Date**: 2026
- **Accessed**: 2026-07-14
- **URL**: https://labs.cloudsecurityalliance.org/
- **Type**: expert
- **Trust**: Recognized security organization, but this broad landing page is not claim-specific.
- **Supports**: General industry context only.
- **Used in**: Retained for source-ID stability

### [S012] LLM Prompt Injection: Attacks and Defenses
- **Author / Publisher**: FutureAGI
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://futureagi.com/blog/llm-prompt-injection-2025/
- **Type**: expert
- **Trust**: Vendor secondary source; not suitable as sole support for technical claims.
- **Supports**: Supporting examples and practitioner terminology.
- **Used in**: Retained for source-ID stability

### [S013] LLM Security: Prompt Injection Defense Production Guide
- **Author / Publisher**: Introl
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://introl.com/blog/llm-security-prompt-injection-defense-production-guide-2025
- **Type**: expert
- **Trust**: Vendor implementation guide; performance and operational claims need independent validation.
- **Supports**: Layer ordering and implementation examples.
- **Used in**: Historical Section 2

### [S014] PromptGuard: Five-Layer Defense
- **Author / Publisher**: SolidNumber
- **Date**: Unknown
- **Accessed**: 2026-07-14
- **URL**: https://solidnumber.com/research/promptguard
- **Type**: expert
- **Trust**: Practitioner implementation write-up without broad independent evaluation.
- **Supports**: Normalization, pattern checks, and layered detection examples.
- **Used in**: Historical Section 2

### [S015] Rebuff
- **Author / Publisher**: Protect AI
- **Date**: Unknown
- **Accessed**: 2026-07-14
- **URL**: https://github.com/protectai/rebuff
- **Type**: community
- **Trust**: Open-source implementation whose code can be inspected; maintenance and effectiveness may vary.
- **Supports**: Heuristics, model analysis, and canary implementation patterns.
- **Used in**: Historical Section 2; possible Section 4 example

### [S016] Jailbreak Detection Heuristics
- **Author / Publisher**: NVIDIA NeMo Guardrails
- **Date**: Unknown
- **Accessed**: 2026-07-14
- **URL**: https://docs.nvidia.com/nemo/guardrails/0.12.0/user-guides/jailbreak-detection-heuristics/README.html
- **Type**: official
- **Trust**: Versioned official product documentation; heuristics have narrow threat coverage.
- **Supports**: Length and perplexity heuristics and their limits.
- **Used in**: Historical Section 2; planned Section 4

### [S017] Hybrid LLM Jailbreak Detector
- **Author / Publisher**: Priyrajsinh
- **Date**: Unknown
- **Accessed**: 2026-07-14
- **URL**: https://github.com/Priyrajsinh/Hybrid-LLM-Jailbreak-Detector
- **Type**: community
- **Trust**: Experimental open-source implementation; reported metrics are not independently verified.
- **Supports**: Example layered detector architecture.
- **Used in**: Historical Section 2

### [S018] Perplexity-Based Attack Detection
- **Author / Publisher**: LLMTrace
- **Date**: Unknown
- **Accessed**: 2026-07-14
- **URL**: https://docs.llmtrace.io/research/perplexity-based-attack-detection/
- **Type**: expert
- **Trust**: Vendor research note with limited independent evidence.
- **Supports**: Perplexity-based detection and narrow attack coverage.
- **Used in**: Historical Section 2

### [S019] Why LLM-as-a-Judge Fails at Prompt Injection Defense
- **Author / Publisher**: Lakera
- **Date**: Unknown
- **Accessed**: 2026-07-14
- **URL**: https://www.lakera.ai/blog/stop-letting-models-grade-their-own-homework-why-llm-as-a-judge-fails-at-prompt-injection-defense
- **Type**: expert
- **Trust**: Security-vendor analysis; useful for hypotheses that should be grounded in primary judge-attack research.
- **Supports**: Risks of exposing judge models to adversarial text.
- **Used in**: Historical overview; planned Sections 4 and 7

### [S020] The Attacker Moves Second
- **Author / Publisher**: Simon Willison
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://simonwillison.net/2025/Nov/2/new-prompt-injection-papers/
- **Type**: expert
- **Trust**: Recognized expert summary linking primary research; not a replacement for the cited papers.
- **Supports**: Adaptive attacks and evaluation limitations.
- **Used in**: Historical Section 2; planned Section 7

### [S021] Instruction Isolation Best Practices
- **Author / Publisher**: Prompt Injection Prevention
- **Date**: Unknown
- **Accessed**: 2026-07-14
- **URL**: https://www.promptinjectionprevention.com/kb/instruction-isolation-best-practices.php
- **Type**: expert
- **Trust**: Practitioner secondary guidance without proof of robustness.
- **Supports**: Role separation and randomized delimiters.
- **Used in**: Historical Section 2

### [S022] Delimiters Won't Save You
- **Author / Publisher**: Simon Willison
- **Date**: 2023
- **Accessed**: 2026-07-14
- **URL**: https://simonwillison.net/2023/May/11/delimiters-wont-save-you/
- **Type**: expert
- **Trust**: Recognized expert analysis with reproducible examples; not a formal security proof.
- **Supports**: Limits of text delimiters as security boundaries.
- **Used in**: Overview; historical Section 2; planned Section 4

### [S023] Syntactically Quarantining Input Data
- **Author / Publisher**: BetterPrompt
- **Date**: Unknown
- **Accessed**: 2026-07-14
- **URL**: https://betterprompt.com/prompt/input-data
- **Type**: expert
- **Trust**: Practitioner guidance suitable for examples, not robustness claims.
- **Supports**: XML-style separation examples.
- **Used in**: Historical Section 2

### [S024] How LLMs Learn Roles and Get Exploited
- **Author / Publisher**: HiddenLayer
- **Date**: Unknown
- **Accessed**: 2026-07-14
- **URL**: https://www.hiddenlayer.com/research/inside-the-prompt-how-llms-learn-roles-follow-instructions-and-get-exploited
- **Type**: expert
- **Trust**: Security-vendor research useful for background; primary model studies are preferable.
- **Supports**: Role learning and instruction-hierarchy background.
- **Used in**: Historical Section 2

### [S025] Prompt Injection Detection at Scale
- **Author / Publisher**: Tianpan
- **Date**: 2026
- **Accessed**: 2026-07-14
- **URL**: https://tianpan.co/blog/2026-04-17-prompt-injection-detection-at-scale
- **Type**: expert
- **Trust**: Practitioner account whose operational claims require independent validation.
- **Supports**: Supporting production detection design examples.
- **Used in**: Historical Section 2

### [S026] Canary Tokens for Prompt Injection
- **Author / Publisher**: Prompt Injection Prevention
- **Date**: Unknown
- **Accessed**: 2026-07-14
- **URL**: https://www.promptinjectionprevention.com/kb/canary-tokens-for-prompt-injection.php
- **Type**: expert
- **Trust**: Practitioner secondary source without comprehensive evaluation.
- **Supports**: Canary patterns and limitations.
- **Used in**: Historical Section 2; planned Section 4

### [S027] Canary Token Leak Detection
- **Author / Publisher**: Yohann Sidot
- **Date**: Unknown
- **Accessed**: 2026-07-14
- **URL**: https://dev.to/yohannsidot/how-canary-tokens-detect-system-prompt-leaks-in-real-time-74p
- **Type**: community
- **Trust**: Community implementation article suitable only as a concrete example.
- **Supports**: System-prompt leakage canary implementation.
- **Used in**: Historical Section 2

### [S028] Vigil LLM Canary Tokens
- **Author / Publisher**: deadbits/vigil-llm
- **Date**: Unknown
- **Accessed**: 2026-07-14
- **URL**: https://github.com/deadbits/vigil-llm/blob/8afbe18/docs/canarytokens.md
- **Type**: community
- **Trust**: Version-pinned open-source documentation; behavior is inspectable but not broadly validated.
- **Supports**: Prompt-leakage and goal-hijacking canary modes.
- **Used in**: Historical Section 2

### [S029] CanaryRAG
- **Author / Publisher**: CanaryRAG authors
- **Date**: 2026
- **Accessed**: 2026-07-14
- **URL**: https://arxiv.org/html/2604.10717
- **Type**: paper
- **Trust**: Timely primary preprint; not yet independently replicated.
- **Supports**: RAG extraction detection research.
- **Used in**: Historical Section 2; possible Section 4

### [S030] Prompt Injection: OWASP's Top AI Threat
- **Author / Publisher**: Securance
- **Date**: 2026
- **Accessed**: 2026-07-14
- **URL**: https://www.securance.com/blog/prompt-injection-the-owasp-1-ai-threat-in-2026/
- **Type**: expert
- **Trust**: Security-consultancy overview; use only for supporting context.
- **Supports**: General industry context.
- **Used in**: Retained for source-ID stability

### [S031] AI Risk Management Framework Core
- **Author / Publisher**: NIST
- **Date**: 2023
- **Accessed**: 2026-07-14
- **URL**: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/
- **Type**: official
- **Trust**: Authoritative risk framework; intentionally non-prescriptive.
- **Supports**: Govern, Map, Measure, and Manage relationships and risk-context mapping.
- **Used in**: Planned Sections 2, 7, and 8

### [S032] Threat Modeling Cheat Sheet
- **Author / Publisher**: OWASP Cheat Sheet Series
- **Date**: Unknown
- **Accessed**: 2026-07-14
- **URL**: https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html
- **Type**: official
- **Trust**: Maintained application-security guidance from a recognized practitioner organization.
- **Supports**: Data-flow diagrams, trust boundaries, threats, mitigations, review, and testable requirements.
- **Used in**: Planned Sections 2 and 8

### [S033] OWASP Top 10 for Agentic Applications for 2026
- **Author / Publisher**: OWASP GenAI Security Project
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- **Type**: official
- **Trust**: Current community taxonomy; useful for coverage but not evidence of mitigation efficacy.
- **Supports**: Goal hijacking, tool misuse, identity abuse, memory poisoning, and multi-agent risks.
- **Used in**: Planned Sections 1–3 and 8

### [S034] Artificial Intelligence Risk Management Framework: Generative AI Profile
- **Author / Publisher**: NIST
- **Date**: 2024
- **Accessed**: 2026-07-14
- **URL**: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence
- **Type**: official
- **Trust**: Authoritative cross-sector GenAI risk-management profile; deliberately non-prescriptive.
- **Supports**: Inventories, provenance, red teaming, monitoring, incident roles, and after-action review.
- **Used in**: Planned Sections 2, 7, and 8

### [S035] Guidelines for Secure AI System Development
- **Author / Publisher**: NCSC, CISA, and international partners
- **Date**: 2023
- **Accessed**: 2026-07-14
- **URL**: https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development
- **Type**: official
- **Trust**: Multinational government guidance spanning the AI lifecycle.
- **Supports**: Threat modeling, least privilege, pre-release evaluation, logging, and incident preparation.
- **Used in**: Planned Sections 2, 5, 7, and 8

### [S036] Secure Software Development Practices for Generative AI and Dual-Use Foundation Models
- **Author / Publisher**: NIST
- **Date**: 2024
- **Accessed**: 2026-07-14
- **URL**: https://csrc.nist.gov/pubs/sp/800/218/a/final
- **Type**: standard
- **Trust**: Official community profile extending NIST's Secure Software Development Framework.
- **Supports**: Security requirements, attack-surface modeling, design review, provenance, and verification.
- **Used in**: Planned Sections 2, 5, 7, and 8

### [S037] AgentDojo
- **Author / Publisher**: Debenedetti et al.
- **Date**: 2024
- **Accessed**: 2026-07-14
- **URL**: https://proceedings.neurips.cc/paper_files/paper/2024/hash/97091a5177d8dc64b1da8bf3e1f6fb54-Abstract-Datasets_and_Benchmarks_Track.html
- **Type**: paper
- **Trust**: Peer-reviewed stateful benchmark with deterministic task evaluation; scenarios are not exhaustive.
- **Supports**: Joint utility/security measurement, realistic tool environments, and adaptive evaluation design.
- **Used in**: Overview; planned Sections 3 and 7

### [S038] InjecAgent
- **Author / Publisher**: Zhan et al.
- **Date**: 2024
- **Accessed**: 2026-07-14
- **URL**: https://aclanthology.org/2024.findings-acl.624/
- **Type**: paper
- **Trust**: Peer-reviewed benchmark across 30 agents and 1,054 cases.
- **Supports**: Tool-integrated attack surfaces, direct harm, data exfiltration, and agent evaluation.
- **Used in**: Overview; planned Sections 2, 3, and 7

### [S039] Defeating Prompt Injections by Design
- **Author / Publisher**: Debenedetti et al.
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://arxiv.org/abs/2503.18813
- **Type**: paper
- **Trust**: Primary research with released code and explicit assumptions; still a preprint with scoped guarantees.
- **Supports**: CaMeL, control/data-flow separation, capabilities, policy enforcement, and utility trade-offs.
- **Used in**: Overview; planned Sections 4–6

### [S040] Prompt Injection Is Not SQL Injection (It May Be Worse)
- **Author / Publisher**: UK National Cyber Security Centre
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection
- **Type**: expert
- **Trust**: National cybersecurity authority guidance; inherent unmitigability remains informed judgment, not a theorem.
- **Supports**: Confused-deputy framing, absent deterministic code/data separation, and residual-risk engineering.
- **Used in**: Overview; planned Sections 1, 4, and 5

### [S041] OpenAI Model Spec
- **Author / Publisher**: OpenAI
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://model-spec.openai.com/2025-12-18.html
- **Type**: official
- **Trust**: Primary specification of one provider's intended behavior; not a universal standard or production guarantee.
- **Supports**: Authority ordering and no-authority treatment of quoted data, files, multimodal input, and tool output.
- **Used in**: Planned Sections 1 and 4

### [S042] Strengthening AI Agent Hijacking Evaluations
- **Author / Publisher**: NIST CAISI
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://www.nist.gov/news-events/news/2025/01/technical-blog-strengthening-ai-agent-hijacking-evaluations
- **Type**: official
- **Trust**: Government evaluation report with disclosed scenarios and measurements.
- **Supports**: Trusted-instruction boundaries, adaptive and repeated testing, and consequential attack outcomes.
- **Used in**: Overview; planned Sections 2, 3, and 7

### [S043] Model Context Protocol Specification, 2025-11-25
- **Author / Publisher**: Model Context Protocol Project
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://modelcontextprotocol.io/specification/2025-11-25
- **Type**: standard
- **Trust**: Authoritative protocol specification; host and server compliance does not establish application security.
- **Supports**: MCP architecture, untrusted metadata, arbitrary access paths, consent, and enforcement limits.
- **Used in**: Overview; planned Sections 2–3 and 5–6

### [S044] Designing AI Agents to Resist Prompt Injection
- **Author / Publisher**: OpenAI
- **Date**: 2026
- **Accessed**: 2026-07-14
- **URL**: https://openai.com/index/designing-agents-to-resist-prompt-injection/
- **Type**: official
- **Trust**: Current production guidance informed by internal experience; evidence is partly proprietary.
- **Supports**: Social-engineering framing, source-to-sink analysis, deterministic controls, and constrained impact.
- **Used in**: Overview; planned Sections 2 and 4–6

### [S045] ETSI EN 304 223 V2.1.1: Baseline Cyber Security Requirements for AI Models and Systems
- **Author / Publisher**: ETSI
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://www.etsi.org/deliver/etsi_en/304200_304299/304223/02.01.01_60/en_304223v020101p.pdf
- **Type**: standard
- **Trust**: Formal European lifecycle standard; requirements are high-level and do not prove injection resistance.
- **Supports**: Threat modeling, sanitization, least privilege, independent testing, monitoring, and residual risk.
- **Used in**: Overview; planned Sections 4, 7, and 8

### [S046] PIArena: A Platform for Prompt Injection Evaluation
- **Author / Publisher**: Geng et al.
- **Date**: 2026
- **Accessed**: 2026-07-14
- **URL**: https://aclanthology.org/2026.acl-long.1533/
- **Type**: paper
- **Trust**: Peer-reviewed current evaluation across attacks, defenses, tasks, and benchmarks.
- **Supports**: Cross-task generalization limits, adaptive bypasses, task alignment, and comparison limits.
- **Used in**: Overview; planned Sections 4 and 7

### [S047] MITRE ATLAS Data
- **Author / Publisher**: MITRE
- **Date**: 2026
- **Accessed**: 2026-07-14
- **URL**: https://github.com/mitre-atlas/atlas-data
- **Type**: standard
- **Trust**: Official versioned source for the living ATLAS knowledge base.
- **Supports**: Prompt-injection, direct, indirect, triggered, and jailbreak technique identifiers.
- **Used in**: Overview; planned Sections 1–3

### [S048] Adaptive Attacks Break Defenses Against Indirect Prompt Injection Attacks on LLM Agents
- **Author / Publisher**: Zhan et al.
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://aclanthology.org/2025.findings-naacl.395/
- **Type**: paper
- **Trust**: Peer-reviewed adaptive evaluation across selected agents and defenses.
- **Supports**: Bypass of in-band defenses and the need for defense-aware testing.
- **Used in**: Overview; planned Sections 4 and 7

### [S049] Incident Response Recommendations and Considerations for Cybersecurity Risk Management
- **Author / Publisher**: NIST
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://doi.org/10.6028/nist.sp.800-61r3
- **Type**: standard
- **Trust**: Current authoritative NIST incident-response guidance.
- **Supports**: Preparation, detection, containment, response, recovery, communication, and improvement.
- **Used in**: Planned Section 8

### [S050] CVE-2025-32711
- **Author / Publisher**: NIST National Vulnerability Database
- **Date**: 2025
- **Accessed**: 2026-07-14
- **URL**: https://nvd.nist.gov/vuln/detail/CVE-2025-32711
- **Type**: official
- **Trust**: Canonical government vulnerability record incorporating the vendor advisory.
- **Supports**: Microsoft 365 Copilot AI command injection, interaction requirements, and confidentiality impact.
- **Used in**: Overview; planned Sections 2–3

## Conflicts and Gaps
- Terminology differs across OWASP, NIST, and MITRE; the course will record delivery path, violated principal, objective, persistence, and impact instead of forcing one label.
- Strong static results for delimiters, classifiers, and model hardening do not transfer automatically to adaptive or distribution-shift settings.
- Architectural guarantees depend on correct provenance, complete mediation, policy quality, and explicit threat-model assumptions.
- Independent evidence remains thinner for long-horizon, multimodal, persistent-memory, and multi-agent systems than for text-only tool agents.
- Benchmark attack-success rates do not estimate field prevalence or expected loss; deployment decisions require local exposure, impact, and risk tolerance.
- Preserved sources [S011]–[S030] include several secondary or vendor references from earlier lessons; future claims should prefer the stronger primary and authoritative sources added later.
