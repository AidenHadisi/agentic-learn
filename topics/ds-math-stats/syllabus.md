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
- [ ] 1. **Descriptive Statistics** — Summarize data with center, spread, shape; choose robust measures; connect to ML loss functions
- [ ] 2. **Probability Foundations** — Conditional probability, Bayes' theorem, expected value, variance; the language of uncertainty
- [ ] 3. **Distributions Zoo** — When and why each distribution arises (Normal, Binomial, Poisson, Exponential, etc.); generative stories
- [ ] 4. **From Samples to Inference** — Sampling distributions, standard error, CLT, confidence intervals
- [ ] 5. **Hypothesis Testing & A/B Testing** — p-values, power, Type I/II errors, multiple testing, experiment design pitfalls
- [ ] 6. **Correlation & Regression** — Pearson/Spearman, OLS, multiple regression, R², assumptions, confounding
- [ ] 7. **Vectors, Matrices & Linear Systems** — Operations, dot products, Ax=b, least squares as projection
- [ ] 8. **Eigen, SVD & Dimensionality Reduction** — Eigenvalues/vectors, spectral theorem, SVD, PCA, low-rank approximation
- [ ] 9. **Norms, Distances & Regularization** — L1/L2 norms, distance metrics, Ridge/Lasso, sparsity
- [ ] 10. **Derivatives & Gradients** — Single-variable derivatives, partial derivatives, gradient vector, directional derivatives
- [ ] 11. **The Chain Rule & Backpropagation** — Composite functions, computational graphs, reverse-mode autodiff
- [ ] 12. **Gradient Descent & Training Dynamics** — Batch/SGD/mini-batch, momentum, Adam, learning rates, convexity, convergence
