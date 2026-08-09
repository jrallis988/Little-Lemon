import type { AcademicContentTier } from "@/types";
import corpusJson from "@/data/educational_corpus.json";

export type CorpusEntry = {
  id: string;
  title: string;
  url: string;
  domain: string;
  publisher: string;
  contentTier: AcademicContentTier;
  gradeMin: number;
  gradeMax: number;
  abstractText: string;
  vocabulary: string[];
  citation: string;
  topics: string[];
  keywords: string[];
  baseLegitimacy: number;
};

export const EDUCATIONAL_CORPUS: CorpusEntry[] = corpusJson as CorpusEntry[];

export function corpusById(id: string): CorpusEntry | undefined {
  return EDUCATIONAL_CORPUS.find((entry) => entry.id === id);
}
