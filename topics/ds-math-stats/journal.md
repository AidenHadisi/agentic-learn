# Learning Journal — Math & Statistics for Data Science

## Student Profile
- **Background**: Completed college-level math (Calc I–III, linear algebra, probability)
- **Goal**: Full data science toolkit — both data analysis (stats, inference, A/B testing) and ML foundations (optimization, gradient descent, loss functions)
- **Constraints**: None stated
- **Depth**: Balanced — intuition-first with enough rigor to derive key results; no formal proofs

## Established Knowledge
- **Calculus**: Has taken Calc I–III; derivatives, integrals, multivariable calc are not new but may be rusty
- **Linear Algebra**: Has taken a course; vectors, matrices, eigenvalues are familiar concepts
- **Probability**: Has formal coursework; knows distributions and basic probability rules
- **Descriptive Statistics**: Completed Lesson 1. Verified by retrieval on 2026-07-24 (5/6 application questions correct, cold, no lesson access):
  - **Breakdown points**: Applied correctly under 30% contamination — chose median over IQR, so understands IQR breaks at ~25% while median holds to ~50%
  - **Loss ↔ statistic**: Computed the MSE optimum (mean = 28) and MAE optimum (median = 5) for {2, 4, 6, 100} unaided
  - **Kurtosis**: Correctly inferred that excess kurtosis +6 makes the empirical rule understate large-loss frequency — has the tails-not-peakedness reading
  - **Tukey fences**: Computed fences (2, 50) from Q1 = 20, Q3 = 32 and flagged 51 correctly
  - **Bessel's correction**: Knows dividing by n underestimates population variance on average

## Log
### 2025-07-22 — Discovery
- **Covered**: Identified scope, ordered curriculum across stats, linear algebra, and calculus/optimization
- **Evidence**: Student self-reported college-level math background; wants balanced depth
- **Next**: Begin Section 1 (Descriptive Statistics)

### 2026-07-23 — Section 1 (Descriptive Statistics)
- **Covered**: Measures of center/spread/shape; robust vs non-robust summaries; MSE/MAE ↔ mean/median
- **Evidence**: Student reported completing `1-descriptive-statistics.html`; no per-question check log captured in this journal
- **Next**: Section 2 — Probability Foundations

### 2026-07-24 — Review of Section 1
- **Covered**: Cold retrieval sweep over Section 1, then a deep re-teach of Bessel's `n-1` correction on request
- **Evidence**: 5/6 application questions correct with no lesson access (breakdown points under 30% contamination, MSE/MAE optima for a concrete set, kurtosis → tail risk, Tukey fences, direction of the `n` vs `n-1` bias). Missed the efficiency question: chose "mean and median are the same thing on symmetric data," conflating equality of the *population* parameters with the sampling behavior of the two *estimators*. Re-explained via the ruler/measurement analogy and SE ratio (median ≈ 1.25σ/√n → ~64% efficiency); re-check was cancelled, so not yet verified.
- **Student asked**: What `n-1` really does and when to use `n`. First explanation (bias derivation via the sum-of-squares decomposition) was too formal — student asked for simpler. Second pass used a two-point population {0, 10} enumerating all four samples of size 2, showing the divide-by-`n` estimate lands at 12.5 vs the true 25. That framing was accepted. Comprehension check was cancelled, so unverified.
- **Next**: Section 2 — Probability Foundations (old committed lesson judged bad by the student; rewriting from scratch)

## Weak Spots
- **Estimator variability vs. population parameters**: Treats "mean = median on symmetric data" as ending the discussion, missing that the two estimators have different sampling variability. Re-taught 2026-07-24, unverified. Will resurface in Section 4 (standard error) — verify there.
- **Bessel's correction, mechanism not just direction**: Knew `n` underestimates but wanted the underlying reason. Re-taught twice on 2026-07-24 (formal, then via a fully enumerated 2-point population). Unverified.
- **Teaching-style note**: Student prefers concrete enumerated examples over algebraic derivation. Lead with the worked numbers; keep derivations short and optional. Has cancelled three comprehension-check questionnaires in a row — prefer fewer, well-timed checks over frequent ones.
