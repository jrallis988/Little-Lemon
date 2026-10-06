package com.lattice.checkers.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.lattice.checkers.ai.AIDifficulty;
import com.lattice.checkers.ai.AIProfile;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Side;
import org.junit.jupiter.api.Test;

class GameControllerAiLabTest {

    @Test
    void bothSidesAreComputersAndFroggerMovesFirst() {
        GameController controller = new GameController();
        controller.startAiVsAi(AIProfile.STRATEGIST, AIProfile.AGGRESSOR, AIDifficulty.EASY);
        assertTrue(controller.isAiVsAi());
        assertTrue(controller.darkPlayer().orElseThrow().isComputer());
        assertTrue(controller.lightPlayer().orElseThrow().isComputer());
        assertEquals(AIProfile.STRATEGIST, controller.darkPlayer().orElseThrow().aiProfile().orElseThrow());
        assertEquals(AIProfile.AGGRESSOR, controller.lightPlayer().orElseThrow().aiProfile().orElseThrow());
        assertEquals(Side.DARK, controller.state().orElseThrow().sideToMove());
        assertTrue(controller.isComputerToMove());
    }

    @Test
    void eachComputerDecisionIsLegalOnTheSharedEngine() {
        GameController controller = new GameController();
        controller.startAiVsAi(AIProfile.DEFENDER, AIProfile.STRATEGIST, AIDifficulty.EASY);
        for (int ply = 0; ply < 6; ply++) {
            assertTrue(controller.isComputerToMove());
            Move move = controller.chooseComputerMove().orElseThrow();
            assertTrue(controller.rulesEngine().isLegal(controller.state().orElseThrow(), move));
            controller.applyMove(move);
            if (controller.state().orElseThrow().status().isTerminal()) {
                break;
            }
        }
        assertTrue(controller.lastAiStats().isPresent());
        assertEquals(AIDifficulty.EASY.searchDepth(), controller.lastAiStats().orElseThrow().depth());
    }

    @Test
    void humanVsHumanClearsTheLabPair() {
        GameController controller = new GameController();
        controller.startAiVsAi(AIProfile.AGGRESSOR, AIProfile.DEFENDER, AIDifficulty.EASY);
        controller.startHumanVsHuman("Frogger", "Traffic");
        assertFalse(controller.isAiVsAi());
        assertFalse(controller.isComputerToMove());
        assertFalse(controller.darkPlayer().orElseThrow().isComputer());
        assertFalse(controller.lightPlayer().orElseThrow().isComputer());
    }
}
