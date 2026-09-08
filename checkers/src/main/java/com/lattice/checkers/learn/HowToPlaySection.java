package com.lattice.checkers.learn;

import java.util.List;
import java.util.Objects;

/**
 * One How to Play page. {@code lines} are short bullets, not paragraphs.
 */
public record HowToPlaySection(
        HowToPlayTopic topic,
        String title,
        List<String> lines,
        HowToPlayDiagram diagram
) {
    public HowToPlaySection {
        Objects.requireNonNull(topic, "topic");
        Objects.requireNonNull(title, "title");
        Objects.requireNonNull(lines, "lines");
        Objects.requireNonNull(diagram, "diagram");
        if (title.isBlank()) {
            throw new IllegalArgumentException("title must not be blank");
        }
        lines = List.copyOf(lines);
    }
}
