package com.lattice.checkers.ai;

/**
 * Computer strength for Human vs Computer. Difficulty changes search quality
 * only — never the rules, board, scoring, or win conditions.
 *
 * <p>Expert may be added later if Hard proves too weak. Do not surface it yet.
 */
public enum AIDifficulty {
    EASY(
            "Easy",
            "Learning the game",
            2,
            1.00,
            0.65,
            0.50,
            0.45,
            0.55,
            0.50,
            0.60,
            0.55,
            155,
            85.0,
            false
    ),
    MEDIUM(
            "Medium",
            "Balanced challenge",
            4,
            1.10,
            1.00,
            1.10,
            1.05,
            1.00,
            1.00,
            1.10,
            1.20,
            185,
            0.0,
            true
    ),
    HARD(
            "Hard",
            "Strategic opponent",
            6,
            1.20,
            1.15,
            1.40,
            1.30,
            1.25,
            1.25,
            1.30,
            1.55,
            230,
            0.0,
            true
    );

    private final String displayName;
    private final String summary;
    private final int searchDepth;
    private final double materialWeight;
    private final double preservationWeight;
    private final double positionWeight;
    private final double mobilityWeight;
    private final double threatWeight;
    private final double protectionWeight;
    private final double capturePotentialWeight;
    private final double promotionWeight;
    private final double kingValue;
    private final double rootChoiceMargin;
    private final boolean quiescence;

    AIDifficulty(
            String displayName,
            String summary,
            int searchDepth,
            double materialWeight,
            double preservationWeight,
            double positionWeight,
            double mobilityWeight,
            double threatWeight,
            double protectionWeight,
            double capturePotentialWeight,
            double promotionWeight,
            double kingValue,
            double rootChoiceMargin,
            boolean quiescence
    ) {
        this.displayName = displayName;
        this.summary = summary;
        this.searchDepth = searchDepth;
        this.materialWeight = materialWeight;
        this.preservationWeight = preservationWeight;
        this.positionWeight = positionWeight;
        this.mobilityWeight = mobilityWeight;
        this.threatWeight = threatWeight;
        this.protectionWeight = protectionWeight;
        this.capturePotentialWeight = capturePotentialWeight;
        this.promotionWeight = promotionWeight;
        this.kingValue = kingValue;
        this.rootChoiceMargin = rootChoiceMargin;
        this.quiescence = quiescence;
    }

    public static AIDifficulty defaultDifficulty() {
        return MEDIUM;
    }

    public String displayName() {
        return displayName;
    }

    public String summary() {
        return summary;
    }

    public int searchDepth() {
        return searchDepth;
    }

    public double materialWeight() {
        return materialWeight;
    }

    public double preservationWeight() {
        return preservationWeight;
    }

    public double positionWeight() {
        return positionWeight;
    }

    public double mobilityWeight() {
        return mobilityWeight;
    }

    public double threatWeight() {
        return threatWeight;
    }

    public double protectionWeight() {
        return protectionWeight;
    }

    public double capturePotentialWeight() {
        return capturePotentialWeight;
    }

    public double promotionWeight() {
        return promotionWeight;
    }

    public double kingValue() {
        return kingValue;
    }

    /**
     * Easy may pick any root move within this eval window of the best.
     * Medium/Hard use {@code 0} and always take the best move found.
     */
    public double rootChoiceMargin() {
        return rootChoiceMargin;
    }

    public boolean usesQuiescence() {
        return quiescence;
    }

    public boolean alwaysChoosesBestMove() {
        return rootChoiceMargin <= 0;
    }
}
