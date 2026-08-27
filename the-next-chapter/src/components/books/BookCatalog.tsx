"use client";

import { useMemo, useState } from "react";
import type { Book } from "@/types/book";
import { AGE_RANGES, GENRES, INTERESTS } from "@/types/book";
import { filterBooks, type BookFilters } from "@/lib/books";
import { BookCard } from "./BookCard";

const READING_LEVELS = ["Developing", "Comfortable", "Advanced"] as const;

interface BookCatalogProps {
  books: Book[];
}

function FilterGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <fieldset>
      <legend className="font-display text-xs font-bold uppercase tracking-wider text-ink">
        {label}
      </legend>
      <ul className="mt-2 flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((option) => {
          const isActive = selected.includes(option);
          return (
            <li key={option}>
              <button
                type="button"
                onClick={() => toggle(option)}
                aria-pressed={isActive}
                className={`border px-3 py-1.5 font-display text-[0.65rem] font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "border-burgundy bg-burgundy text-cream"
                    : "border-line bg-paper text-ink-muted hover:border-burgundy hover:text-burgundy"
                }`}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

export function BookCatalog({ books }: BookCatalogProps) {
  const [filters, setFilters] = useState<BookFilters>({
    search: "",
    ageRanges: [],
    genres: [],
    interests: [],
    readingLevels: [],
  });

  const filteredBooks = useMemo(
    () => filterBooks(books, filters),
    [books, filters]
  );

  const clearFilters = () => {
    setFilters({
      search: "",
      ageRanges: [],
      genres: [],
      interests: [],
      readingLevels: [],
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.ageRanges.length > 0 ||
    filters.genres.length > 0 ||
    filters.interests.length > 0 ||
    filters.readingLevels.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        <aside className="lg:w-72 lg:shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <label
                htmlFor="book-search"
                className="font-display text-xs font-bold uppercase tracking-wider text-ink"
              >
                Search
              </label>
              <input
                id="book-search"
                type="search"
                value={filters.search}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, search: e.target.value }))
                }
                placeholder="Title, author, theme…"
                className="mt-2 w-full border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-burgundy focus:outline-none"
              />
            </div>

            <FilterGroup
              label="Age"
              options={AGE_RANGES}
              selected={filters.ageRanges}
              onChange={(ageRanges) =>
                setFilters((f) => ({ ...f, ageRanges: ageRanges as BookFilters["ageRanges"] }))
              }
            />

            <FilterGroup
              label="Genre"
              options={GENRES}
              selected={filters.genres}
              onChange={(genres) =>
                setFilters((f) => ({ ...f, genres: genres as BookFilters["genres"] }))
              }
            />

            <FilterGroup
              label="Interest"
              options={INTERESTS}
              selected={filters.interests}
              onChange={(interests) =>
                setFilters((f) => ({
                  ...f,
                  interests: interests as BookFilters["interests"],
                }))
              }
            />

            <FilterGroup
              label="Reading Level"
              options={READING_LEVELS}
              selected={filters.readingLevels}
              onChange={(readingLevels) =>
                setFilters((f) => ({ ...f, readingLevels }))
              }
            />

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="font-display text-xs font-bold uppercase tracking-wider text-burgundy underline-offset-2 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        <div className="flex-1">
          <p
            className="mb-8 font-display text-xs font-bold uppercase tracking-wider text-ink-muted"
            aria-live="polite"
          >
            {filteredBooks.length}{" "}
            {filteredBooks.length === 1 ? "book" : "books"} in the Fall 2026
            collection
          </p>

          {filteredBooks.length === 0 ? (
            <div className="border border-line bg-paper px-8 py-16 text-center">
              <p className="font-display text-lg font-bold text-ink">
                No books match your filters
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                Try adjusting your search or clearing some filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 font-display text-xs font-bold uppercase tracking-wider text-burgundy underline-offset-2 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
              {filteredBooks.map((book) => (
                <li key={book.slug}>
                  <BookCard book={book} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
