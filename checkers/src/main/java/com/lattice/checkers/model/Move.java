package com.lattice.checkers.model;

import java.util.List;
import java.util.Objects;

/**
 * A legal or candidate move. Simple slides have a single destination; multi-jumps
 * carry an ordered {@code path} of landing squares after the origin.
 *
 * <p>Phase 1: data shape only. Legality is decided by the rules engine later.
 */
public record Move(Position from, List<Position> path) {

    public Move {
        Objects.requireNonNull(from, "from");
        Objects.requireNonNull(path, "path");
        if (path.isEmpty()) {
            throw new IllegalArgumentException("path must contain at least one landing square");
        }
        path = List.copyOf(path);
    }

    public static Move slide(Position from, Position to) {
        return new Move(from, List.of(to));
    }

    public Position to() {
        return path.get(path.size() - 1);
    }

    public boolean isJump() {
        // Heuristic placeholder: engine will classify jumps explicitly in Phase 3.
        Position first = path.get(0);
        return Math.abs(first.row() - from.row()) == 2
                && Math.abs(first.col() - from.col()) == 2;
    }
}
