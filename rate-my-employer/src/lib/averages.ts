import type { CompanyAverages, Review, ReviewScores } from '../types';

const emptyScores: ReviewScores = {
  overall: 0,
  culture: 0,
  pay: 0,
  management: 0,
  workLife: 0,
};

export function averageReviews(reviews: Review[]): CompanyAverages {
  if (reviews.length === 0) {
    return { ...emptyScores, reviewCount: 0, recommendPercent: 0 };
  }

  const totals = reviews.reduce(
    (acc, review) => ({
      overall: acc.overall + review.scores.overall,
      culture: acc.culture + review.scores.culture,
      pay: acc.pay + review.scores.pay,
      management: acc.management + review.scores.management,
      workLife: acc.workLife + review.scores.workLife,
      recommend: acc.recommend + (review.wouldRecommend ? 1 : 0),
    }),
    { ...emptyScores, recommend: 0 },
  );

  const n = reviews.length;
  return {
    overall: round1(totals.overall / n),
    culture: round1(totals.culture / n),
    pay: round1(totals.pay / n),
    management: round1(totals.management / n),
    workLife: round1(totals.workLife / n),
    reviewCount: n,
    recommendPercent: Math.round((totals.recommend / n) * 100),
  };
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}
