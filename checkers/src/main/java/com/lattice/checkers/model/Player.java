package com.lattice.checkers.model;

import com.lattice.checkers.ai.AIDifficulty;
import com.lattice.checkers.ai.AIProfile;
import java.util.Objects;
import java.util.Optional;

/**
 * A participant in a match. Computer players carry a difficulty (and optional style).
 */
public final class Player {

    private final Side side;
    private final PlayerKind kind;
    private final String displayName;
    private final AIProfile aiProfile;
    private final AIDifficulty difficulty;

    private Player(
            Side side,
            PlayerKind kind,
            String displayName,
            AIProfile aiProfile,
            AIDifficulty difficulty
    ) {
        this.side = Objects.requireNonNull(side);
        this.kind = Objects.requireNonNull(kind);
        this.displayName = Objects.requireNonNull(displayName);
        this.aiProfile = aiProfile;
        this.difficulty = difficulty;
        if (kind == PlayerKind.COMPUTER && difficulty == null && aiProfile == null) {
            throw new IllegalArgumentException("computer players require a difficulty or AI profile");
        }
        if (kind == PlayerKind.HUMAN && (aiProfile != null || difficulty != null)) {
            throw new IllegalArgumentException("human players must not carry AI configuration");
        }
    }

    public static Player human(Side side, String displayName) {
        return new Player(side, PlayerKind.HUMAN, displayName, null, null);
    }

    public static Player computer(Side side, String displayName, AIDifficulty difficulty) {
        return new Player(side, PlayerKind.COMPUTER, displayName, null, Objects.requireNonNull(difficulty));
    }

    public static Player computer(Side side, String displayName, AIProfile profile) {
        return new Player(
                side,
                PlayerKind.COMPUTER,
                displayName,
                Objects.requireNonNull(profile),
                AIDifficulty.MEDIUM
        );
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

    public Optional<AIDifficulty> difficulty() {
        return Optional.ofNullable(difficulty);
    }

    public boolean isComputer() {
        return kind == PlayerKind.COMPUTER;
    }
}
