# Sources — Evaluating and Improving AI Workflows

Everything read while researching this topic. Append as you go; dedupe by URL.

- **Are Large Language Models Reliable? Analyzing the Impact of Silent LLM API Updates** — Ma, C., Yang, J. and Kästner, C., 2023 · https://arxiv.org/abs/2311.11123
  arXiv preprint — empirical evidence that stable API aliases still drift in behavior; good for the silent-update / provider-drift claim.
  Used for: §1
- **Defeating Nondeterminism in LLM Inference** — He, H. and Thinking Machines Lab, 2025 · https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/
  Lab engineering blog — primary write-up of batch-dependent floating-point nondeterminism at temperature 0; worth reading directly for the mechanism.
  Used for: §1
- **Expanding on what we missed with sycophancy** — OpenAI, 2025 · https://openai.com/index/expanding-on-sycophancy/
  Vendor postmortem — OpenAI's own account of the sycophancy failure; useful as an incident case study, not as neutral eval methodology.
  Used for: §1
- **Frequently Asked Questions About LLM Evals** — Husain, H., 2025 · https://hamel.dev/blog/posts/evals-faq/
  Practitioner blog — clear test-vs-eval framing, rubric drift, and eval-set saturation; strong practical guidance for builders.
  Used for: §1
- **Measuring What Matters: Construct Validity in Large Language Model Benchmarks** — Reuel, A. et al., 2025 · https://arxiv.org/abs/2511.04703
  arXiv preprint — construct-validity lens on what benchmarks actually measure; good for "are we scoring the right thing?"
  Used for: §1
- **Moffatt v. Air Canada, 2024 BCCRT 149** — British Columbia Civil Resolution Tribunal, 2024 · https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html
  Legal decision — concrete liability case for chatbot hallucinations; use for the real-world stakes of unverified AI output, not for eval technique.
  Used for: §1
- **Reproducible outputs with the seed parameter** — OpenAI, 2025 · https://developers.openai.com/cookbook/examples/reproducible_outputs_with_the_seed_parameter
  Official cookbook docs — documents seed/reproducibility knobs and their limits; pair with the Thinking Machines piece, don't treat alone as a determinism guarantee.
  Used for: §1
- **Who Validates the Validators? Aligning LLM-Assisted Evaluation of LLM Outputs with Human Preferences** — Shankar, S. et al., 2024 · https://arxiv.org/abs/2404.12272
  arXiv preprint — LLM-as-judge vs human preference alignment; good foundation for model-based scorers and their failure modes.
  Used for: §1
