# PROJECT SPEC: WELLNESS COFFEE (FRONTEND / PWA)

## ROLE
You are the Lead Frontend Engineer using Next.js 14+ (App Router).
Your backend team has already built the API (FastAPI + PostgreSQL). Your goal is to build the Client-Side PWA that consumes this API.

## TECHNICAL CONTEXT
- **App Type:** Progressive Web App (PWA) - Mobile First.
- **Styling:** Tailwind CSS (Utility-first).
- **Vibe:** "Organic & Tech" (Coffee tones for Zen mode, High-Contrast Terminal style for Panic/Hartman mode).
- **Backend Base URL (Dev):** `http://localhost:8000/v1` (Assume this proxy).

## CORE USER STORIES (IMPLEMENTATION ORDER)

### 1. THE "ZEN" ONBOARDING (Critical Hook)
Create a multi-step wizard with smooth transitions (Framer Motion).
- **Step 1: The Leak.** User selects their compulsive habit (Cards: "Food", "Tech", "Shopping", "Subscriptions").
- **Step 2: The Anchor.** User defines their "Why".
  - Input: `Goal Name` (e.g., "Hostal Ometepe").
  - Input: `Target Amount` ($).
- **Step 3: The Partner (Personas).**
  - Show 4 cards: ZEN (Default/Free), HARTMAN, HOUSE, TRACY (Locked/Premium).
  - **Feature:** "Audio Teaser". When clicking a locked persona, simulate playing an audio clip (use a placeholder visualizer) showing their aggressive/strict style.
- **Step 4: The Contract.**
  - A screen displaying the "Discipline Contract".
  - Action: "Slide to Sign" (Swipe interaction) instead of a boring checkbox.

### 2. THE DASHBOARD ("CAPITAL RESCUED")
This is the Home Screen. Do NOT show a standard bank ledger.
- **Primary Metric:** Big counter showing "Total Capital Rescued" (Money saved by interventions).
- **Visuals:**
  - A "Donut Chart" showing where the rescued money went (e.g., "40% to Ometepe Hostal").
  - **The Goal Pipeline:** A progress bar for the main goal (User's Anchor).

### 3. THE CHAT INTERFACE (Main Interaction)
- **Layout:** High-density chat view (WhatsApp/Telegram style but cleaner).
- **Message Types:**
  - *User:* Text bubble (Green).
  - *System (Zen):* Calming beige bubble.
  - *System (Hartman):* Camouflage/Dark Green bubble (font: Monospace).
  - *System (House):* Clinical White/Blue bubble.
- **The "Panic Button" (FAB):**
  - A persistent Floating Action Button in the bottom-right.
  - **Interaction:** Long-press to record audio.
  - **Visual Feedback:** Pulse animation (Red) while recording.

## DATA CONTRACTS (API EXPECTATIONS)
Ensure your frontend mocks match these Backend Models:

**User Object:**
```json
{
  "id": "uuid",
  "plan_type": "FREE",
  "personality_active": "ZEN", // or HARTMAN, HOUSE, TRACY
  "trial_start_date": "ISO-Date"
}
```

**Goal Object:**
```json
{
  "name": "Hostal Ometepe",
  "target_amount": 50000.00,
  "current_savings": 1200.50
}
```

## SPECIAL INSTRUCTIONS
- **Dynamic Theming:** The app must be able to switch "Themes" instantly based on the `personality_active` state. If Hartman is active, the UI becomes rigid and military. If Zen, it is soft and rounded.
- **Offline First:** Prepare Service Workers to cache the "Panic Button" functionality so it loads instantly even with bad signal.
