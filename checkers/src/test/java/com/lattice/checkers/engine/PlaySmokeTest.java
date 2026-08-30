package com.lattice.checkers.engine;

import static org.junit.jupiter.api.Assertions.*;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.model.Side;
import org.junit.jupiter.api.Test;

class PlaySmokeTest {
    @Test
    void humanVsHumanCanAlternateMoves() {
        GameController c = new GameController();
        c.startHumanVsHuman("Dark", "Light");
        // Dark: (2,1) -> (3,0) is typically legal from opening? front row dark at row 2
        c.selectSquare(new Position(2, 1));
        assertFalse(c.legalMovesForSelection().isEmpty());
        Move darkMove = c.legalMovesForSelection().get(0);
        c.applyMove(darkMove);
        assertEquals(Side.LIGHT, c.state().orElseThrow().sideToMove());

        // Select a light piece with moves
        boolean selected = false;
        for (int r = 5; r <= 7 && !selected; r++) {
            for (int col = 0; col < 8 && !selected; col++) {
                if ((r + col) % 2 != 1) continue;
                c.selectSquare(new Position(r, col));
                if (!c.legalMovesForSelection().isEmpty()) {
                    selected = true;
                    Move lightMove = c.legalMovesForSelection().get(0);
                    c.applyMove(lightMove);
                }
            }
        }
        assertTrue(selected);
        assertEquals(Side.DARK, c.state().orElseThrow().sideToMove());
        assertEquals(2, c.moveLog().size());
    }
}
