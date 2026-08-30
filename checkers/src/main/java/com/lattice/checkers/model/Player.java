package com.lattice.checkers.model;

import com.lattice.checkers.ai.AIProfile;
import java.util.Objects;
import java.util.Optional;

/**
 * A participant in a match. Computer players carry an {@link AIProfile}.
 */
public final class Player {

    private final Side side;
    private final PlayerKind kind;
    private final String displayName;
    private final AIProfile aiProfile;

    private Player(Side side, PlayerKind kind, String displayName, AIProfile aiProfile) {
        this.side = Objects.requireNonNull(side);
        this.kind = Objects.requireNonNull(kind);
        this.displayName = Objects.requireNonNull(displayName);
        this.aiProfile = aiProfile;
        if (kind == PlayerKind.COMPUTER && aiProfile == null) {
            throw new IllegalArgumentException("computer players require an AI profile");
        }
        if (kind == PlayerKind.HUMAN && aiProfile != null) {
            throw new IllegalArgumentException("human players must not carry an AI profile");
        }
    }

    public static Player human(Side side, String displayName) {
        return new Player(side, PlayerKind.HUMAN, displayName, null);
    }

    public static Player computer(Side side, String displayName, AIProfile profile) {
        return new Player(side, PlayerKind.COMPUTER, displayName, profile);
    }

    public Side side() {
        return side;
    }

    public PlayerKind kind() {
        return kind;
    }

    public String displayName() {
        return displayName;
    }

    public Optional<AIProfile> aiProfile() {
        return Optional.ofNullable(aiProfile);
    }

    public boolean isComputer() {
        return kind == PlayerKind.COMPUTER;
    }
}
