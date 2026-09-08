package com.lattice.checkers.ai;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class AIDifficultyTest {

    @Test
    void depthsMatchTheFirstReleaseLadder() {
        assertEquals(2, AIDifficulty.EASY.searchDepth());
        assertEquals(4, AIDifficulty.MEDIUM.searchDepth());
        assertEquals(6, AIDifficulty.HARD.searchDepth());
        assertTrue(AIDifficulty.HARD.searchDepth() > AIDifficulty.MEDIUM.searchDepth());
        assertTrue(AIDifficulty.MEDIUM.searchDepth() > AIDifficulty.EASY.searchDepth());
    }

    @Test
    void mediumIsTheDefaultHumanVsComputerSetting() {
        assertEquals(AIDifficulty.MEDIUM, AIDifficulty.defaultDifficulty());
    }

    @Test
    void easyMayVaryAtTheRootWhileOthersTakeTheBestMove() {
        assertFalse(AIDifficulty.EASY.alwaysChoosesBestMove());
        assertTrue(AIDifficulty.MEDIUM.alwaysChoosesBestMove());
        assertTrue(AIDifficulty.HARD.alwaysChoosesBestMove());
    }

    @Test
    void hardValuesKingsAndPromotionMoreThanEasy() {
        assertTrue(AIDifficulty.HARD.kingValue() > AIDifficulty.MEDIUM.kingValue());
        assertTrue(AIDifficulty.MEDIUM.kingValue() > AIDifficulty.EASY.kingValue());
        assertTrue(AIDifficulty.HARD.promotionWeight() > AIDifficulty.EASY.promotionWeight());
        assertTrue(AIDifficulty.HARD.positionWeight() > AIDifficulty.EASY.positionWeight());
    }
}
