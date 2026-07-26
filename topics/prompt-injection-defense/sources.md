# Sources — Prompt Injection Defense

Everything read while researching this topic. Append as you go; dedupe by URL.

- **ChatGPT Cross-Plugin Request Forgery and Prompt Injection** — Rehberger, J., 2023 · https://embracethered.com/blog/posts/2023/chatgpt-cross-plugin-request-forgery-and-prompt-injection./
  Practitioner security blog — early plugin/confused-deputy write-up; URL has a malformed trailing `./` and is likely broken — do not rely on this link until verified.
  Used for: §1
- **Designing AI agents to resist prompt injection** — OpenAI, 2026 · https://openai.com/index/designing-agents-to-resist-prompt-injection/
  Vendor engineering post — OpenAI's agent-hardening guidance; useful for their recommended patterns, not independent threat research.
  Used for: §1
- **EchoLeak: Zero-click exfiltration via Microsoft 365 Copilot (CVE-2025-32711)** — Aim Labs, 2025 · https://arxiv.org/abs/2509.10540
  arXiv preprint — primary technical write-up of EchoLeak / CVE-2025-32711; best source for the zero-click Copilot exfil mechanism.
  Used for: §1
- **LLM01:2025 — Prompt Injection** — OWASP, 2025 · https://genai.owasp.org/llmrisk/llm01-prompt-injection/
  Industry risk catalog — standard naming and risk framing for prompt injection; good for shared vocabulary, light on defenses that actually hold.
  Used for: §1
- **Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection** — Greshake, K. et al., 2023 · https://arxiv.org/abs/2302.12173
  arXiv preprint — foundational indirect-prompt-injection paper; primary academic source for the attack class.
  Used for: §1, §2
- **Prompt injection attacks against GPT-3** — Willison, S., 2022 · https://simonwillison.net/2022/Sep/12/prompt-injection/
  Practitioner blog — coined the prompt-injection framing and SQL analogy; primary source for the concept's origin story.
  Used for: §1, §2
- **Prompt Injection: A Critical Vulnerability in the GPT-3 Transformer** — Preamble, 2022 · https://www.preamble.com/prompt-injection-a-critical-vulnerability-in-the-gpt-3-transformer-and-how-we-can-begin-to-solve-it
  Vendor marketing page — early public naming of the bug with a product-adjacent pitch; use for chronology, not for technical depth or mitigation advice.
  Used for: §1
- **The Confused Deputy: (or why capabilities might have been invented)** — Hardy, N., 1988 · https://css.csail.mit.edu/6.858/2015/readings/confused-deputy.html
  Classic security paper — Hardy's original 1988 confused-deputy framing; the primary source for the authority-without-identity metaphor, worth reading directly.
  Used for: §1
- **The Dual LLM pattern for building AI assistants that can resist prompt injection** — Willison, S., 2023 · https://simonwillison.net/2023/Apr/25/dual-llm-pattern/
  Practitioner blog — architectural Dual-LLM defense pattern; good for design intuition, not a proven silver bullet.
  Used for: §1
- **The lethal trifecta for AI agents: private data, untrusted content, and external communication** — Willison, S., 2025 · https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
  Practitioner blog — clearest operational risk model for agent exfiltration; primary framing for the trifecta claim.
  Used for: §1
- **Understanding prompt injections** — OpenAI, 2025 · https://openai.com/index/prompt-injections/
  Vendor explainer — OpenAI's "social engineering / phishing for AI" reframing; useful for their threat model language.
  Used for: §1
- **Bing Chat system prompt extraction** — Liu, K., 2023 · https://arstechnica.com/information-technology/2023/02/ai-powered-bing-chat-spills-its-secrets-via-prompt-injection-attack/
  News article — chronology of the Bing Chat system-prompt leak; appropriate for the incident, weak as taxonomy evidence.
  Used for: §2
- **Breaking down EchoLeak (CVE-2025-32711)** — Aim Labs, 2025 · https://www.catonetworks.com/blog/breaking-down-echoleak/
  Vendor security blog — accessible EchoLeak breakdown including classifier bypass via natural language; good companion to the arXiv paper, not a substitute.
  Used for: §2
- **CamoLeak: Critical GitHub Copilot vulnerability leaks private source code** — Legit Security, 2025 · https://www.legitsecurity.com/blog/camoleak-critical-github-copilot-vulnerability-leaks-private-source-code
  Vendor security blog — CamoLeak incident write-up; use for the Copilot exfil case, not as peer-reviewed analysis.
  Used for: §2
- **ChatGPT Plugin Exploit: Data Exfiltration via Markdown Injection** — Rehberger, J., 2023 · https://embracethered.com/blog/posts/2023/chatgpt-webpilot-data-exfil-via-markdown-injection/
  Practitioner security blog — markdown-image exfil via plugins; strong for that specific channel, typical security-blog depth.
  Used for: §2
- **Chevrolet dealership chatbot exploit** — Bakke, C., 2023 · https://tech.yahoo.com/ai/chatgpt/articles/software-engineer-tricks-car-dealership-162737145.html
  News article — Chevy dealership chatbot incident chronology; fine for the anecdote, weak for attack taxonomy.
  Used for: §2
- **Data Exfiltration from Slack AI via Indirect Prompt Injection** — PromptArmor, 2024 · https://promptarmor.substack.com/p/data-exfiltration-from-slack-ai-via
  Security newsletter — Slack AI indirect-injection case study; useful incident detail, not a primary research source.
  Used for: §2
- **Exploiting Programmatic Behavior of LLMs: Dual-Use Through Standard Security Attacks** — Kang, D. et al., 2023 · https://arxiv.org/abs/2302.05733
  arXiv preprint — maps classic security attacks onto LLM behavior; one of the stronger research cites in an otherwise blog-heavy taxonomy lesson.
  Used for: §2
- **GitHub MCP Vulnerability: Exploiting tool poisoning for indirect prompt injection** — Invariant Labs, 2025 · https://invariantlabs.ai/blog/mcp-github-vulnerability
  Security research blog — tool-poisoning / MCP indirect-injection case; good for the modern agent-tool angle, vendor-authored.
  Used for: §2
- **Google Bard data exfiltration via indirect prompt injection** — Rehberger, J., 2023 · https://embracethered.com/blog/posts/2023/google-bard-data-exfiltration/
  Practitioner security blog — Bard markdown/exfil incident write-up; appropriate for chronology of the channel.
  Used for: §2
- **Many-shot jailbreaking** — Anthropic, 2024 · https://www.anthropic.com/research/many-shot-jailbreaking
  Vendor research post — primary source for many-shot jailbreaking and the power-law scaling claim; stronger than the news/blog majority of §2.
  Used for: §2
- **Operation Grandma: A Tale of LLM Chatbot Vulnerability** — CyberArk, 2023 · https://www.cyberark.com/resources/threat-research-blog/operation-grandma-a-tale-of-llm-chatbot-vulnerability
  Vendor threat-research blog — persona/social-engineering jailbreak narrative; illustrative, not a rigorous taxonomy source.
  Used for: §2
- **Writer.com indirect prompt injection** — Willison, S., 2023 · https://simonwillison.net/2023/Dec/15/writercom-indirect-prompt-injection/
  Practitioner blog — clear Writer.com indirect-injection incident write-up; appropriate for that case study.
  Used for: §2
