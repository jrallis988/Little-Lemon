import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <p className="brand-plus-word footer-logo">Disney+</p>
        <p>Disney Jr · Academy Rock and more, streaming anytime.</p>
      </footer>
    </div>
  );
}
