package com.lattice.checkers.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.lattice.checkers.ai.AIDifficulty;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Side;
import org.junit.jupiter.api.Test;

class GameControllerComputerTest {

    @Test
    void humanVsComputerUsesTheChosenDifficultyAndDoesNotMoveFirstForFrog() {
        GameController controller = new GameController();
        controller.startHumanVsComputer("Frog", AIDifficulty.EASY, true);
        assertEquals(AIDifficulty.EASY, controller.computerDifficulty().orElseThrow());
        assertFalse(controller.isComputerToMove());
        assertEquals(Side.DARK, controller.state().orElseThrow().sideToMove());
        assertTrue(controller.lightPlayer().orElseThrow().isComputer());
        assertFalse(controller.darkPlayer().orElseThrow().isComputer());
    }

    @Test
    void computerReplyIsLegalAndUsesTheEngine() {
        GameController controller = new GameController();
        controller.startHumanVsComputer("Frog", AIDifficulty.MEDIUM, true);
        var legal = controller.rulesEngine().legalMoves(controller.state().orElseThrow());
        controller.applyMove(legal.getFirst());
        assertTrue(controller.isComputerToMove());
        Move reply = controller.chooseComputerMove().orElseThrow();
        assertTrue(controller.rulesEngine().isLegal(controller.state().orElseThrow(), reply));
    }
}
