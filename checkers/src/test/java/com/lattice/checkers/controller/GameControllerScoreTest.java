package com.lattice.checkers.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.model.Side;
import com.lattice.checkers.score.ScoreEventType;
import org.junit.jupiter.api.Test;

class GameControllerScoreTest {

    @Test
    void capturedCountTracksBoardNotASeparateUiCounter() {
        GameController controller = new GameController();
        controller.startHumanVsHuman("Frog", "Traffic");
        assertEquals(0, controller.capturedCount(Side.DARK));
        assertEquals(0, controller.capturedCount(Side.LIGHT));
        assertEquals(12, controller.remaining(Side.DARK));
        assertEquals(12, controller.remaining(Side.LIGHT));
    }

    @Test
    void resignAwardsMatchBonusButWinnerComesFromGameStatus() {
        GameController controller = new GameController();
        controller.startHumanVsHuman("Frog", "Traffic");
        controller.resign(Side.LIGHT);
        assertEquals(GameStatus.RESIGNED_LIGHT, controller.state().orElseThrow().status());
        assertEquals("Frog wins (Traffic resigned)", controller.statusText());
        assertEquals(500, controller.scoreState().score(Side.DARK));
        assertEquals(0, controller.scoreState().score(Side.LIGHT));
        assertEquals(ScoreEventType.MATCH_WIN, controller.scoreState().lastEvent().orElseThrow().type());
        assertEquals(0, controller.scoreState().moves(Side.DARK));
        assertEquals(0, controller.scoreState().moves(Side.LIGHT));
    }
}
