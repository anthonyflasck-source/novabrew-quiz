export type PersonalityId =
  | "bold_explorer"
  | "smooth_operator"
  | "cozy_classic"
  | "wild_card";

export type ToneMode = "direct" | "expressive";

export interface Option {
  text: string;
  personality: PersonalityId;
}

export interface Question {
  id: string;
  prompt: string;
  promptByTone?: Partial<Record<ToneMode, string>>;
  hint: string;
  hintByTone?: Partial<Record<ToneMode, string>>;
  options: Option[];
}

export interface PersonalityProfile {
  id: PersonalityId;
  name: string;
  description: string;
  coffeePairings: string[];
  coffeeSummary: string;
  imageUrl: string;
}

export const personalities: Record<PersonalityId, PersonalityProfile> = {
  bold_explorer: {
    id: "bold_explorer",
    name: "Bold Explorer",
    description:
      "You love intensity, depth, and confident flavor profiles. You want coffee that shows up with presence and purpose.",
    coffeePairings: ["Double Down", "The Purist"],
    coffeeSummary:
      "Dark, assertive, and high-impact picks designed for strong coffee moments.",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80",
  },
  smooth_operator: {
    id: "smooth_operator",
    name: "Smooth Operator",
    description:
      "You value balance, consistency, and a dependable daily cup. You want high quality with low friction.",
    coffeePairings: ["Midnight Summit", "Golden Hour"],
    coffeeSummary:
      "Reliable, smooth-forward recommendations with a clean and balanced finish.",
    imageUrl:
      "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1600&q=80",
  },
  cozy_classic: {
    id: "cozy_classic",
    name: "Cozy Classic",
    description:
      "You prioritize comfort and ritual. Your perfect cup fits calm routines and familiar, mood-friendly flavor profiles.",
    coffeePairings: ["Sunrise Blend", "Wildflower"],
    coffeeSummary:
      "Gentle, comforting pairings built for warm starts and low-stress coffee rituals.",
    imageUrl:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80",
  },
  wild_card: {
    id: "wild_card",
    name: "Wild Card",
    description:
      "You are discovery-driven and curious. You want unusual profiles, new origins, and coffees that keep things interesting.",
    coffeePairings: ["Off the Map", "Campfire Stories"],
    coffeeSummary:
      "Experimental, rotating picks with adventurous flavor arcs and creative edge.",
    imageUrl:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80",
  },
};

export const quizQuestions: Question[] = [
  {
    id: "q1",
    prompt: "Which coffee experience sounds most like your ideal daily cup?",
    hint: "Choose the option that sounds most like your ideal daily experience.",
    options: [
      {
        text: "Strong, intense, and high-impact from the first sip.",
        personality: "bold_explorer",
      },
      {
        text: "Balanced, smooth, and reliable every single day.",
        personality: "smooth_operator",
      },
      {
        text: "Soft, comforting, and easy to settle into.",
        personality: "cozy_classic",
      },
      {
        text: "Surprising, unusual, and different every time.",
        personality: "wild_card",
      },
    ],
  },
  {
    id: "q2",
    prompt: "When choosing coffee, what matters most first?",
    hint: "Go with your first instinct here.",
    options: [
      {
        text: "Power and depth of flavor.",
        personality: "bold_explorer",
      },
      {
        text: "Consistency and drinkability.",
        personality: "smooth_operator",
      },
      {
        text: "Warmth and feel-good familiarity.",
        personality: "cozy_classic",
      },
      {
        text: "Novelty and experimentation.",
        personality: "wild_card",
      },
    ],
  },
  {
    id: "q3",
    prompt: "Which roast direction do you naturally prefer?",
    hint: "This helps us map your core flavor lane.",
    options: [
      {
        text: "Dark and assertive.",
        personality: "bold_explorer",
      },
      {
        text: "Medium and balanced.",
        personality: "smooth_operator",
      },
      {
        text: "Light-to-medium and gentle.",
        personality: "cozy_classic",
      },
      {
        text: "Varies constantly; I like trying everything.",
        personality: "wild_card",
      },
    ],
  },
  {
    id: "q4",
    prompt: "How adventurous are you with new coffees?",
    hint: "Think about your actual buying behavior month to month.",
    options: [
      {
        text: "I will try bold profiles, but still want intensity.",
        personality: "bold_explorer",
      },
      {
        text: "I prefer dependable picks over risky ones.",
        personality: "smooth_operator",
      },
      {
        text: "I like comfort-first choices with occasional variation.",
        personality: "cozy_classic",
      },
      {
        text: "Very adventurous, give me the weirdest option.",
        personality: "wild_card",
      },
    ],
  },
  {
    id: "q5",
    prompt: "What would make you trust a coffee recommendation most?",
    promptByTone: {
      expressive: "What would make a recommendation feel like it truly gets you?",
    },
    hint: "This helps us tune long-term loyalty, not just first impressions.",
    hintByTone: {
      expressive: "This helps us personalize for how you want to feel over time.",
    },
    options: [
      {
        text: "It consistently matches my stronger flavor preference.",
        personality: "bold_explorer",
      },
      {
        text: "It repeatedly delivers quality with low misses.",
        personality: "smooth_operator",
      },
      {
        text: "It fits my mood and daily routine.",
        personality: "cozy_classic",
      },
      {
        text: "It introduces new profiles I would not find myself.",
        personality: "wild_card",
      },
    ],
  },
  {
    id: "q6",
    prompt: "Which quiz style feels best to you?",
    promptByTone: {
      expressive: "What kind of quiz voice feels most like your personality?",
    },
    hint: "This helps us tune communication style while keeping recommendations accurate.",
    hintByTone: {
      expressive: "This helps us personalize your experience tone, not just your result.",
    },
    options: [
      {
        text: "Fast, direct, and no fluff.",
        personality: "bold_explorer",
      },
      {
        text: "Structured and practical.",
        personality: "smooth_operator",
      },
      {
        text: "Warm and personal.",
        personality: "cozy_classic",
      },
      {
        text: "Creative and exploratory.",
        personality: "wild_card",
      },
    ],
  },
];
