package com.lattice.checkers.model;

/**
 * Lifecycle status of a match.
 */
public enum GameStatus {
    NOT_STARTED,
    IN_PROGRESS,
    DARK_WINS,
    LIGHT_WINS,
    RESIGNED_DARK,
    RESIGNED_LIGHT;

    public boolean isTerminal() {
        return this != NOT_STARTED && this != IN_PROGRESS;
    }
}
