package com.lattice.checkers.score;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.lattice.checkers.model.Side;
import java.util.List;
import org.junit.jupiter.api.Test;

class ScoreManagerTest {

    @Test
    void normalCaptureAwardsConfiguredPoints() {
        ScoreManager manager = new ScoreManager();
        List<ScoreEvent> events = manager.recordPly(Side.DARK, 1, 0, false, true, false);
        assertEquals(100, manager.state().score(Side.DARK));
        assertEquals(0, manager.state().score(Side.LIGHT));
        assertEquals("JUMP!", events.getFirst().banner());
        assertEquals(1, manager.state().bestCombo(Side.DARK));
    }

    @Test
    void kingCaptureAndPromotionAreSeparate() {
        ScoreManager manager = new ScoreManager();
        manager.recordPly(Side.LIGHT, 0, 1, true, true, false);
        assertEquals(150 + 250, manager.state().score(Side.LIGHT));
        assertEquals(1, manager.state().kingsCreated(Side.LIGHT));
    }

    @Test
    void continuationJumpsShareOneCombo() {
        ScoreManager manager = new ScoreManager();
        manager.recordPly(Side.DARK, 1, 0, false, false, false);
        manager.recordPly(Side.DARK, 1, 0, false, true, false);
        assertEquals(2, manager.state().bestCombo(Side.DARK));
        assertEquals(100 + 150, manager.state().score(Side.DARK)); // 100 then 100+50 combo bonus
        assertEquals(1, manager.state().moves(Side.DARK));
    }

    @Test
    void matchWinBonusDoesNotReplaceCheckersResult() {
        ScoreManager manager = new ScoreManager();
        manager.recordPly(Side.DARK, 0, 0, false, true, true);
        assertEquals(500, manager.state().score(Side.DARK));
        assertTrue(manager.state().lastEvent().isPresent());
        assertEquals(ScoreEventType.MATCH_WIN, manager.state().lastEvent().orElseThrow().type());
    }
}
