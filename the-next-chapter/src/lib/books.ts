import type { AgeRange, Book, Genre, Interest } from "@/types/book";

export interface BookFilters {
  search: string;
  ageRanges: AgeRange[];
  genres: Genre[];
  interests: Interest[];
  readingLevels: string[];
}

export function filterBooks(books: Book[], filters: BookFilters): Book[] {
  return books.filter((book) => {
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const searchable = [
        book.title,
        book.author.name,
        book.genre,
        book.synopsis,
        book.hook,
        ...book.themes,
        ...book.interests,
      ]
        .join(" ")
        .toLowerCase();
      if (!searchable.includes(query)) return false;
    }

    if (
      filters.ageRanges.length > 0 &&
      !filters.ageRanges.includes(book.ageRange)
    ) {
      return false;
    }

    if (filters.genres.length > 0 && !filters.genres.includes(book.genre)) {
      return false;
    }

    if (
      filters.interests.length > 0 &&
      !book.interests.some((i) => filters.interests.includes(i))
    ) {
      return false;
    }

    if (
      filters.readingLevels.length > 0 &&
      !filters.readingLevels.includes(book.readingLevel)
    ) {
      return false;
    }

    return true;
  });
}

export function countActiveFilters(filters: BookFilters): number {
  return (
    filters.ageRanges.length +
    filters.genres.length +
    filters.interests.length +
    filters.readingLevels.length +
    (filters.search ? 1 : 0)
  );
}
