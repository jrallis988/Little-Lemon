import "@testing-library/jest-dom";

Object.defineProperty(window, "scrollTo", {
  value: jest.fn(),
  writable: true,
});

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});
