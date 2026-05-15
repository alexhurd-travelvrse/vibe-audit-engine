# Vibe Audit Engine: Logic Specification (v7.0)

This document codifies the official methodology for neighborhood-granular discovery and scoring used in the TravelVRSE Vibe Audit Engine.

## 1. Discovery Pipeline (Agent A)

### A. Search Strategy: Neighborhood Aliasing
To ensure high-fidelity discovery, the engine does not rely on a single literal neighborhood name. It utilizes "Neighborhood Aliases" to capture fragmented social signals.
*   **Example (Southbank)**: Queries are automatically expanded to include `Waterloo`, `Bankside`, and `Thames`.
*   **Recursive Fallback**: If local signal frequency is < 20 pts, the engine triggers a city-wide "Anchor Probe" to populate the sector.

### B. Discovery Sources
1.  **Primary Directory (Literal)**: Google Places (via Serper API) for addresses, ratings, and categories.
2.  **Social Proof (Viral)**: TikTok and Instagram Organic snippets (via Serper) using "aesthetic" and "vibe check" keywords.
3.  **Authority Signals (Curation)**: Monocle, Wallpaper*, Eater, and Time Out snippets.

## 2. Scoring Algorithm (The 120-Point Scale)

The total score for any venue is calculated by aggregating signals across the discovery pipeline.

| Signal Type | Point Value | Definition |
| :--- | :--- | :--- |
| **Places Signal** | **35 Pts** | Verified existence on Google Maps with a valid rating. |
| **Authority Signal** | **20 Pts** | Mention in high-fidelity design/travel publications. |
| **Social Signal** | **65 Pts** | High-velocity engagement on TikTok or Instagram. |
| **Anchor Signal** | **35 Pts** | Literal match for iconic landmarks/cultural anchors. |

**Maximum Base Score**: 120 Pts (Place + Authority + Social). 
*Note: Scores may exceed 120 through **Fuzzy Venue Merging** if multiple aliases yield unique signals for the same entity.*

## 3. Data Processing & Display

### A. Fuzzy Venue Merging
The engine implements a normalization layer to prevent duplicate entries.
*   **Logic**: Venues with a >80% name overlap (e.g., "Sea Containers" vs "Sea Containers Restaurant") are merged into a single high-score entity.

### B. Sector Heatmap Generation
The engine calculates a "Local vs. Expansion" comparison for every sector (Culinary, Wellness, Culture, etc.).
*   **Local Score**: The highest scoring venue within the target neighborhood.
*   **Expansion Score**: The highest scoring venue in the top 3 adjacent districts (to show market context).

---
**Released Version**: v7.0
**Status**: ACTIVE / FROZEN
**Verification Hash**: f5ef7e8-hf-stable
