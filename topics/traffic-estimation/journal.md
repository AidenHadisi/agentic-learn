# Learning Journal — Traffic Estimation

## Student Profile
- **Background**: Developer, familiar with internal publisher analytics
- **Goal**: Build an internal SimilarWeb replacement that estimates monthly visits, geo data, and traffic sources for any domain — at low cost
- **Constraints**: Practical focus; has labeled ground-truth data for a panel of sites; wants all three outputs equally; skip internal data specifics
- **Depth**: Practical — enough theory to build and ship

## Established Knowledge
- Familiar with internal publisher data (CDN logs, ad impressions, session analytics) — treat as known labels, not a learning topic

## Log
### 2026-07-22 — How SimilarWeb Actually Works
- **Covered**: Panel vs search-model approaches, SimilarWeb's 4 data sources, channel classification signals, dark traffic problem, geo estimation, accuracy benchmarks (SparkToro/Ahrefs/Jansen), realistic DIY accuracy targets, metric mismatch trap
- **Evidence**: Completed lesson with interactive components; moved to next section without issues
- **Next**: Section 2 — Public Data Sources & Signals

### 2026-07-22 — Public Data Sources & Signals
- **Covered**: CrUX (rank buckets, BigQuery vs REST, ~18M origins), Tranco (Dowdall aggregation, 5 lists, stability), Cloudflare Radar (DNS popularity, geo, CC BY-NC), Umbrella, DataForSEO (organic ETV, bulk pricing), ads.txt/sellers.json (monetization graph), Open PageRank, domain age, Google Trends limitations, cost analysis (~$1,350/mo for 1M domains)
- **Evidence**: Correctly identified CrUX as strongest total-traffic proxy over DataForSEO/Tranco/ads.txt
- **Next**: Section 3 — Feature Engineering

### 2026-07-23 — Feature Engineering
- **Covered**: Feature vector design (~35 features), log transforms for power-law data, missing data encoding (binary flags + sentinels), eTLD+1 normalization with tldextract, collection pipeline architecture (daily/weekly/monthly cadences), storage schema, rate limiting, feature importance hierarchy, multicollinearity handling for trees vs linear, feature selection via permutation importance
- **Evidence**: Completed lesson and quiz without issues
- **Next**: Section 4 — Modeling Monthly Visits

### 2026-07-23 — Modeling Monthly Visits
- **Covered**: Model selection (Ridge baseline vs LightGBM), log1p target, stratified splits by tier, sample weighting, LightGBM hyperparameters + early stopping, Optuna tuning, isotonic calibration, per-tier calibration, ratio method, Spearman as primary metric, MAPE by tier, quantile regression for intervals, refusal rules
- **Evidence**: Initially confused by calibration methods; re-taught isotonic (lookup table), per-tier (separate correctors), and ratio method (niche factor) with concrete examples — understood after second pass
- **Next**: Section 5 — Geo & Traffic Source Estimation

### 2026-07-23 — Geo & Traffic Source Estimation
- **Covered**: Geo signals (CF DNS locations, CrUX country ranks, ccTLD/language), compositional data modeling (log-transform + normalize), channel mix difficulty gap, organic from ETV, niche priors for other channels, separate model heads, outer product combination, JS divergence and top-k accuracy metrics
- **Evidence**: Completed lesson without extra clarification needed
- **Next**: Section 6 — System Architecture & API

### 2026-07-23 — System Architecture & API
- **Covered**: Batch vs on-demand scoring, collection pipeline with per-source schedules, domain universe management (seed + internal + demand-driven + prune), raw → features → estimates pipeline, SQL feature store (skip Feast), batch scoring with validation gates, FastAPI + Postgres API design, single/bulk/history endpoints, response format with confidence, monitoring (drift, coverage, cost), feedback loop, model versioning, Phase 1 (cron + FastAPI) vs Phase 2 (Prefect/BigQuery) deployment
- **Evidence**: Completed full course — all 6 sections
- **Next**: Course complete

## Weak Spots
- **Calibration concepts**: Needed extra explanation on isotonic regression and per-tier calibration — understood after concrete analogies but may need reinforcement when applied in practice
