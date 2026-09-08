package com.lattice.checkers.learn;

import com.lattice.checkers.score.ScoreTable;
import java.util.List;
import java.util.Objects;

/**
 * Authoritative How to Play copy. UI renders these sections; it does not
 * invent rules or score values.
 */
public final class HowToPlayGuide {

    private HowToPlayGuide() {
    }

    public static List<HowToPlaySection> sections() {
        return sections(ScoreTable.standard());
    }

    public static List<HowToPlaySection> sections(ScoreTable table) {
        Objects.requireNonNull(table, "table");
        return List.of(
                new HowToPlaySection(
                        HowToPlayTopic.GOAL,
                        "Goal",
                        List.of(
                                "Capture all of your opponent's pieces, or leave them with no legal moves.",
                                "The board is 8×8. Each side has 12 pieces.",
                                "Pieces start on the playable squares of the first three rows.",
                                "Frog (green) and Traffic (orange) replace the usual two checker colors."
                        ),
                        HowToPlayDiagram.SETUP
                ),
                new HowToPlaySection(
                        HowToPlayTopic.MOVE,
                        "Move",
                        List.of(
                                "A regular piece moves one square diagonally forward.",
                                "It can only land on an empty playable square.",
                                "Regular pieces cannot normally move backward."
                        ),
                        HowToPlayDiagram.SLIDE
                ),
                new HowToPlaySection(
                        HowToPlayTopic.JUMP,
                        "Jump",
                        List.of(
                                "If an opponent sits diagonally next to you and the square beyond is empty, jump over them.",
                                "The jumped piece is captured and removed.",
                                "Captures are mandatory — if you can jump, you must."
                        ),
                        HowToPlayDiagram.JUMP
                ),
                new HowToPlaySection(
                        HowToPlayTopic.MULTI_JUMP,
                        "Multi-Jump",
                        List.of(
                                "If another capture is available after a jump, keep jumping with the same piece.",
                                "The turn does not end until that jump sequence is finished."
                        ),
                        HowToPlayDiagram.MULTI_JUMP
                ),
                new HowToPlaySection(
                        HowToPlayTopic.KING,
                        "Become a King",
                        List.of(
                                "Reach the opposite end of the board to become a King.",
                                "Kings move and capture diagonally forward and backward.",
                                "A King has a gold ring and a small crown — not just a new icon."
                        ),
                        HowToPlayDiagram.KING
                ),
                new HowToPlaySection(
                        HowToPlayTopic.WIN,
                        "Win the Game",
                        List.of(
                                "You win by capturing every opponent piece.",
                                "Or by leaving the opponent with no legal moves.",
                                "Match Score never decides the winner."
                        ),
                        HowToPlayDiagram.WIN
                ),
                new HowToPlaySection(
                        HowToPlayTopic.SCORE,
                        "Lattice Score System",
                        List.of(
                                "Frog is Player One (green). Traffic is Player Two (orange).",
                                "Match Score is arcade points earned during play.",
                                "The highest score does not determine the winner. Checkers rules do.",
                                "A regular capture is +" + table.capture()
                                        + ". A king capture is +" + table.kingCapture()
                                        + ". Becoming a King is +" + table.kingPromotion() + ".",
                                "Multi-jumps can add combo bonuses.",
                                "Squares have addresses. Columns A–H, rows 1–8. Example: C3 → E5."
                        ),
                        HowToPlayDiagram.SCORE
                )
        );
    }
}
