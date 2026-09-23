"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Book } from "@/types/book";
import { BookCover } from "@/components/books/BookCover";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import {
  QUIZ_AGES,
  QUIZ_INTERESTS,
  QUIZ_LEVELS,
  QUIZ_TONES,
  recommendBooks,
  type QuizAnswers,
  type QuizInterest,
} from "@/lib/recommend";
import type { AgeRange, ReadingLevel, StoryTone } from "@/types/book";

interface FindABookFlowProps {
  books: Book[];
}

type Step = 0 | 1 | 2 | 3 | 4;

const STEP_TITLES = [
  "Who are we finding a book for?",
  "How confident are they as a reader?",
  "What are they interested in?",
  "What kind of story are they looking for?",
  "Your Next Stories",
];

export function FindABookFlow({ books }: FindABookFlowProps) {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});

  const recommendations = useMemo(() => {
    if (
      !answers.age ||
      !answers.readingLevel ||
      !answers.interest ||
      !answers.tone
    ) {
      return [];
    }
    return recommendBooks(books, answers as QuizAnswers, 3);
  }, [answers, books]);

  const progress = ((step + 1) / 5) * 100;

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10" aria-hidden={step === 4}>
        <div className="flex items-center justify-between gap-4">
          <p className="font-display text-xs font-bold uppercase tracking-wider text-ink-muted">
            Step {Math.min(step + 1, 4)} of 4
          </p>
          {step < 4 && (
            <p className="font-display text-xs font-bold uppercase tracking-wider text-burgundy">
              {Math.round((step / 4) * 100)}% complete
            </p>
          )}
        </div>
        <div
          className="mt-3 h-1 w-full bg-line"
          role="progressbar"
          aria-valuenow={step === 4 ? 100 : progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Quiz progress"
        >
          <div
            className="h-full bg-burgundy transition-all duration-300"
            style={{ width: `${step === 4 ? 100 : (step / 4) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="font-display text-2xl font-bold leading-tight text-ink md:text-3xl">
        {STEP_TITLES[step]}
      </h2>

      {step === 0 && (
        <OptionGrid
          options={QUIZ_AGES.map((o) => ({
            value: o.value,
            label: o.label,
            hint: o.hint,
          }))}
          selected={answers.age}
          onSelect={(age) => {
            setAnswers((a) => ({ ...a, age: age as AgeRange }));
            setStep(1);
          }}
        />
      )}

      {step === 1 && (
        <OptionGrid
          options={QUIZ_LEVELS.map((o) => ({
            value: o.value,
            label: o.label,
            hint: o.hint,
          }))}
          selected={answers.readingLevel}
          onSelect={(readingLevel) => {
            setAnswers((a) => ({
              ...a,
              readingLevel: readingLevel as ReadingLevel,
            }));
            setStep(2);
          }}
          onBack={() => setStep(0)}
        />
      )}

      {step === 2 && (
        <OptionGrid
          options={QUIZ_INTERESTS.map((o) => ({
            value: o.value,
            label: o.label,
          }))}
          selected={answers.interest}
          columns={2}
          onSelect={(interest) => {
            setAnswers((a) => ({
              ...a,
              interest: interest as QuizInterest,
            }));
            setStep(3);
          }}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <OptionGrid
          options={QUIZ_TONES.map((o) => ({
            value: o.value,
            label: o.label,
          }))}
          selected={answers.tone}
          onSelect={(tone) => {
            setAnswers((a) => ({ ...a, tone: tone as StoryTone }));
            setStep(4);
          }}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <div className="mt-8">
          <p className="text-base leading-relaxed text-ink-muted">
            Based on ages {answers.age}, a {answers.readingLevel?.toLowerCase()}{" "}
            reader who likes {answers.interest?.toLowerCase()} and wants something{" "}
            {answers.tone?.toLowerCase()} — here are three titles from our Fall
            2026 collection.
          </p>

          {recommendations.length === 0 ? (
            <p className="mt-8 text-ink-muted">
              We couldn&apos;t find a strong match.{" "}
              <button
                type="button"
                onClick={restart}
                className="font-display text-xs font-bold uppercase tracking-wider text-burgundy underline-offset-2 hover:underline"
              >
                Try again
              </button>
            </p>
          ) : (
            <ul className="mt-10 space-y-10">
              {recommendations.map(({ book, reasons }, index) => (
                <li
                  key={book.slug}
                  className="border-t border-line pt-10 first:border-t-0 first:pt-0"
                >
                  <article className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                    <Link
                      href={`/books/${book.slug}`}
                      className="shrink-0 transition-transform duration-300 hover:-translate-y-1"
                    >
                      <BookCover
                        title={book.title}
                        author={book.author.name}
                        cover={book.cover}
                        size="md"
                      />
                    </Link>
                    <div>
                      <p className="font-display text-xs font-bold uppercase tracking-wider text-amber">
                        Match {index + 1}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-bold text-ink md:text-2xl">
                        <Link
                          href={`/books/${book.slug}`}
                          className="hover:text-burgundy"
                        >
                          {book.title}
                        </Link>
                      </h3>
                      <p className="mt-1 font-accent text-sm text-ink-muted">
                        by {book.author.name}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Tag variant="burgundy">{book.genre}</Tag>
                        <Tag>Ages {book.ageRange}</Tag>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                        {book.hook}
                      </p>
                      <div className="mt-5 border-l-2 border-amber bg-paper/60 py-3 pl-4">
                        <p className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-burgundy">
                          Why we picked this
                        </p>
                        <ul className="mt-2 space-y-1">
                          {reasons.map((reason) => (
                            <li
                              key={reason}
                              className="text-sm leading-relaxed text-ink"
                            >
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        href={`/books/${book.slug}`}
                        variant="ghost"
                        size="sm"
                        className="mt-4"
                      >
                        View Book
                      </Button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 flex flex-wrap gap-4 border-t border-line pt-8">
            <Button type="button" variant="primary" size="md" onClick={restart}>
              Start Over
            </Button>
            <Button href="/books" variant="outline" size="md">
              Browse All Fall Books
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function OptionGrid({
  options,
  selected,
  onSelect,
  onBack,
  columns = 1,
}: {
  options: { value: string; label: string; hint?: string }[];
  selected?: string;
  onSelect: (value: string) => void;
  onBack?: () => void;
  columns?: 1 | 2;
}) {
  return (
    <div className="mt-8">
      <ul
        className={`grid gap-3 ${columns === 2 ? "sm:grid-cols-2" : ""}`}
        role="listbox"
        aria-label="Answer options"
      >
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <li key={option.value} role="option" aria-selected={isSelected}>
              <button
                type="button"
                onClick={() => onSelect(option.value)}
                className={`w-full border px-5 py-4 text-left transition-colors ${
                  isSelected
                    ? "border-burgundy bg-burgundy text-cream"
                    : "border-line bg-paper text-ink hover:border-burgundy hover:bg-cream-dark"
                }`}
              >
                <span className="font-display text-sm font-bold uppercase tracking-wider">
                  {option.label}
                </span>
                {option.hint && (
                  <span
                    className={`mt-1 block text-sm leading-snug ${
                      isSelected ? "text-cream/80" : "text-ink-muted"
                    }`}
                  >
                    {option.hint}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-6 font-display text-xs font-bold uppercase tracking-wider text-ink-muted underline-offset-2 hover:text-burgundy hover:underline"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
