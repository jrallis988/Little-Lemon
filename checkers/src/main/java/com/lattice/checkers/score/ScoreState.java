package com.lattice.checkers.score;

import com.lattice.checkers.model.Side;
import java.util.Optional;

/**
 * Authoritative arcade score and combo totals. Winner is still {@code GameStatus}.
 */
public final class ScoreState {

    private int frogScore;
    private int trafficScore;
    private int frogCaptures;
    private int trafficCaptures;
    private int frogKings;
    private int trafficKings;
    private int frogMoves;
    private int trafficMoves;
    private int frogBestCombo;
    private int trafficBestCombo;
    private int currentCombo;
    private ScoreEvent lastEvent;

    public int score(Side side) {
        return side == Side.DARK ? frogScore : trafficScore;
    }

    public int captures(Side side) {
        return side == Side.DARK ? frogCaptures : trafficCaptures;
    }

    public int kingsCreated(Side side) {
        return side == Side.DARK ? frogKings : trafficKings;
    }

    public int moves(Side side) {
        return side == Side.DARK ? frogMoves : trafficMoves;
    }

    public int bestCombo(Side side) {
        return side == Side.DARK ? frogBestCombo : trafficBestCombo;
    }

    public int currentCombo() {
        return currentCombo;
    }

    public Optional<ScoreEvent> lastEvent() {
        return Optional.ofNullable(lastEvent);
    }

    void addScore(Side side, int points) {
        if (side == Side.DARK) {
            frogScore += points;
        } else {
            trafficScore += points;
        }
    }

    void addCaptures(Side side, int count) {
        if (side == Side.DARK) {
            frogCaptures += count;
        } else {
            trafficCaptures += count;
        }
    }

    void addKing(Side side) {
        if (side == Side.DARK) {
            frogKings++;
        } else {
            trafficKings++;
        }
    }

    void addMove(Side side) {
        if (side == Side.DARK) {
            frogMoves++;
        } else {
            trafficMoves++;
        }
    }

    void setCurrentCombo(int combo) {
        this.currentCombo = combo;
    }

    void noteBestCombo(Side side, int combo) {
        if (side == Side.DARK) {
            frogBestCombo = Math.max(frogBestCombo, combo);
        } else {
            trafficBestCombo = Math.max(trafficBestCombo, combo);
        }
    }

    void setLastEvent(ScoreEvent event) {
        this.lastEvent = event;
    }

    void reset() {
        frogScore = trafficScore = 0;
        frogCaptures = trafficCaptures = 0;
        frogKings = trafficKings = 0;
        frogMoves = trafficMoves = 0;
        frogBestCombo = trafficBestCombo = 0;
        currentCombo = 0;
        lastEvent = null;
    }
}
