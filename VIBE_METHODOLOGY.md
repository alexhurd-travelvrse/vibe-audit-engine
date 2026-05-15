# Vibe Audit Engine: Detailed Search Manifesto (v8.7)

This manifesto provides the technical and logical specification for the TravelVRSE Vibe Audit Engine.

## 1. Discovery Architecture (The Multi-Layer Sweep)

### A. Phase 1: Sector-Specific Anchor Probes
The engine performs targeted physical directory probes across the **Official 8 Sectors**:
1.  **Culinary**: Restaurants, gastro-labs, and high-fidelity dining.
2.  **Wellness**: Spas, saunas, and holistic ritual centers.
3.  **Culture**: Museums, galleries, performance art, and landmarks.
4.  **Adventure**: Urban exploration, high-adrenaline tours, and outdoor discovery.
5.  **Nightlife**: Bars, mixology speakeasies, clubs, and sound-bars.
6.  **Retail**: Independent boutiques, artisan showrooms, and design hubs.
7.  **Tours**: Marketplace-verified experiences (GetYourGuide / Viator).
8.  **Ambient**: The "Core Vibe," atmospheric trending status, and viral pulse.

### B. Phase 2: Neighborhood Aliasing
The engine repeats probes for synonyms (e.g., Southbank, Bankside, Waterloo) to consolidate the "Local" winner.

## 2. Signal Type Specifications (The 120-Point Model)

### 1. Places Signal (35 Pts Max) - MANDATORY
*   **The Math**: 20 Pts (Existence) + 15 Pts (Scaled Rating).

### 2. Social Signal (65 Pts Max) - "Viral Velocity"
*   **The Math (Mention Density)**:
    *   **25 Pts (Low Velocity)**: 1 unique organic snippet.
    *   **45 Pts (Medium Velocity)**: 2 unique organic snippets.
    *   **65 Pts (High Velocity / Viral)**: 3+ unique organic snippets.

### 3. Authority Signal (20 Pts Max) - "Elite Curation"
*   **The Math**: 20 Pts (Boolean). Mentions in elite guides (Wallpaper*, Monocle, Eater, Vogue, etc.).

---
**Status**: ACTIVE
**Version**: v8.7-FULL-TAXONOMY
