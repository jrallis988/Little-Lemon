package com.lattice.checkers.engine;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.lattice.checkers.model.Board;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.model.Side;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class RulesEngineTest {

    private RulesEngine engine;

    @BeforeEach
    void setUp() {
        engine = new RulesEngine();
    }

    @Test
    void initialPositionHasTwelvePiecesEachAndDarkToMove() {
        GameState state = GameState.newGame();
        assertEquals(12, state.board().count(Side.DARK));
        assertEquals(12, state.board().count(Side.LIGHT));
        assertEquals(Side.DARK, state.sideToMove());
        assertFalse(engine.legalMoves(state).isEmpty());
    }

    @Test
    void manCanSlideDiagonallyForward() {
        GameState state = emptyInProgress(Side.DARK);
        state.board().set(new Position(2, 1), new Piece(Side.DARK, PieceRank.MAN));
        List<Move> moves = engine.legalMovesFrom(state, new Position(2, 1));
        assertTrue(moves.stream().anyMatch(m -> m.to().equals(new Position(3, 0))));
        assertTrue(moves.stream().anyMatch(m -> m.to().equals(new Position(3, 2))));
    }

    @Test
    void manCannotSlideBackward() {
        GameState state = emptyInProgress(Side.DARK);
        state.board().set(new Position(3, 2), new Piece(Side.DARK, PieceRank.MAN));
        List<Move> moves = engine.legalMovesFrom(state, new Position(3, 2));
        assertTrue(moves.stream().noneMatch(m -> m.to().row() < 3));
    }

    @Test
    void illegalSlideRejected() {
        GameState state = GameState.newGame();
        Move illegal = Move.slide(new Position(2, 1), new Position(4, 3));
        assertFalse(engine.isLegal(state, illegal));
        assertThrows(IllegalArgumentException.class, () -> engine.apply(state, illegal));
    }

    @Test
    void captureIsMandatoryWhenAvailable() {
        GameState state = emptyInProgress(Side.DARK);
        state.board().set(new Position(2, 1), new Piece(Side.DARK, PieceRank.MAN));
        state.board().set(new Position(3, 2), new Piece(Side.LIGHT, PieceRank.MAN));
        // Also a quiet slide square exists at (3,0)
        List<Move> moves = engine.legalMoves(state);
        assertFalse(moves.isEmpty());
        assertTrue(moves.stream().allMatch(Move::isJump));
        assertTrue(engine.hasForcedCapture(state));
    }

    @Test
    void singleCaptureRemovesPieceAndSwitchesTurn() {
        GameState state = emptyInProgress(Side.DARK);
        state.board().set(new Position(2, 1), new Piece(Side.DARK, PieceRank.MAN));
        state.board().set(new Position(3, 2), new Piece(Side.LIGHT, PieceRank.MAN));
        Move jump = Move.jump(new Position(2, 1), new Position(4, 3));
        GameState next = engine.apply(state, jump);
        assertTrue(next.board().isEmpty(new Position(3, 2)));
        assertTrue(next.board().get(new Position(4, 3)).isPresent());
        assertEquals(Side.LIGHT, next.sideToMove());
    }

    @Test
    void multiJumpCanBeAppliedAsFullPath() {
        GameState state = emptyInProgress(Side.DARK);
        state.board().set(new Position(1, 0), new Piece(Side.DARK, PieceRank.MAN));
        state.board().set(new Position(2, 1), new Piece(Side.LIGHT, PieceRank.MAN));
        state.board().set(new Position(4, 3), new Piece(Side.LIGHT, PieceRank.MAN));
        Move multi = Move.jump(new Position(1, 0), new Position(3, 2), new Position(5, 4));
        assertTrue(engine.isLegal(state, multi));
        GameState next = engine.apply(state, multi);
        assertTrue(next.board().isEmpty(new Position(2, 1)));
        assertTrue(next.board().isEmpty(new Position(4, 3)));
        assertEquals(Side.LIGHT, next.sideToMove());
    }

    @Test
    void kingMovesBackwardAndForward() {
        GameState state = emptyInProgress(Side.DARK);
        state.board().set(new Position(3, 2), new Piece(Side.DARK, PieceRank.KING));
        List<Move> moves = engine.legalMovesFrom(state, new Position(3, 2));
        assertTrue(moves.stream().anyMatch(m -> m.to().equals(new Position(2, 1))));
        assertTrue(moves.stream().anyMatch(m -> m.to().equals(new Position(4, 1))));
    }

    @Test
    void manPromotesOnBackRank() {
        GameState state = emptyInProgress(Side.DARK);
        state.board().set(new Position(6, 1), new Piece(Side.DARK, PieceRank.MAN));
        Move slide = Move.slide(new Position(6, 1), new Position(7, 0));
        GameState next = engine.apply(state, slide);
        assertTrue(next.board().get(new Position(7, 0)).orElseThrow().isKing());
    }

    @Test
    void noLegalMovesLoses() {
        GameState state = emptyInProgress(Side.LIGHT);
        // Dark piece exists but light has a blocked man with no moves and no captures
        state.board().set(new Position(0, 1), new Piece(Side.DARK, PieceRank.MAN));
        state.board().set(new Position(7, 0), new Piece(Side.LIGHT, PieceRank.MAN));
        // Block forward diagonals for light man at 7,0 (would need row 6)
        state.board().set(new Position(6, 1), new Piece(Side.DARK, PieceRank.MAN));
        GameState after = engine.apply(
                emptyInProgress(Side.DARK).also(s -> {
                    s.board().set(new Position(5, 0), new Piece(Side.DARK, PieceRank.MAN));
                    s.board().set(new Position(7, 0), new Piece(Side.LIGHT, PieceRank.MAN));
                    s.board().set(new Position(6, 1), new Piece(Side.LIGHT, PieceRank.MAN));
                }),
                Move.slide(new Position(5, 0), new Position(6, -1)));
        // Use a clearer constructed scenario instead:
        GameState trapped = emptyInProgress(Side.LIGHT);
        trapped.board().set(new Position(0, 1), new Piece(Side.DARK, PieceRank.KING));
        trapped.board().set(new Position(7, 0), new Piece(Side.LIGHT, PieceRank.MAN));
        trapped.board().set(new Position(6, 1), new Piece(Side.DARK, PieceRank.MAN));
        assertTrue(engine.legalMoves(trapped).isEmpty());
        // Applying a dark move that leaves light with no moves
        GameState darkTurn = emptyInProgress(Side.DARK);
        darkTurn.board().set(new Position(5, 2), new Piece(Side.DARK, PieceRank.MAN));
        darkTurn.board().set(new Position(7, 0), new Piece(Side.LIGHT, PieceRank.MAN));
        darkTurn.board().set(new Position(6, 1), new Piece(Side.DARK, PieceRank.MAN));
        GameState result = engine.apply(darkTurn, Move.slide(new Position(5, 2), new Position(6, 3)));
        assertEquals(GameStatus.DARK_WINS, result.status());
    }

    @Test
    void resignSetsStatus() {
        GameState state = GameState.newGame();
        GameState resigned = engine.resign(state, Side.DARK);
        assertEquals(GameStatus.RESIGNED_DARK, resigned.status());
    }

    @Test
    void edgeCaptureWorks() {
        GameState state = emptyInProgress(Side.DARK);
        state.board().set(new Position(2, 1), new Piece(Side.DARK, PieceRank.MAN));
        state.board().set(new Position(3, 0), new Piece(Side.LIGHT, PieceRank.MAN));
        // Cannot capture off-board over (3,0) toward col -1 — no legal jump that way
        List<Move> moves = engine.legalMoves(state);
        assertTrue(moves.stream().noneMatch(m -> m.to().col() < 0));
        // Capture inward
        state.board().clear(new Position(3, 0));
        state.board().set(new Position(3, 2), new Piece(Side.LIGHT, PieceRank.MAN));
        Move jump = Move.jump(new Position(2, 1), new Position(4, 3));
        assertTrue(engine.isLegal(state, jump));
    }

    private static GameState emptyInProgress(Side side) {
        return new GameState(new Board(), side, GameStatus.IN_PROGRESS);
    }
}
