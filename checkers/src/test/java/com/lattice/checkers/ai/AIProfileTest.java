package com.lattice.checkers.ai;

import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

/**
 * Ensures AI profiles differ by weights (behavioral contract), not just by name.
 */
class AIProfileTest {

    @Test
    void aggressorFavorsCapturePressureOverDefender() {
        assertTrue(AIProfile.AGGRESSOR.capturePotentialWeight()
                > AIProfile.DEFENDER.capturePotentialWeight());
        assertTrue(AIProfile.AGGRESSOR.threatWeight()
                > AIProfile.DEFENDER.threatWeight());
        assertTrue(AIProfile.DEFENDER.preservationWeight()
                > AIProfile.AGGRESSOR.preservationWeight());
    }

    @Test
    void strategistEmphasizesPositionAndMobility() {
        assertTrue(AIProfile.STRATEGIST.positionWeight()
                > AIProfile.AGGRESSOR.positionWeight());
        assertTrue(AIProfile.STRATEGIST.mobilityWeight()
                > AIProfile.DEFENDER.mobilityWeight());
        assertNotEquals(
                AIProfile.AGGRESSOR.promotionWeight(),
                AIProfile.STRATEGIST.promotionWeight());
    }
}
