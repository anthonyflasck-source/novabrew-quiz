"use client";

import { useMemo, useState } from "react";
import {
  personalities,
  quizQuestions,
  type Option,
  type PersonalityId,
  type Question,
  type ToneMode,
} from "./quizData";

type Stage = "start" | "quiz" | "result";

type RankedPersonality = {
  id: PersonalityId;
  score: number;
  tieWeight: number;
};

const EXPRESSIVE_PERSONALITIES: PersonalityId[] = ["cozy_classic", "wild_card"];

function inferTone(answers: PersonalityId[]): ToneMode {
  if (answers.length < 2) {
    return "direct";
  }

  const firstTwo = answers.slice(0, 2);
  const expressiveCount = firstTwo.filter((choice) =>
    EXPRESSIVE_PERSONALITIES.includes(choice),
  ).length;

  return expressiveCount > 0 ? "expressive" : "direct";
}

function rankPersonalities(answers: PersonalityId[]): RankedPersonality[] {
  const scoreMap: Record<PersonalityId, number> = {
    bold_explorer: 0,
    smooth_operator: 0,
    cozy_classic: 0,
    wild_card: 0,
  };

  answers.forEach((choice) => {
    scoreMap[choice] += 1;
  });

  const tieMap: Record<PersonalityId, number> = {
    bold_explorer: 0,
    smooth_operator: 0,
    cozy_classic: 0,
    wild_card: 0,
  };

  const q1Choice = answers[0];
  const q5Choice = answers[4];

  if (q1Choice) {
    tieMap[q1Choice] += 2;
  }
  if (q5Choice) {
    tieMap[q5Choice] += 1;
  }

  return (Object.keys(scoreMap) as PersonalityId[])
    .map((id) => ({
      id,
      score: scoreMap[id],
      tieWeight: tieMap[id],
    }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.tieWeight - a.tieWeight;
    });
}

function displayPrompt(question: Question, tone: ToneMode) {
  return question.promptByTone?.[tone] ?? question.prompt;
}

function displayHint(question: Question, tone: ToneMode) {
  return question.hintByTone?.[tone] ?? question.hint;
}

function normalizeForResult(name: string) {
  return encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"));
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<PersonalityId[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [resultCopied, setResultCopied] = useState(false);

  const toneMode = useMemo(() => inferTone(answers), [answers]);
  const currentQuestion = quizQuestions[currentQuestionIndex];

  const ranked = useMemo(() => rankPersonalities(answers), [answers]);
  const primary = ranked[0];
  const secondary = ranked[1];

  const primaryProfile = primary ? personalities[primary.id] : null;
  const secondaryProfile = secondary ? personalities[secondary.id] : null;

  const progressPercent = Math.round(
    ((currentQuestionIndex + 1) / quizQuestions.length) * 100,
  );

  const startQuiz = () => {
    setStage("quiz");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setResultCopied(false);
  };

  const resetQuiz = () => {
    setStage("start");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setResultCopied(false);
  };

  const goNext = () => {
    if (!selectedOption) {
      return;
    }

    const nextAnswers = [...answers, selectedOption.personality];
    const nextIndex = currentQuestionIndex + 1;

    setAnswers(nextAnswers);
    setSelectedOption(null);

    if (nextIndex >= quizQuestions.length) {
      setStage("result");
      return;
    }

    setCurrentQuestionIndex(nextIndex);
  };

  const copyResult = async () => {
    if (!primaryProfile || !secondaryProfile) {
      return;
    }

    const shareText =
      `I got ${primaryProfile.name} with ${secondaryProfile.name} tendencies in the NovaBrew Coffee Taste Profile Quiz.` +
      ` My pairings: ${primaryProfile.coffeePairings.join(", ")}.`;

    try {
      await navigator.clipboard.writeText(shareText);
      setResultCopied(true);
    } catch {
      setResultCopied(false);
    }
  };

  if (stage === "start") {
    return (
      <div className="min-h-screen bg-[var(--nb-bg)] px-4 py-10 text-[var(--nb-ink)]">
        <main className="mx-auto max-w-4xl animate-fade-in">
          <section className="rounded-3xl border border-[var(--nb-line)] bg-white p-6 shadow-[0_18px_40px_rgba(39,28,17,0.08)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--nb-muted)]">
              NovaBrew Coffee Co.
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
              Coffee Taste Profile Quiz
            </h1>
            <p className="mt-4 max-w-2xl text-base text-[var(--nb-muted)] sm:text-lg">
              Discover your coffee personality and get tailored NovaBrew coffee
              recommendations based on how you actually like to drink.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {Object.values(personalities).map((profile) => (
                <article
                  key={profile.id}
                  className="rounded-2xl border border-[var(--nb-line)] bg-[var(--nb-soft)] p-4"
                >
                  <h2 className="text-lg font-semibold">{profile.name}</h2>
                  <p className="mt-2 text-sm text-[var(--nb-muted)]">
                    {profile.coffeePairings.join(" + ")}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[var(--nb-muted)]">
                6 questions • Primary + Secondary result
              </p>
              <button
                type="button"
                onClick={startQuiz}
                className="inline-flex items-center justify-center rounded-full bg-[var(--nb-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--nb-accent)] focus:ring-offset-2"
              >
                Start Quiz
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (stage === "quiz") {
    return (
      <div className="min-h-screen bg-[var(--nb-bg)] px-4 py-8 text-[var(--nb-ink)]">
        <main className="mx-auto max-w-3xl">
          <section
            key={currentQuestion.id}
            className="animate-slide-up rounded-3xl border border-[var(--nb-line)] bg-white p-6 shadow-[0_16px_36px_rgba(39,28,17,0.08)] sm:p-8"
          >
            <div className="mb-4 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--nb-muted)]">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </p>
              <p className="text-xs font-semibold text-[var(--nb-muted)]">
                {toneMode === "direct" ? "Direct mode" : "Adaptive mode"}
              </p>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--nb-soft)]">
              <div
                className="h-full rounded-full bg-[var(--nb-accent)] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <h1 className="mt-6 text-2xl font-semibold leading-tight sm:text-3xl">
              {displayPrompt(currentQuestion, toneMode)}
            </h1>
            <p className="mt-3 text-sm text-[var(--nb-muted)] sm:text-base">
              {displayHint(currentQuestion, toneMode)}
            </p>

            <div className="mt-6 space-y-3">
              {currentQuestion.options.map((option) => {
                const active = selectedOption?.text === option.text;
                return (
                  <button
                    key={option.text}
                    type="button"
                    onClick={() => setSelectedOption(option)}
                    className={`w-full rounded-2xl border px-4 py-4 text-left text-sm transition sm:text-base ${
                      active
                        ? "border-[var(--nb-accent)] bg-[var(--nb-soft)] shadow-[0_0_0_3px_rgba(124,90,60,0.15)]"
                        : "border-[var(--nb-line)] bg-white hover:border-[#d4c4b4] hover:bg-[var(--nb-soft)]"
                    }`}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={resetQuiz}
                className="rounded-full border border-[var(--nb-line)] px-4 py-2 text-sm font-medium text-[var(--nb-muted)] transition hover:bg-[var(--nb-soft)]"
              >
                Restart
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!selectedOption}
                className="rounded-full bg-[var(--nb-accent)] px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
              >
                {currentQuestionIndex + 1 === quizQuestions.length
                  ? "Reveal Result"
                  : "Next Question"}
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--nb-bg)] px-4 py-8 text-[var(--nb-ink)]">
      <main className="mx-auto max-w-4xl space-y-5 animate-fade-in">
        <section className="overflow-hidden rounded-3xl border border-[var(--nb-line)] bg-white shadow-[0_18px_40px_rgba(39,28,17,0.08)]">
          {primaryProfile && (
            <img
              src={primaryProfile.imageUrl}
              alt={`${primaryProfile.name} coffee mood`}
              className="h-56 w-full object-cover sm:h-72"
            />
          )}
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--nb-muted)]">
              Your Result
            </p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-5xl">
              {primaryProfile?.name}
              <span className="mt-1 block text-lg font-medium text-[var(--nb-muted)] sm:text-2xl">
                with {secondaryProfile?.name} tendencies
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-[var(--nb-muted)]">
              {primaryProfile?.description}
            </p>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {[primaryProfile, secondaryProfile]
            .filter(Boolean)
            .map((profile) => (
              <article
                key={profile!.id}
                className="rounded-2xl border border-[var(--nb-line)] bg-white p-5"
              >
                <h2 className="text-xl font-semibold">{profile!.name}</h2>
                <p className="mt-2 text-sm text-[var(--nb-muted)]">
                  {profile!.coffeeSummary}
                </p>
                <p className="mt-3 text-sm font-semibold text-[var(--nb-accent)]">
                  Recommended: {profile!.coffeePairings.join(", ")}
                </p>
              </article>
            ))}
        </section>

        <section className="rounded-2xl border border-[var(--nb-line)] bg-white p-5">
          <h3 className="text-lg font-semibold">Result Snapshot</h3>
          <p className="mt-2 text-sm text-[var(--nb-muted)]">
            Primary score: {primary?.score ?? 0} • Secondary score:{" "}
            {secondary?.score ?? 0}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={resetQuiz}
              className="rounded-full bg-[var(--nb-accent)] px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Retake Quiz
            </button>
            <button
              type="button"
              onClick={copyResult}
              className="rounded-full border border-[var(--nb-line)] px-5 py-2 text-sm font-semibold text-[var(--nb-muted)] transition hover:bg-[var(--nb-soft)]"
            >
              {resultCopied ? "Copied" : "Copy result"}
            </button>
            <a
              href={`/?result=${normalizeForResult(primaryProfile?.name ?? "result")}`}
              className="rounded-full border border-[var(--nb-line)] px-5 py-2 text-sm font-semibold text-[var(--nb-muted)] transition hover:bg-[var(--nb-soft)]"
            >
              Share URL view
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
