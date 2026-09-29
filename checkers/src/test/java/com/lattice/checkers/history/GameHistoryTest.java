package com.lattice.checkers.history;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.lattice.checkers.engine.RulesEngine;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Side;
import org.junit.jupiter.api.Test;

class GameHistoryTest {

    private final RulesEngine engine = new RulesEngine();

    @Test
    void reconstructsTheOpeningAndEachRecordedPly() {
        GameState state = GameState.newGame();
        GameHistory history = new GameHistory();
        history.setInitial(new BoardSnapshot(
                state.board().copy(), state.sideToMove(), state.status(), 0));

        Move first = engine.legalMoves(state).getFirst();
        GameState afterFirst = engine.apply(state, first);
        history.recordMove(state, first, afterFirst);

        Move second = engine.legalMoves(afterFirst).getFirst();
        GameState afterSecond = engine.apply(afterFirst, second);
        history.recordMove(afterFirst, second, afterSecond);

        GameState opening = history.reconstruct(0);
        assertEquals(12, opening.board().count(Side.DARK));
        assertEquals(12, opening.board().count(Side.LIGHT));
        assertEquals(Side.DARK, opening.sideToMove());

        GameState plyOne = history.reconstruct(1);
        assertTrue(plyOne.board().get(first.to()).isPresent());
        assertTrue(plyOne.board().get(first.from()).isEmpty());
        assertEquals(afterFirst.sideToMove(), plyOne.sideToMove());

        GameState plyTwo = history.reconstruct(2);
        assertTrue(plyTwo.board().get(second.to()).isPresent());
        assertEquals(2, history.size());
    }
}
