package com.lattice.checkers.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * A legal or candidate move. Simple slides have a single destination; multi-jumps
 * carry an ordered {@code path} of landing squares after the origin.
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

    public static Move jump(Position from, Position... landings) {
        return new Move(from, List.of(landings));
    }

    public Position to() {
        return path.get(path.size() - 1);
    }

    public boolean isJump() {
        Position first = path.get(0);
        return Math.abs(first.row() - from.row()) == 2
                && Math.abs(first.col() - from.col()) == 2;
    }

    public List<Position> capturedSquares(Board board) {
        if (!isJump()) {
            return List.of();
        }
        List<Position> captured = new ArrayList<>();
        Position current = from;
        for (Position landing : path) {
            int mr = (current.row() + landing.row()) / 2;
            int mc = (current.col() + landing.col()) / 2;
            captured.add(new Position(mr, mc));
            current = landing;
        }
        return List.copyOf(captured);
    }

    public String notation() {
        StringBuilder sb = new StringBuilder(fromLabel(from));
        String sep = isJump() ? "x" : "-";
        for (Position p : path) {
            sb.append(sep).append(fromLabel(p));
        }
        return sb.toString();
    }

    private static String fromLabel(Position p) {
        char file = (char) ('A' + p.col());
        int rank = Position.BOARD_SIZE - p.row();
        return "" + file + rank;
    }
}
