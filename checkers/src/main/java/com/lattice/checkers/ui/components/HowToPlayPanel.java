package com.lattice.checkers.ui.components;

import com.lattice.checkers.learn.HowToPlayGuide;
import com.lattice.checkers.learn.HowToPlaySection;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.Region;
import javafx.scene.layout.VBox;
import java.util.List;

/**
 * Paginated in-app How to Play. Renders {@link HowToPlayGuide} — no rules live here.
 */
public final class HowToPlayPanel extends VBox {

    private final List<HowToPlaySection> sections = HowToPlayGuide.sections();
    private final boolean reducedMotion;
    private final Runnable onClose;
    private final Label kicker;
    private final Label title;
    private final VBox bullets;
    private final VBox diagramHost;
    private final Button back;
    private final Button next;
    private final HBox dots;
    private int index;
    private HelpMiniBoard diagram;

    public HowToPlayPanel(Runnable onClose, boolean reducedMotion) {
        this.onClose = onClose;
        this.reducedMotion = reducedMotion;
        getStyleClass().add("how-to-play-panel");
        setSpacing(14);
        setPadding(new Insets(22, 26, 18, 26));
        setMaxWidth(720);
        setMaxHeight(640);

        Label heading = new Label("HOW TO PLAY");
        heading.getStyleClass().add("how-to-play-heading");
        Label subtitle = new Label("American checkers — Lattice’s rules are the same. Score is extra.");
        subtitle.getStyleClass().add("how-to-play-subtitle");
        subtitle.setWrapText(true);

        kicker = new Label();
        kicker.getStyleClass().add("how-to-play-kicker");
        title = new Label();
        title.getStyleClass().add("how-to-play-title");
        bullets = new VBox(6);
        diagramHost = new VBox();
        diagramHost.setAlignment(Pos.CENTER);
        VBox.setVgrow(diagramHost, Priority.SOMETIMES);

        back = new Button("BACK");
        back.getStyleClass().add("action-button");
        back.setOnAction(e -> show(index - 1));
        next = new Button("NEXT");
        next.getStyleClass().add("primary-cta");
        next.setOnAction(e -> {
            if (index >= sections.size() - 1) {
                close();
            } else {
                show(index + 1);
            }
        });
        Button close = new Button("CLOSE");
        close.getStyleClass().add("action-button");
        close.setOnAction(e -> close());

        dots = new HBox(6);
        dots.setAlignment(Pos.CENTER);

        Region spacer = new Region();
        HBox.setHgrow(spacer, Priority.ALWAYS);
        HBox nav = new HBox(10, back, spacer, close, next);
        nav.setAlignment(Pos.CENTER);

        getChildren().addAll(heading, subtitle, kicker, title, bullets, diagramHost, dots, nav);
        show(0);
    }

    public void dispose() {
        if (diagram != null) {
            diagram.stop();
        }
    }

    public void close() {
        dispose();
        if (onClose != null) {
            onClose.run();
        }
    }

    private void show(int page) {
        if (page < 0 || page >= sections.size()) {
            return;
        }
        if (diagram != null) {
            diagram.stop();
        }
        index = page;
        HowToPlaySection section = sections.get(index);
        kicker.setText((index + 1) + "  /  " + sections.size());
        title.setText(section.title());
        bullets.getChildren().clear();
        for (String line : section.lines()) {
            Label bullet = new Label("•  " + line);
            bullet.getStyleClass().add("how-to-play-bullet");
            bullet.setWrapText(true);
            bullet.setMaxWidth(640);
            bullets.getChildren().add(bullet);
        }
        diagram = new HelpMiniBoard(section.diagram(), reducedMotion);
        diagramHost.getChildren().setAll(diagram);

        back.setDisable(index == 0);
        next.setText(index >= sections.size() - 1 ? "DONE" : "NEXT");

        dots.getChildren().clear();
        for (int i = 0; i < sections.size(); i++) {
            Label dot = new Label(i == index ? "●" : "○");
            dot.getStyleClass().add(i == index ? "help-dot-on" : "help-dot-off");
            final int target = i;
            dot.setOnMouseClicked(e -> show(target));
            dots.getChildren().add(dot);
        }
    }
}
