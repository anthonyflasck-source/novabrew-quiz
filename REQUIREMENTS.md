# NovaBrew Coffee Taste Profile Quiz - Requirements

## Overview
A web-based personality quiz that matches subscribers to a coffee personality and recommends specific NovaBrew coffees based on their result.

## Personality Types
### Bold Explorer
Loves intensity, depth, and confident flavor profiles. Prefers strong coffee experiences and is comfortable with assertive roast character.

### Smooth Operator
Values balance, consistency, and dependable quality. Wants a repeatable, high-confidence daily cup without dramatic swings.

### Cozy Classic
Prioritizes comfort and ease. Enjoys gentle, familiar coffee experiences that fit calm routines and low-friction rituals.

### Wild Card
Thrives on novelty and experimentation. Wants surprising profiles, unusual processing, and a discovery-driven coffee journey.

## Coffee Pairings
- Bold Explorer: Double Down, The Purist
- Smooth Operator: Midnight Summit, Golden Hour
- Cozy Classic: Sunrise Blend, Wildflower
- Wild Card: Off the Map, Campfire Stories

## Quiz Questions
**Q1:** Which coffee experience sounds most like your ideal daily cup?
- A) Strong, intense, and high-impact from the first sip. (Bold Explorer)
- B) Balanced, smooth, and reliable every single day. (Smooth Operator)
- C) Soft, comforting, and easy to settle into. (Cozy Classic)
- D) Surprising, unusual, and different every time. (Wild Card)

**Q2:** When choosing coffee, what matters most first?
- A) Power and depth of flavor. (Bold Explorer)
- B) Consistency and drinkability. (Smooth Operator)
- C) Warmth and feel-good familiarity. (Cozy Classic)
- D) Novelty and experimentation. (Wild Card)

**Q3:** Which roast direction do you naturally prefer?
- A) Dark and assertive. (Bold Explorer)
- B) Medium and balanced. (Smooth Operator)
- C) Light-to-medium and gentle. (Cozy Classic)
- D) Varies constantly; I like trying everything. (Wild Card)

**Q4:** How adventurous are you with new coffees?
- A) I will try bold profiles, but still want intensity. (Bold Explorer)
- B) I prefer dependable picks over risky ones. (Smooth Operator)
- C) I like comfort-first choices with occasional variation. (Cozy Classic)
- D) Very adventurous, give me the weirdest option. (Wild Card)

**Q5:** What would make you trust a coffee recommendation most?
- A) It consistently matches my stronger flavor preference. (Bold Explorer)
- B) It repeatedly delivers quality with low misses. (Smooth Operator)
- C) It fits my mood and daily routine. (Cozy Classic)
- D) It introduces new profiles I would not find myself. (Wild Card)

**Q6 (adaptive-tone signal):** Which quiz style feels best to you?
- A) Fast, direct, and no fluff. (Bold Explorer)
- B) Structured and practical. (Smooth Operator)
- C) Warm and personal. (Cozy Classic)
- D) Creative and exploratory. (Wild Card)

## Quiz Logic
- Each answer maps to one personality type.
- Track running counts for all four personalities.
- Final result format: Primary + Secondary personality.
- Primary = highest score.
- Secondary = second-highest score.
- Tie-breaker rule: use Q1 and Q5 answers as tie-break priority.

## Adaptive Question Tone
- Default question style is direct preference.
- Use early response style to lightly adapt microcopy tone in later questions:
  - More direct/business tone for direct-practical patterns.
  - More expressive/abstract tone for exploratory-creative patterns.
- Adaptation changes wording tone only, not scoring structure.

## Visual Style
- Selected style: Minimal (light) preview direction.
- Design intent: clean, modern, high readability, muted coffee-inspired palette.
- UX: clear option cards, visible selection state, simple progress indicator, smooth transitions.

## Extra Features
- Results images: Yes (one hero image per personality result).
- Icons/emoji in options: No.

## Technical Notes
- Build as a modern responsive web app.
- Mobile-first and desktop-friendly.
- Single-page quiz flow with transitions between questions.
- Result view includes personality summary, coffee pairings, and image.
- Prepared for later deployment to a shareable URL.
