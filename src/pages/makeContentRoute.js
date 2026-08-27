import ContentPage from "./ContentPage";

/** Factory for registry-backed content pages */
export function makeContentRoute(path, sectionNav, sectionLabel) {
  return function RoutedContentPage() {
    return (
      <ContentPage
        path={path}
        sectionNav={sectionNav}
        sectionLabel={sectionLabel}
      />
    );
  };
}
