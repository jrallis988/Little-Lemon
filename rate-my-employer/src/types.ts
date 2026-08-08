export type Company = {
  id: string;
  name: string;
  industry: string;
  location: string;
  size: string;
  summary: string;
};

export type ReviewScores = {
  overall: number;
  culture: number;
  pay: number;
  management: number;
  workLife: number;
};

export type Review = {
  id: string;
  companyId: string;
  userId: string;
  authorName: string;
  title: string;
  body: string;
  role: string;
  employmentStatus: 'current' | 'former';
  wouldRecommend: boolean;
  scores: ReviewScores;
  createdAt: string;
};

export type User = {
  id: string;
  email: string;
  displayName: string;
  password: string;
};

export type CompanyAverages = ReviewScores & {
  reviewCount: number;
  recommendPercent: number;
};
