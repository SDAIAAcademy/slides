# Catalogue of SDAIA Academy courses (for overlap checks)

Every course lives in its own public repository under https://github.com/SDAIAAcademy and is served at
`https://sdaiaacademy.github.io/<repo>/`. Before proposing an outline, re-read the live `README.md` and `index.html`
of every course in the same track and the neighbouring tracks (`gh api repos/SDAIAAcademy/<repo>/contents/README.md`
or `curl https://raw.githubusercontent.com/SDAIAAcademy/<repo>/main/README.md`) because this snapshot (25 October 2026)
goes stale. Add every new course to this file.

## Tracks

| Key | Track | Audience and purpose | Language so far |
|---|---|---|---|
| `fluency` | Data & AI Fluency | Employees and undergraduates who use AI applications; no code | Arabic |
| `foundations` | Data & AI Foundations | Python and mathematics for data and AI | (none yet) |
| `ai-engineering` | AI Engineering | Developers and engineers: NLP, agents, data engineering, deployment | English |
| `data-science` | Data Science | Analysis, statistics, optimization, experimentation, advanced ML | (none yet) |
| `executives` | Executives & Leaders | Decision makers: strategy, governance, value, risk | (none yet) |

## AI Productivity · رفع الإنتاجية بالذكاء الاصطناعي (`productivity`, fluency, Arabic RTL)

4 days × 4 sessions + capstone day. Case study: مركز الواحة للخدمات المشتركة (a fictional government shared-services
centre). Labs in real AI apps (ChatGPT, Claude, Gemini, Copilot, HUMAIN Chat, Gemini Notebook, Etlaq, Lovable, Replit,
Google AI Studio); no programming. Capstone is individual.

- Day 1 أساسيات: AI at work (evidence and limits) · 4D fluency, limits, safe use (data classification, PDPL) · prompting with RICE · dialogue, refinement, persistent context (context document, prompt library)
- Day 2 المهام اليومية: writing and correspondence in Arabic · reading, summarising, extraction · data and spreadsheets (compute with code, fix formulas) · presentations and images
- Day 3 البحث والمعرفة: deep research and verification (SIFT) · trustworthy knowledge (projects, notebooks, retrieval) · custom assistants and skills · workflow decomposition and redesign
- Day 4 الوكلاء والبناء: agents and scheduled tasks (connectors, MCP, permissions, injection) · vibe coding 1 (idea to PRD, AGENTS.md) · vibe coding 2 (build, test, publish) · responsible adoption and the 1/7/30 plan
- Day 5: capstone presentations

## Applied NLP Engineering (`applied-nlp`, ai-engineering, English)

3 days × 4 sessions + capstone day. Case study: intelligent support-ticket processing for "DemoMart" (English and
Arabic tickets). Notebooks on Colab or uv; transformers, sentence-transformers, FAISS, PEFT/LoRA, Gradio.

- Day 1 Represent: tokenization (BPE/WordPiece, Arabic fertility) · embeddings and semantic search (FAISS, Hit@k, MRR) · inside the transformer (attention, encoder vs decoder) · decision models (zero-shot, embeddings + LR, F1, thresholds)
- Day 2 Generate: generative LLMs (next-token prediction, chat templates, decoding) · prompting and structured outputs (few-shot, schemas, validation, injection) · RAG (chunking, hybrid search, reranking, citations) · model selection and evaluation (encoder vs LLM, latency, cost, cascade)
- Day 3 Adapt: fine-tuning fundamentals and data · fine-tune a decision model (Trainer, early stopping) · LLM adaptation (SFT, LoRA/QLoRA, FT vs RAG) · evaluate, deploy (Gradio) and capstone kickoff
- Day 4: capstone presentations

## Agentic AI Systems Engineering · هندسة أنظمة الذكاء الاصطناعي التوكيلي (`agentic-ai`, ai-engineering, English)

4 days × 4 sessions + capstone day. Case study: Madar Municipal Services and Rafeeq (رفيق), its bilingual permit
assistant. Free models only (OpenRouter, Hugging Face); Python via uv, PEP 723 scripts; organising idea: the ladder
prompt → context → harness → loop → graph. Prerequisite: Applied NLP or equivalent (has called an LLM API).

- Day 1 From model to agent: the agentic landscape (agents vs workflows, three API shapes, benchmarks) · OpenAI Responses API · Anthropic Messages API and tool design · the agent loop from scratch
- Day 2 Context engineering: context is a budget (rot, caching, compaction) · retrieval for agents (BM25, embeddings, hybrid, Arabic) · memory, skills and context files (AGENTS.md, Agent Skills) · Model Context Protocol
- Day 3 Harness and loop: anatomy of a harness (Pi, OpenClaw, Hermes, Mercury; permissions, hooks) · agent SDKs and hosted agents · loop engineering (Ralph loop, back-pressure) · evaluating agents (graders, judges, pass^k)
- Day 4 Graph and production: graph engineering (LangGraph, interrupts, checkpoints) · multi-agent systems and A2A · securing agents (OWASP agentic top 10, lethal trifecta) · agents in production (FastAPI, OpenTelemetry, CI smoke eval) + capstone kickoff
- Day 5: capstone presentations

## Modern Data Engineering (`data-engineering`, ai-engineering, English)

4 days × 4 sessions + capstone day. Case study: Qafila, a fictional quick-commerce grocery platform (Riyadh, Jeddah,
Dammam); one persona (Khalid) and one order followed through every deck. Stack: DuckDB, Polars, dlt, dbt, Iceberg,
Spark, Pandera, Dagster, ODCS contracts; labs without pandas. Concept sessions use illustrated "story" decks (a course
extension); tool sessions are walkthrough notebooks; the capstone deck uses the standard engine.

- Before Day 1: setup check · SQL window functions (self-paced)
- Day 1 Land: course introduction · warehouse, lake, lakehouse (illustrated story) · storage for analytics (rows vs columns; Parquet) · batch ingestion (dlt) · change data capture and load strategies (MERGE, SCD2)
- Day 2 Model: bronze to silver (Polars) · dimensional modeling · dbt: transformation as software · testing and data quality (Pandera)
- Day 3 Scale: open table formats and the lakehouse (Iceberg) · distributed processing with Spark · streaming fundamentals · real-time pipelines into the lakehouse
- Day 4 Operate: orchestration (Dagster) · observability and data contracts · governance, security and privacy (PDPL, NDMO classification) · data engineering for AI (embeddings, text-to-SQL) + capstone kickoff
- Day 5: capstone presentations

## Overlap rules of thumb

- A topic that is a full session elsewhere becomes at most one recap slide here, with a pointer: "covered in Applied NLP Day 2, session 3". Teach what is new for this audience.
- Shared concepts that every track touches (prompting, PDPL and data classification, model selection from public benchmarks, evaluation) are fine to repeat at the depth the audience needs, in that audience's language and examples.
- Keep case studies distinct: every course has its own fictional organisation and synthetic data. Reusing the Qafila, Madar, Al-Waha or DemoMart worlds confuses participants who take several courses.
- Sequencing: state prerequisites in terms of Academy courses ("Applied NLP or equivalent"), and say what a participant who skipped them needs to read before Day 1.
