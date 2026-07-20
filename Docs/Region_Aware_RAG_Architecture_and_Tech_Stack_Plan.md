# Region-Aware Knowledge Platform Architecture & Technology Plan

## Overview

Build a region-aware RAG platform that: - Crawls public, region-specific
content. - Personalizes responses using private user context. - Returns
answers with citations and evidence. - Keeps user profiles and
conversations private. - Supports multiple LLM providers through
LiteLLM.

------------------------------------------------------------------------

# High-Level Architecture

``` text
Public Websites
      │
Crawler (Firecrawl / Crawl4AI / Playwright)
      │
Cleaning + Chunking
      │
Embedding Generation
      │
Supabase (PostgreSQL + pgvector)
      │
Metadata Filtering
(country/state/language/topic)
      │
Semantic Search
      │
Reranker
      │
LiteLLM Gateway
      │
GPT-5 / Claude / Gemini / Self-hosted Models
      │
Answer + Citations + Evidence
```

------------------------------------------------------------------------

# Technology Stack

  -----------------------------------------------------------------------
  Layer                   Technology
  ----------------------- -----------------------------------------------
  Crawling                Firecrawl, Crawl4AI, Playwright

  Parsing                 Unstructured, BeautifulSoup

  Queue                   SQS or RabbitMQ

  Database                Cloud / Self-hosted Supabase (PostgreSQL)

  Vector Store            pgvector

  Storage                 Supabase Storage

  Authentication          Supabase Auth

  Authorization           Row Level Security (RLS)

  Embeddings              OpenAI text-embedding-3-small (initial), BGE-M3
                          (self-hosted option)

  Retrieval               Metadata filters + pgvector + PostgreSQL FTS

  Reranker                BGE Reranker or Jina Reranker

  LLM Gateway             LiteLLM

  LLMs                    GPT-5, Claude Sonnet, Gemini, Llama/Qwen
                          (future)

  Monitoring              Grafana + Prometheus + LiteLLM logs

  Deployment              AWS (Docker/Kubernetes)
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# Data Classification

## Public

-   Crawled documents
-   Embeddings
-   Source metadata

## Private

-   User profile
-   Conversation history
-   Permissions
-   Authentication

Only public knowledge is embedded.

------------------------------------------------------------------------

# Retrieval Flow

1.  User logs in.
2.  Load user profile.
3.  Detect region/language.
4.  Filter documents by metadata.
5.  Vector search.
6.  Re-rank.
7.  Generate answer through LiteLLM.
8.  Return citations and evidence.
9.  Store conversation privately.

------------------------------------------------------------------------

# Incremental Indexing

-   Hash every document.
-   Skip unchanged documents.
-   Re-embed only changed chunks.
-   Version documents.
-   Soft-delete old chunks.
-   Preserve citation metadata.

------------------------------------------------------------------------

# Security

-   Self-hosted Supabase / cloud based
-   RLS on all user data
-   TLS
-   Encrypted backups
-   Secrets Manager
-   Audit logging
-   Data minimization for LLM prompts

------------------------------------------------------------------------

# Why LiteLLM

-   Single API for multiple providers
-   Model routing
-   Fallbacks
-   Cost tracking
-   Easy migration to self-hosted models
-   Centralized governance
-   Guardrails

------------------------------------------------------------------------

# Roadmap

## Phase 1

-   Public crawler
-   Supabase
-   pgvector
-   OpenAI embeddings
-   GPT-5
-   LiteLLM

## Phase 2

-   Hybrid search
-   Reranker
-   Better observability

## Phase 3

-   Self-hosted embeddings
-   Self-hosted LLMs
-   Multi-region deployment
-   Advanced governance
