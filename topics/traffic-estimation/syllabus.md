# Building a SimilarWeb Alternative — Traffic Estimation for Any Domain

Build an internal tool that estimates monthly visits, geo distribution, and traffic source breakdown for any domain — replacing SimilarWeb at a fraction of the cost. Uses labeled traffic data as ground truth, public data sources as features, and ML models to extrapolate estimates across the web.

## Success Criteria
- Understand how commercial tools (SimilarWeb, Semrush) estimate traffic and where they fail
- Know which public/cheap data sources provide usable traffic signals
- Design feature pipelines from DNS popularity, ads.txt, SEO signals, and web crawls
- Train and calibrate ML models that predict visits, geo mix, and traffic sources
- Ship an internal API serving domain-level traffic estimates with confidence intervals

## Out of Scope
- Building a consumer-facing product (this is internal tooling)
- Real-time streaming analytics (batch/daily is fine)
- App store / mobile app traffic estimation
- Paid clickstream data licensing (goal is low cost)

## Sections
- [x] 1. **How SimilarWeb Actually Works** — Understand panel-based estimation, clickstream methodology, channel classification, geo modeling, and known accuracy limits
- [x] 2. **Public Data Sources & Signals** — Survey free/cheap inputs: CrUX, Tranco, Cloudflare Radar, DNS popularity, ads.txt/sellers.json, SEO APIs, and what each actually tells you
- [x] 3. **Feature Engineering** — Design the feature vector: domain-level signals from crawled data, DNS, ad-tech supply chain, and SEO metrics; build collection pipelines
- [x] 4. **Modeling Monthly Visits** — Train regression models (log-linear, gradient boosting) to predict visits from features; calibrate with isotonic regression; measure MAPE by traffic tier
- [x] 5. **Geo & Traffic Source Estimation** — Model country-level distributions and channel mix (organic, direct, referral, social, paid) as separate classification/regression heads
- [x] 6. **System Architecture & API** — Design the end-to-end pipeline: collection → normalization → model → API; batch scoring, confidence intervals, and internal deployment
