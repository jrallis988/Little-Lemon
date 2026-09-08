package com.lattice.checkers.ai;

/**
 * Shared evaluation knobs for difficulty and (later) AI Lab styles.
 */
public record EvaluationWeights(
        double materialWeight,
        double preservationWeight,
        double positionWeight,
        double mobilityWeight,
        double threatWeight,
        double protectionWeight,
        double capturePotentialWeight,
        double promotionWeight,
        double kingValue
) {
    public static final double MAN_VALUE = 100;

    public static EvaluationWeights from(AIDifficulty difficulty) {
        return new EvaluationWeights(
                difficulty.materialWeight(),
                difficulty.preservationWeight(),
                difficulty.positionWeight(),
                difficulty.mobilityWeight(),
                difficulty.threatWeight(),
                difficulty.protectionWeight(),
                difficulty.capturePotentialWeight(),
                difficulty.promotionWeight(),
                difficulty.kingValue()
        );
    }

    public static EvaluationWeights from(AIProfile profile) {
        return new EvaluationWeights(
                profile.materialWeight(),
                profile.preservationWeight(),
                profile.positionWeight(),
                profile.mobilityWeight(),
                profile.threatWeight(),
                profile.protectionWeight(),
                profile.capturePotentialWeight(),
                profile.promotionWeight(),
                180
        );
    }
}
