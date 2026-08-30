package com.lattice.checkers.analysis;

import com.lattice.checkers.model.Position;
import java.util.Objects;
import java.util.Set;

/**
 * X-Ray annotation for a single square.
 */
public record SquareAnnotation(Position position, Set<XRayLabel> labels) {

    public SquareAnnotation {
        Objects.requireNonNull(position, "position");
        Objects.requireNonNull(labels, "labels");
        labels = Set.copyOf(labels);
    }
}
