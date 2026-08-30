package com.lattice.checkers.ai;

/**
 * Named evaluation weight sets that produce distinct strategic behavior.
 * Difficulty (depth/time) is separate from style.
 */
public enum AIProfile {
    AGGRESSOR(
            "Aggressor",
            "Prioritizes captures, pressure, and attacking opportunities.",
            1.40,
            0.70,
            0.85,
            0.90,
            1.20,
            0.80,
            1.30,
            1.10
    ),
    DEFENDER(
            "Defender",
            "Prioritizes piece preservation and defensive positioning.",
            0.85,
            1.40,
            0.95,
            0.75,
            0.70,
            1.35,
            0.80,
            0.90
    ),
    STRATEGIST(
            "Strategist",
            "Prioritizes board control, mobility, and longer-term advantage.",
            1.00,
            1.00,
            1.35,
            1.30,
            0.95,
            1.05,
            1.00,
            1.40
    );

    private final String displayName;
    private final String summary;
    private final double materialWeight;
    private final double preservationWeight;
    private final double positionWeight;
    private final double mobilityWeight;
    private final double threatWeight;
    private final double protectionWeight;
    private final double capturePotentialWeight;
    private final double promotionWeight;

    AIProfile(
            String displayName,
            String summary,
            double materialWeight,
            double preservationWeight,
            double positionWeight,
            double mobilityWeight,
            double threatWeight,
            double protectionWeight,
            double capturePotentialWeight,
            double promotionWeight
    ) {
        this.displayName = displayName;
        this.summary = summary;
        this.materialWeight = materialWeight;
        this.preservationWeight = preservationWeight;
        this.positionWeight = positionWeight;
        this.mobilityWeight = mobilityWeight;
        this.threatWeight = threatWeight;
        this.protectionWeight = protectionWeight;
        this.capturePotentialWeight = capturePotentialWeight;
        this.promotionWeight = promotionWeight;
    }

    public String displayName() {
        return displayName;
    }

    public String summary() {
        return summary;
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
}
