package com.lattice.checkers.ai;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.lattice.checkers.engine.RulesEngine;
import com.lattice.checkers.model.Board;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.model.Side;
import java.util.List;
import java.util.Random;
import org.junit.jupiter.api.Test;

class CheckersAITest {

    private final RulesEngine engine = new RulesEngine();

    @Test
    void everyDifficultyChoosesALegalOpeningMove() {
        GameState state = GameState.newGame();
        List<Move> legal = engine.legalMoves(state);
        for (AIDifficulty difficulty : AIDifficulty.values()) {
            CheckersAI ai = new CheckersAI(engine, difficulty, new Random(7));
            Move move = ai.chooseMove(state).orElseThrow();
            assertTrue(legal.contains(move), difficulty + " chose " + move.notation());
            assertTrue(engine.isLegal(state, move));
        }
    }

    @Test
    void easyNeverMakesAnIllegalMoveWhenACaptureIsForced() {
        GameState state = empty(Side.DARK);
        state.board().set(new Position(2, 1), new Piece(Side.DARK, PieceRank.MAN));
        state.board().set(new Position(3, 2), new Piece(Side.LIGHT, PieceRank.MAN));
        CheckersAI easy = new CheckersAI(engine, AIDifficulty.EASY, new Random(3));
        Move move = easy.chooseMove(state).orElseThrow();
        assertTrue(move.isJump());
        assertTrue(engine.isLegal(state, move));
        assertTrue(engine.legalMoves(state).stream().allMatch(Move::isJump));
    }

    @Test
    void hardPrefersWinningMaterialOverAQuietSlide() {
        GameState state = empty(Side.DARK);
        state.board().set(new Position(2, 1), new Piece(Side.DARK, PieceRank.MAN));
        state.board().set(new Position(3, 2), new Piece(Side.LIGHT, PieceRank.MAN));
        state.board().set(new Position(5, 0), new Piece(Side.DARK, PieceRank.MAN));
        CheckersAI hard = new CheckersAI(engine, AIDifficulty.HARD, new Random(1));
        Move move = hard.chooseMove(state).orElseThrow();
        assertTrue(move.isJump(), "Hard should take the forced/winning capture");
    }

    @Test
    void evaluationPrefersAKingAdvantage() {
        EvaluationFunction eval = new EvaluationFunction(AIDifficulty.HARD);
        GameState even = empty(Side.DARK);
        even.board().set(new Position(3, 2), new Piece(Side.DARK, PieceRank.MAN));
        even.board().set(new Position(4, 5), new Piece(Side.LIGHT, PieceRank.MAN));
        GameState kinged = empty(Side.DARK);
        kinged.board().set(new Position(3, 2), new Piece(Side.DARK, PieceRank.KING));
        kinged.board().set(new Position(4, 5), new Piece(Side.LIGHT, PieceRank.MAN));
        assertTrue(eval.evaluate(kinged, Side.DARK) > eval.evaluate(even, Side.DARK));
    }

    @Test
    void humanVsComputerDoesNotChangeTheRules() {
        GameState state = GameState.newGame();
        assertEquals(12, state.board().count(Side.DARK));
        assertEquals(12, state.board().count(Side.LIGHT));
        assertEquals(8, Position.BOARD_SIZE);
        assertTrue(engine.hasForcedCapture(capturePosition())
                || engine.legalMoves(capturePosition()).stream().allMatch(Move::isJump));
    }

    private GameState capturePosition() {
        GameState state = empty(Side.DARK);
        state.board().set(new Position(2, 1), new Piece(Side.DARK, PieceRank.MAN));
        state.board().set(new Position(3, 2), new Piece(Side.LIGHT, PieceRank.MAN));
        return state;
    }

    private static GameState empty(Side toMove) {
        return new GameState(new Board(), toMove, GameStatus.IN_PROGRESS);
    }
}
