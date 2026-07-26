# Sources — LLM Jailbreaking

Everything read while researching this topic. Append as you go; dedupe by URL.

- **AI 100-2e2025 — Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations** — NIST, 2025 · https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-2e2025.pdf
  Official NIST taxonomy — authoritative terminology for adversarial ML; use to anchor vocabulary, not as a jailbreak how-to.
  Used for: §1
- **Fine-tuning Aligned Language Models Compromises Safety, Even When Users Do Not Intend To!** — Qi, X. et al., 2024 · https://arxiv.org/abs/2310.03693
  arXiv preprint — shows post-tune refusal collapse even without malicious intent; good evidence for the "alignment after fine-tune needs its own gate" claim.
  Used for: §1
- **JailbreakBench: An Open Robustness Benchmark for Jailbreaking Large Language Models** — Chao, P. et al., 2024 · https://arxiv.org/abs/2404.01318
  arXiv preprint — open jailbreak robustness benchmark; useful for measuring refusal strength, not for injection architecture.
  Used for: §1
- **Jailbroken: How Does LLM Safety Training Fail?** — Wei, A. et al., 2023 · https://arxiv.org/abs/2307.02483
  arXiv preprint — competing-objectives account of why safety training fails; primary research behind soft-policy / refusal-bypass framing.
  Used for: §1
- **LLM01:2025 — Prompt Injection** — OWASP, 2025 · https://genai.owasp.org/llmrisk/llm01-prompt-injection/
  Industry risk catalog — lumps jailbreaking under prompt injection; useful for filing labels, but follow Willison's layer test for engineering patches.
  Used for: §1
- **Model Spec** — OpenAI, 2025 · https://model-spec.openai.com/
  Official vendor policy spec — defines intended model behavior and refusal boundaries; good for "what policy even is" before discussing bypass.
  Used for: §1
- **Prompt injection and jailbreaking are not the same thing** — Willison, S., 2024 · https://simonwillison.net/2024/Mar/5/prompt-injection-jailbreaking/
  Practitioner blog — the layer/patch-locus distinction this course is built on; primary framing source, worth reading directly.
  Used for: §1
- **The lethal trifecta for AI agents** — Willison, S., 2025 · https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
  Practitioner blog — private data + untrusted content + external comms as the agent exfil pattern; use for injection-shaped risks, not pure chat jailbreaks.
  Used for: §1
