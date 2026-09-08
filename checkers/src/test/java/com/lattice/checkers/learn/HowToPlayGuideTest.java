package com.lattice.checkers.learn;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.lattice.checkers.score.ScoreTable;
import java.util.List;
import org.junit.jupiter.api.Test;

class HowToPlayGuideTest {

    @Test
    void coversTheSevenTeachingPagesInOrder() {
        List<HowToPlaySection> sections = HowToPlayGuide.sections();
        assertEquals(List.of(
                HowToPlayTopic.GOAL,
                HowToPlayTopic.MOVE,
                HowToPlayTopic.JUMP,
                HowToPlayTopic.MULTI_JUMP,
                HowToPlayTopic.KING,
                HowToPlayTopic.WIN,
                HowToPlayTopic.SCORE
        ), sections.stream().map(HowToPlaySection::topic).toList());
    }

    @Test
    void scoreCopyUsesTheTableAndDoesNotMakeScoreTheWinner() {
        ScoreTable table = new ScoreTable(111, 222, 333, 44, 555);
        HowToPlaySection score = HowToPlayGuide.sections(table).getLast();
        String joined = String.join(" ", score.lines()).toLowerCase();
        assertTrue(joined.contains("does not determine the winner"));
        assertTrue(joined.contains("+111"));
        assertTrue(joined.contains("+222"));
        assertTrue(joined.contains("+333"));
        assertTrue(joined.contains("c3 → e5"));
        assertFalse(joined.contains("highest score wins"));
    }

    @Test
    void learnToPlayScriptIsScaffoldingOnly() {
        assertEquals(5, LearnToPlayScript.steps().size());
        assertEquals("Select one of your pieces.", LearnToPlayScript.prompt(LearnToPlayStep.SELECT_PIECE));
    }
}
