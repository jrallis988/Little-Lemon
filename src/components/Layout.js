import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="brand-mark">
          Disney<span className="jr">Jr</span>
        </div>
        <p>Streaming made for little learners and big imaginations.</p>
      </footer>
    </div>
  );
}
