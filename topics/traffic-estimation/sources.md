# Sources — Building a SimilarWeb Alternative — Traffic Estimation for Any Domain

Everything read while researching this topic. Append as you go; dedupe by URL.

- **How Accurate Are Search Traffic Estimations?** — Ahrefs · https://ahrefs.com/blog/traffic-estimations-accuracy/
  Practitioner blog (Ahrefs self-study vs GSC); good for organic-estimate error rates (median ~50%). Undated.
  Used for: §1, §4

- **How We Turn Traffic Data Into Intelligence** — Semrush · https://www.semrush.com/kb/1211-how-semrush-turns-traffic-data-into-traffic-intelligence
  Vendor knowledge-base / marketing methodology page; high-level panel claims, not reproducible methods. Undated.
  Used for: §1

- **Measuring user interactions with websites (PLOS One)** — Jansen et al., 2022 · https://pmc.ncbi.nlm.nih.gov/articles/PMC9140287/
  Peer-reviewed paper (via PMC); empirical SimilarWeb vs analytics accuracy (aggregate bias + rank correlation).
  Used for: §1

- **SimilarWeb Data Methodology** · https://support.similarweb.com/hc/en-us/articles/360001631538
  Vendor support article; describes their four-source "Dataverse" at marketing depth. Undated.
  Used for: §1

- **Which 3rd-Party Traffic Estimate Best Matches GA?** — SparkToro · https://sparktoro.com/blog/which-3rd-party-traffic-estimate-best-matches-google-analytics/
  Practitioner blog with head-to-head vs GA; best public accuracy benchmark across tools. Undated.
  Used for: §1, §4

- **A Research-Oriented Top Sites Ranking** — Tranco · https://tranco-list.eu/
  Project landing page for the Tranco list; good for what the ranking is and how to download it. Undated.
  Used for: §2

- **Chrome UX Report documentation** · https://developer.chrome.com/docs/crux
  Official CrUX docs — authoritative on what the dataset measures and coverage. Undated.
  Used for: §2

- **Cloudflare Radar Domain Rankings** · https://developers.cloudflare.com/radar/investigate/domain-ranking-datasets/
  Official Cloudflare docs for DNS/CDN-derived domain rankings and API. Undated.
  Used for: §2

- **DataForSEO API documentation** · https://docs.dataforseo.com/
  Vendor API docs; useful for endpoints and ETV fields, not independent methodology validation. Undated.
  Used for: §2

- **experimental.popularity.rank** — CrUX BigQuery · https://developer.chrome.com/docs/crux/bigquery
  Official CrUX BigQuery docs — authoritative on rank-bucket granularity and country tables. Undated.
  Used for: §2, §5

- **IAB ads.txt specification** · https://iabtechlab.com/ads-txt/
  Official IAB Tech Lab spec for ads.txt format and DIRECT/RESELLER semantics. Undated.
  Used for: §2

- **Open PageRank API** · https://openpagerank.keywordseverywhere.com/
  Free API landing page for a link-authority score; thin on how the score is derived. Undated.
  Used for: §2

- **Toppling Top Lists (IMC)** — Ruth et al., 2022 · https://kcruth.com/papers/2022-Toplists.pdf
  Peer-reviewed IMC paper (author PDF); compares top-list accuracy; cited for CrUX being most accurate.
  Used for: §2

- **Chrome for Developers** — CrUX rank magnitude · https://developer.chrome.com/blog/crux-rank-magnitude
  Official Chrome blog on CrUX rank-magnitude buckets — authoritative on bucket boundaries. Undated.
  Used for: §3

- **How ETV is calculated** — DataForSEO · https://dataforseo.com/help-center/how-is-etv-calculated
  Vendor help article for estimated traffic volume formula (rank × volume × CTR). Undated.
  Used for: §3

- **power law fit** — CrUX ranking to pageviews · https://thib.me/crux-ranking-to-pageviews
  Personal blog deriving a CrUX rank→pageviews power-law fit; useful heuristic, not peer-reviewed. Undated.
  Used for: §3

- **Public Suffix List** · https://publicsuffix.org/learn/
  Official PSL explainer — authoritative on registrable-domain / eTLD+1 rules. Undated.
  Used for: §3

- **Python library** — tldextract · https://github.com/john-kurkowski/tldextract
  GitHub tooling docs for Public-Suffix-aware domain parsing. Undated.
  Used for: §3

- **Tranco methodology** · https://tranco-list.eu/methodology
  Official Tranco methodology page — Dowdall scoring, source lists, anti-manipulation design. Undated.
  Used for: §3

- **Conformal prediction intervals** — MAPIE · https://mapie.readthedocs.io/
  Library docs for conformal prediction; cited for intervals though the lesson demo uses LightGBM quantiles. Undated.
  Used for: §4

- **Hyperparameter optimization framework** — Optuna · https://optuna.org/
  Product landing page, no methodology depth; only useful as the library name/pointer. Undated.
  Used for: §4

- **LightGBM Parameters Tuning** · https://lightgbm.readthedocs.io/en/latest/Parameters-Tuning.html
  Official LightGBM tuning docs — practical hyperparameter guidance. Undated.
  Used for: §4

- **The Web unpacked: Zipf and power-law analysis** — Xavier, 2024 · https://arxiv.org/abs/2404.17095
  arXiv preprint on web Zipf/power-law structure; supports log-scale modeling rationale.
  Used for: §4

- **Why tree-based models still outperform DL on tabular data** — Grinsztajn et al., 2022 · https://arxiv.org/abs/2207.08815
  arXiv preprint (tabular DL vs trees); justifies LightGBM over neural nets here.
  Used for: §4

- **Aitchison geometry** — Compositional data analysis · https://en.wikipedia.org/wiki/Compositional_data
  Wikipedia encyclopedia entry on compositional data; orientation only, not a primary methods source. Undated.
  Used for: §5

- **Cloudflare Radar DNS top locations** · https://developers.cloudflare.com/radar/investigate/dns/
  Official Cloudflare Radar DNS docs — authoritative on per-country DNS location signals. Undated.
  Used for: §5

- **scikit-bio composition module** · https://scikit.bio/docs/latest/generated/skbio.stats.composition.html
  Library docs for CLR/ILR transforms; practical companion to the compositional-data idea. Undated.
  Used for: §5

- **SimilarWeb Country Filter FAQs** · https://support.similarweb.com/hc/en-us/articles/6315589042077
  Vendor support FAQ on country filters; thin product help, not geo-methodology detail. Undated.
  Used for: §5

- **FastAPI documentation** · https://fastapi.tiangolo.com/
  Framework docs landing page; only useful for API stack choice, not traffic estimation. Undated.
  Used for: §6

- **LightGBM model serialization** · https://lightgbm.readthedocs.io/en/latest/Python-API.html
  Official LightGBM Python API docs — save/load for batch scoring. Undated.
  Used for: §6

- **ML monitoring** — Evidently · https://www.evidentlyai.com/
  Product landing page for ML monitoring; no methodology, only a vendor pointer. Undated.
  Used for: §6

- **Semrush Traffic Analytics API** · https://developer.semrush.com/api/v3/ta/
  Official Semrush API docs for Traffic Analytics endpoints/shapes. Undated.
  Used for: §6

- **SimilarWeb REST API vs Batch API** · https://developer.similarweb.com/
  SimilarWeb developer portal landing; useful for API product surface, thin on internals. Undated.
  Used for: §6

- **workflow orchestration** — Prefect · https://www.prefect.io/
  Product landing page for workflow orchestration; no methodology, only a vendor pointer. Undated.
  Used for: §6
