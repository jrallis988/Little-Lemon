package com.lattice.checkers.model;

/**
 * Arcade identity layered on engine sides.
 * Dark still moves first (American checkers). Frog is Player One.
 */
public enum Faction {
    FROG(Side.DARK, "FROG", "PLAYER ONE"),
    TRAFFIC(Side.LIGHT, "TRAFFIC", "PLAYER TWO");

    private final Side side;
    private final String displayName;
    private final String playerLabel;

    Faction(Side side, String displayName, String playerLabel) {
        this.side = side;
        this.displayName = displayName;
        this.playerLabel = playerLabel;
    }

    public Side side() {
        return side;
    }

    public String displayName() {
        return displayName;
    }

    public String playerLabel() {
        return playerLabel;
    }

    public static Faction of(Side side) {
        return side == Side.DARK ? FROG : TRAFFIC;
    }
}
