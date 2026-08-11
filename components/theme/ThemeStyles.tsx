/** Google font for Neta theme (Roboto). Theme CSS is imported from app/globals.css. */
export function ThemeStyles() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap"
        rel="stylesheet"
      />
    </>
  );
}
