package com.lattice.checkers.analysis;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.lattice.checkers.engine.RulesEngine;
import com.lattice.checkers.history.BoardSnapshot;
import com.lattice.checkers.history.GameHistory;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.model.Side;
import org.junit.jupiter.api.Test;

class WhatIfSessionTest {

    private final RulesEngine engine = new RulesEngine();

    @Test
    void branchMovesDoNotChangeTheRecordedMatch() {
        GameState opening = GameState.newGame();
        GameHistory history = recordedOpening(opening);
        int recorded = history.size();
        GameState atStart = history.reconstruct(0);

        WhatIfSession session = new WhatIfSession(history.snapshotAt(0), atStart, engine);
        Move first = engine.legalMoves(atStart).getFirst();
        assertTrue(session.tryMove(first));
        assertEquals(1, session.branchPly());
        assertEquals(recorded, history.size());
        assertEquals(12, history.reconstruct(0).board().count(Side.DARK));
        assertTrue(session.current().board().get(first.to()).isPresent());
        assertTrue(history.reconstruct(0).board().get(first.from()).isPresent());
    }

    @Test
    void illegalMovesAreRejectedAndResetRestoresTheBranchPoint() {
        GameState opening = GameState.newGame();
        GameHistory history = recordedOpening(opening);
        WhatIfSession session = new WhatIfSession(
                history.snapshotAt(0), history.reconstruct(0), engine);

        Move illegal = Move.slide(new Position(0, 1), new Position(1, 2));
        assertFalse(session.tryMove(illegal));
        assertEquals(0, session.branchPly());

        Move legal = engine.legalMoves(session.current()).getFirst();
        assertTrue(session.tryMove(legal));
        session.reset();
        assertEquals(0, session.branchPly());
        assertEquals(Side.DARK, session.current().sideToMove());
        assertEquals(12, session.current().board().count(Side.DARK));
        assertEquals(12, session.current().board().count(Side.LIGHT));
    }

    private GameHistory recordedOpening(GameState opening) {
        GameHistory history = new GameHistory();
        history.setInitial(new BoardSnapshot(
                opening.board().copy(), opening.sideToMove(), opening.status(), 0));
        Move first = engine.legalMoves(opening).getFirst();
        GameState after = engine.apply(opening, first);
        history.recordMove(opening, first, after);
        return history;
    }
}
