package com.lattice.checkers.score;

/**
 * Arcade score events derived from legitimate checkers play.
 * These never determine the match winner.
 */
public enum ScoreEventType {
    CAPTURE,
    KING_CAPTURE,
    MULTI_JUMP,
    KING_PROMOTION,
    MATCH_WIN
}
