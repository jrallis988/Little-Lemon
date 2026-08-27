package com.lattice.checkers.controller;

/**
 * Optional overlays on the game board. Focus / X-Ray / Developer are modes,
 * not separate navigation destinations.
 */
public final class AppMode {

    private boolean focusEnabled;
    private boolean xRayEnabled;
    private boolean developerEnabled;

    public boolean isFocusEnabled() {
        return focusEnabled;
    }

    public void setFocusEnabled(boolean focusEnabled) {
        this.focusEnabled = focusEnabled;
    }

    public boolean isXRayEnabled() {
        return xRayEnabled;
    }

    public void setXRayEnabled(boolean xRayEnabled) {
        this.xRayEnabled = xRayEnabled;
    }

    public boolean isDeveloperEnabled() {
        return developerEnabled;
    }

    public void setDeveloperEnabled(boolean developerEnabled) {
        this.developerEnabled = developerEnabled;
    }
}
