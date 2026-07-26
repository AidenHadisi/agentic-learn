# Math & Statistics for Data Science

A refresher and deepening of the core mathematical toolkit for data science and machine learning — statistics, linear algebra, and calculus/optimization — with emphasis on intuition, derivation of key results, and concrete ML applications.

## Success Criteria
- Can describe and compute measures of center, spread, and shape; choose appropriate summaries for skewed data
- Can apply Bayes' theorem, reason about conditional probability, and identify the right distribution for a data-generating process
- Can design and interpret a hypothesis test / A/B test, including power, p-values, and common pitfalls
- Can set up and interpret a linear regression; explain R², residuals, and confounding
- Can perform matrix operations, explain eigendecomposition, and connect SVD to PCA
- Can derive gradient descent for a simple loss, explain the chain rule's role in backprop, and diagnose learning-rate issues
- Can trace end-to-end how a model is trained: data → features (matrix) → loss → gradient → parameter update

## Out of Scope
- Full measure-theoretic probability
- ε–δ proofs and formal real analysis
- Advanced optimization (second-order methods, constrained/Lagrangian)
- Deep learning architectures (focus is on the math, not specific models)
- Bayesian inference beyond Bayes' theorem basics

## Sections
- [x] 1. **Descriptive Statistics** — Summarize data with center, spread, shape; choose robust measures; connect to ML loss functions
- [ ] 2. **Probability Foundations** — Sample spaces, the rules of probability, joint/marginal/conditional, independence, law of total probability
- [ ] 3. **Bayes' Theorem** — Inverting a conditional; prior/likelihood/posterior, base rates, sequential updating, precision vs recall
- [ ] 4. **Random Variables, Expectation & Variance** — Random variables, E[X] as the population twin of the sample mean, linearity, Var(X), expected loss
- [ ] 5. **Distributions Zoo** — When and why each distribution arises (Normal, Binomial, Poisson, Exponential, etc.); generative stories
- [ ] 6. **From Samples to Inference** — Sampling distributions, standard error, CLT, confidence intervals
- [ ] 7. **Hypothesis Testing & A/B Testing** — p-values, power, Type I/II errors, multiple testing, experiment design pitfalls
- [ ] 8. **Correlation & Regression** — Pearson/Spearman, OLS, multiple regression, R², assumptions, confounding
- [ ] 9. **Vectors, Matrices & Linear Systems** — Operations, dot products, Ax=b, least squares as projection
- [ ] 10. **Eigen, SVD & Dimensionality Reduction** — Eigenvalues/vectors, spectral theorem, SVD, PCA, low-rank approximation
- [ ] 11. **Norms, Distances & Regularization** — L1/L2 norms, distance metrics, Ridge/Lasso, sparsity
- [ ] 12. **Derivatives & Gradients** — Single-variable derivatives, partial derivatives, gradient vector, directional derivatives
- [ ] 13. **The Chain Rule & Backpropagation** — Composite functions, computational graphs, reverse-mode autodiff
- [ ] 14. **Gradient Descent & Training Dynamics** — Batch/SGD/mini-batch, momentum, Adam, learning rates, convexity, convergence

<!-- 2026-07-24: original Section 2 bundled conditional probability, Bayes, and expectation/variance into one
lesson. Research showed that is three chapters at this depth, so it was split into 2, 3, and 4 and the rest renumbered. -->

