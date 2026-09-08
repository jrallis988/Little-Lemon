package com.lattice.checkers.ui.components;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Board;
import com.lattice.checkers.model.Faction;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Position;
import javafx.animation.TranslateTransition;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.input.KeyCode;
import javafx.scene.input.MouseButton;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.StrokeType;
import javafx.util.Duration;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.function.Consumer;

/**
 * Crossing world + exact 8×8 interaction grid.
 */
public final class BoardView extends VBox {

    public static final double CELL = 76;

    private final GameController controller;
    private final Consumer<Void> onChanged;
    private final StackPane[][] cells = new StackPane[8][8];
    private final boolean reducedMotion;
    private final GridPane grid = new GridPane();
    private int focusRow;
    private int focusCol = 1;
    private Position lastFrom;

    public BoardView(GameController controller, Consumer<Void> onChanged, boolean reducedMotion) {
        this.controller = controller;
        this.onChanged = onChanged;
        this.reducedMotion = reducedMotion;

        getStyleClass().add("board-view");
        setAlignment(Pos.CENTER);
        setSpacing(4);

        HBox files = new HBox();
        files.setAlignment(Pos.CENTER);
        files.setSpacing(0);
        Label spacer = coord(" ");
        spacer.setPrefWidth(22);
        files.getChildren().add(spacer);
        for (int c = 0; c < 8; c++) {
            Label file = coord(String.valueOf((char) ('A' + c)));
            file.setPrefWidth(CELL);
            file.setAlignment(Pos.CENTER);
            files.getChildren().add(file);
        }

        HBox boardRow = new HBox();
        boardRow.setAlignment(Pos.CENTER);

        VBox ranks = new VBox();
        ranks.setAlignment(Pos.CENTER);
        for (int r = 0; r < 8; r++) {
            Label rank = coord(String.valueOf(8 - r));
            rank.setPrefHeight(CELL);
            rank.setPrefWidth(22);
            rank.setAlignment(Pos.CENTER);
            ranks.getChildren().add(rank);
        }

        CrossingWorld world = new CrossingWorld(CELL * 8, CELL * 8);
        grid.setHgap(0);
        grid.setVgap(0);
        for (int r = 0; r < 8; r++) {
            for (int c = 0; c < 8; c++) {
                StackPane cell = createCell(r, c);
                cells[r][c] = cell;
                grid.add(cell, c, r);
            }
        }
        StackPane playfield = new StackPane(world, grid);
        playfield.getStyleClass().add("playfield");
        playfield.setMaxSize(CELL * 8, CELL * 8);

        boardRow.getChildren().addAll(ranks, playfield);

        getChildren().addAll(files, boardRow);
        setFocusTraversable(true);
        setOnKeyPressed(e -> {
            if (e.getCode() == KeyCode.UP) {
                focusRow = Math.max(0, focusRow - 1);
            } else if (e.getCode() == KeyCode.DOWN) {
                focusRow = Math.min(7, focusRow + 1);
            } else if (e.getCode() == KeyCode.LEFT) {
                focusCol = Math.max(0, focusCol - 1);
            } else if (e.getCode() == KeyCode.RIGHT) {
                focusCol = Math.min(7, focusCol + 1);
            } else if (e.getCode() == KeyCode.ENTER || e.getCode() == KeyCode.SPACE) {
                handleClick(focusRow, focusCol);
                e.consume();
                return;
            } else {
                return;
            }
            if ((focusRow + focusCol) % 2 == 0) {
                focusCol = Math.min(7, focusCol + 1);
            }
            refresh();
            e.consume();
        });
        refresh();
    }

    public void refresh() {
        Optional<GameState> optional = controller.state();
        if (optional.isEmpty()) {
            return;
        }
        GameState state = optional.get();
        Board board = state.board();
        Optional<Position> selected = controller.selected();
        Set<Position> destinations = new HashSet<>(controller.legalDestinations());
        Set<Position> captureLandings = new HashSet<>();
        Set<Position> forcedOrigins = new HashSet<>();
        if (controller.rulesEngine().hasForcedCapture(state) && state.status().name().equals("IN_PROGRESS")) {
            controller.rulesEngine().legalMoves(state).stream()
                    .filter(Move::isJump)
                    .forEach(m -> forcedOrigins.add(m.from()));
        }
        for (Move move : controller.legalMovesForSelection()) {
            if (move.isJump()) {
                captureLandings.addAll(move.path());
            }
        }

        for (int r = 0; r < 8; r++) {
            for (int c = 0; c < 8; c++) {
                Position pos = new Position(r, c);
                StackPane cell = cells[r][c];
                cell.getChildren().removeIf(n -> !"hit".equals(n.getUserData()) && !"tint".equals(n.getUserData()));

                boolean playable = pos.isDarkSquare();
                Rectangle tint = (Rectangle) cell.getChildren().stream()
                        .filter(n -> "tint".equals(n.getUserData()))
                        .findFirst()
                        .orElseGet(() -> {
                            Rectangle created = new Rectangle(CELL, CELL);
                            created.setUserData("tint");
                            created.setMouseTransparent(true);
                            cell.getChildren().add(1, created);
                            return created;
                        });
                tint.setFill(playable
                        ? Color.rgb(10, 14, 10, 0.18)
                        : Color.rgb(255, 255, 255, 0.06));

                if (selected.isPresent() && selected.get().equals(pos)) {
                    Color glow = Faction.of(state.sideToMove()) == Faction.FROG
                            ? Color.web("#7CDE3A", 0.38)
                            : Color.web("#F4A024", 0.38);
                    Rectangle wash = new Rectangle(CELL, CELL);
                    wash.setFill(glow);
                    wash.setMouseTransparent(true);
                    cell.getChildren().add(wash);
                }
                if (forcedOrigins.contains(pos) && selected.isEmpty()) {
                    Rectangle force = new Rectangle(CELL - 6, CELL - 6);
                    force.setFill(Color.TRANSPARENT);
                    force.setStroke(Color.web("#E07060"));
                    force.setStrokeWidth(2.2);
                    force.setMouseTransparent(true);
                    cell.getChildren().add(force);
                }
                if (destinations.contains(pos)) {
                    if (captureLandings.contains(pos)) {
                        Circle ring = new Circle(CELL * 0.16);
                        ring.getStyleClass().add("capture-marker");
                        ring.setStrokeType(StrokeType.OUTSIDE);
                        ring.setMouseTransparent(true);
                        cell.getChildren().add(ring);
                    } else {
                        Circle halo = new Circle(CELL * 0.12);
                        halo.setFill(Color.rgb(12, 16, 12, 0.45));
                        halo.setMouseTransparent(true);
                        Circle dot = new Circle(CELL * 0.08);
                        dot.getStyleClass().add("destination-marker");
                        dot.setMouseTransparent(true);
                        cell.getChildren().addAll(halo, dot);
                    }
                }
                if (r == focusRow && c == focusCol && isFocused()) {
                    Rectangle focus = new Rectangle(CELL - 6, CELL - 6);
                    focus.setFill(Color.TRANSPARENT);
                    focus.setStroke(Color.web("#F2F3F5"));
                    focus.setStrokeWidth(2);
                    focus.setMouseTransparent(true);
                    cell.getChildren().add(focus);
                }

                board.get(pos).ifPresent(piece -> {
                    PieceView pieceView = new PieceView(piece, CELL * 0.36);
                    pieceView.setReducedMotion(reducedMotion);
                    cell.getChildren().add(pieceView);
                    if (selected.isPresent() && selected.get().equals(pos)) {
                        pieceView.playSelectPulse();
                    }
                    if (!reducedMotion && lastFrom != null && pos.equals(moveTo()) && pieceView != null) {
                        animateHop(pieceView, lastFrom, pos);
                    }
                });
            }
        }
        lastFrom = null;
    }

    private Position moveTo() {
        var log = controller.moveLog();
        return log.isEmpty() ? null : log.get(log.size() - 1).to();
    }

    private void animateHop(PieceView pieceView, Position from, Position to) {
        double dx = (from.col() - to.col()) * CELL;
        double dy = (from.row() - to.row()) * CELL;
        pieceView.setTranslateX(dx);
        pieceView.setTranslateY(dy);
        TranslateTransition tt = new TranslateTransition(Duration.millis(160), pieceView);
        tt.setToX(0);
        tt.setToY(0);
        tt.play();
    }

    private StackPane createCell(int row, int col) {
        Rectangle hit = new Rectangle(CELL, CELL);
        hit.setFill(Color.TRANSPARENT);
        hit.setUserData("hit");
        StackPane cell = new StackPane(hit);
        cell.setPrefSize(CELL, CELL);
        cell.setMinSize(CELL, CELL);
        cell.setMaxSize(CELL, CELL);
        cell.setPickOnBounds(true);
        cell.getStyleClass().add("board-square");
        cell.setOnMouseClicked(e -> {
            if (e.getButton() == MouseButton.PRIMARY) {
                focusRow = row;
                focusCol = col;
                requestFocus();
                handleClick(row, col);
            }
        });
        return cell;
    }

    private void handleClick(int row, int col) {
        Optional<Position> before = controller.selected();
        controller.selectSquare(new Position(row, col));
        if (before.isPresent() && controller.moveLog().stream().reduce((a, b) -> b)
                .map(m -> m.from().equals(before.get())).orElse(false)) {
            lastFrom = before.get();
        }
        refresh();
        if (onChanged != null) {
            onChanged.accept(null);
        }
    }

    private static Label coord(String text) {
        Label label = new Label(text);
        label.getStyleClass().add("board-coord");
        return label;
    }
}
