# Vibe Audit Engine: Detailed Search Manifesto (v8.7-EXECUTIVE)

This manifesto provides the technical and logical specification for the TravelVRSE Vibe Audit Engine, ensuring zero-drift discovery and high-fidelity scoring.

## 1. Discovery Architecture (The Multi-Layer Sweep)

### A. Phase 1: Marketplace-First Anchor Probes
The engine initiates discovery by probing specific "Authority Marketplaces" to establish the high-fidelity floor. A venue **must** exist in one of these directories or a physical directory (Google Places) to trigger Phase 2.

**Sector-Specific Anchor Probes:**
1.  **Culinary**: Eater, Michelin Guide, The World's 50 Best.
2.  **Wellness**: SpaFinder, Treatwell, Luxury Spa Edit.
3.  **Culture**: Artforum, Time Out (Curated Arts), Official Museum Directories.
4.  **Adventure**: GetYourGuide (High Rated), Viator (Elite Collection).
5.  **Nightlife**: Resident Advisor (RA), DJ Mag (Top 100 Clubs), World's Best Bars.
6.  **Retail**: Hypebeast (Store Guide), Vogue (Boutique Picks), Highsnobiety.
7.  **Tours**: Curated Tour Operators with 4.8+ Marketplace Ratings.
8.  **Ambient**: Viral Velocity Heatmaps (Instagram/TikTok location trends).

### B. Phase 2: Neighborhood Aliasing & Expansion
The engine performs a recursive sweep using **Neighborhood Aliasing**:
*   **Local Layer**: Primary neighborhood (e.g., "Indre By").
*   **Aliasing Layer**: Known synonyms or micro-districts (e.g., "Old Town Copenhagen," "Copenhagen Center").
*   **Extended Layer**: Adjacent zones (e.g., "Vesterbro border") to capture "Vibe Bleed" for heatmap accuracy.

## 2. Signal Type Specifications (The 120-Point Triangulation)

### 1. Places Signal (35 Pts Max) - Physical Verification
*   **Existence (20 Pts)**: Confirmed listing in Google Places or a Verified Marketplace.
*   **Quality (15 Pts)**: Scaled Google/Marketplace Rating (e.g., 4.5+ rating = 15 pts).

### 2. Social Signal (65 Pts Max) - Viral Velocity (Social Proof)
*   **Mention Density Grading**:
    *   **25 Pts (Grade 1)**: 1 unique organic video/snippet (low pulse).
    *   **45 Pts (Grade 2)**: 2 unique organic videos/snippets (emerging trend).
    *   **65 Pts (Grade 3)**: 3+ unique organic videos/snippets (High Velocity / Viral).

### 3. Authority Signal (20 Pts Max) - Elite Curation
*   **Boolean Check (20 Pts)**: Binary presence in the **Elite 12 Curation List**:
    *   Wallpaper*, Monocle, Eater, Vogue, Conde Nast Traveler, Time Out (Global Picks), Hypebeast, Resident Advisor, Michelin, The World's 50 Best, Afar, Forbes Travel Guide.

---
**Status**: ACTIVE & FROZEN
**Version**: v8.7.1-FULL-TAXONOMY
**Last Updated**: 2026-05-15
