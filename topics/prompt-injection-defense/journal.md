# Learning Journal — Prompt Injection Defense

## Student Profile
- **Background**: Advanced — has deployed production LLM systems and dealt with security concerns
- **Goal**: Comprehensive understanding of prompt injection attack and defense landscape
- **Constraints**: None stated
- **Depth**: Full theory + practice with hands-on exercises across all LLM application types (RAG, agents, chatbots)

## Established Knowledge
- None yet assessed

## Log
### 2025-07-22 — Discovery
- **Covered**: Topic scoping, student profiling, research synthesis
- **Evidence**: Student self-assessed as advanced with production LLM security experience
- **Next**: Begin Section 1 — The Confused Deputy

### 2025-07-22 — Section 1: The Confused Deputy
- **Covered**: Hardy's confused deputy, LLMs as confused deputies, why parameterized prompts don't exist (SQL injection contrast), lethal trifecta (Willison 2025), EchoLeak case study, OWASP LLM01:2025 + interactions with LLM05/06/07, OpenAI "phishing for AIs" framing, historical timeline (Goodside → Greshake → trifecta)
- **Evidence**: Student correctly identified authority misuse as the core deputy problem, understood XML delimiters are probabilistic not structural, chose HITL as cheapest trifecta leg to break in the code review bot scenario — all answers immediate and confident
- **Next**: Section 2 — Attack Taxonomy: Direct & Indirect

## Established Knowledge
- **Confused deputy**: Solid grasp — immediately identified authority misuse as the distinguishing factor
- **Code/data conflation**: Understands that LLM delimiter defenses are probabilistic, not structural like SQL parameterization
- **Lethal trifecta**: Can apply to novel scenarios — correctly identified HITL on outbound comms as cheapest mitigation

## Weak Spots
- None identified yet
