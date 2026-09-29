package com.lattice.checkers.analysis;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.lattice.checkers.engine.RulesEngine;
import com.lattice.checkers.history.BoardSnapshot;
import com.lattice.checkers.history.GameHistory;
import com.lattice.checkers.model.Board;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.model.Side;
import org.junit.jupiter.api.Test;

class MatchAnalyzerTest {

    private final RulesEngine engine = new RulesEngine();

    @Test
    void countsCapturesAndTagsTheFirstCaptureFromHistory() {
        GameState state = empty(Side.DARK);
        state.board().set(new Position(2, 1), new Piece(Side.DARK, PieceRank.MAN));
        state.board().set(new Position(3, 2), new Piece(Side.LIGHT, PieceRank.MAN));
        state.board().set(new Position(5, 0), new Piece(Side.DARK, PieceRank.MAN));

        GameHistory history = new GameHistory();
        history.setInitial(new BoardSnapshot(
                state.board().copy(), state.sideToMove(), state.status(), 0));
        Move jump = engine.legalMoves(state).stream().filter(Move::isJump).findFirst().orElseThrow();
        GameState after = engine.apply(state, jump);
        history.recordMove(state, jump, after);

        MatchAnalyzer.MatchReport report = new MatchAnalyzer().analyze(history);
        assertEquals(1, report.totalMoves());
        assertEquals(1, report.capturesDark());
        assertEquals(0, report.capturesLight());
        assertTrue(report.firstCapture().isPresent());
        assertEquals(jump.notation(), report.firstCapture().orElseThrow().notation());

        var analysis = new MatchAnalyzer().moveAnalyses(history).getFirst();
        assertTrue(analysis.tags().contains("CAPTURE"));
        assertTrue(analysis.tags().contains("FIRST_CAPTURE"));
        assertTrue(analysis.tags().contains("TURNING_POINT"));
    }

    private static GameState empty(Side toMove) {
        return new GameState(new Board(), toMove, GameStatus.IN_PROGRESS);
    }
}
