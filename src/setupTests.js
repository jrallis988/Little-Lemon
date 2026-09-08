import "@testing-library/jest-dom";

// jsdom does not implement scroll APIs used by route transitions
window.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};
