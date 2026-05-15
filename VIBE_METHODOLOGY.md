# Vibe Audit Engine: Detailed Search Manifesto (v8.6)

This manifesto provides the technical and logical specification for the TravelVRSE Vibe Audit Engine.

## 1. Discovery Architecture (The Multi-Layer Sweep)

### A. Phase 1: Sector-Specific Anchor Probes (The Physical Foundation)
The engine performs targeted probes into physical directories (Google Places + Marketplace Anchors for Tours).

### B. Phase 2: Neighborhood Aliasing
The engine repeats probes for synonyms (e.g., Southbank, Bankside, Waterloo) to consolidate the "Local" winner.

## 2. Signal Type Specifications (The 120-Point Model)

### 1. Places Signal (35 Pts Max) - MANDATORY
*   **Protocol**: Physical Directory cross-check.
*   **The Math**: 20 Pts (Existence) + 15 Pts (Scaled Rating).

### 2. Social Signal (65 Pts Max) - "Viral Velocity"
*   **The Math (Mention Density)**:
    *   **25 Pts (Low Velocity)**: 1 unique organic snippet.
    *   **45 Pts (Medium Velocity)**: 2 unique organic snippets.
    *   **65 Pts (High Velocity / Viral)**: 3+ unique organic snippets.

### 3. Authority Signal (20 Pts Max) - "Elite Curation"
*   **Protocol**: Multi-Source Authority Probe. The engine specifically scans the following **Elite Guides**:
    *   **Design & Architecture**: `wallpaper.com`, `monocle.com`, `dezeen.com`.
    *   **Fashion & Lifestyle**: `vogue.com`, `highsnobiety.com`, `hypebeast.com`.
    *   **Hospitality & Dining**: `eater.com`, `theinfatuation.com`, `michelin.com`, `timeout.com`.
    *   **Travel & Luxury**: `cntraveler.com`, `travelandleisure.com`.
*   **The Math**: **20 Pts (Boolean)**. A verified mention in any of these elite domains satisfies the curation requirement.

---
**Status**: ACTIVE
**Version**: v8.6-ELITE-AUTHORITY
