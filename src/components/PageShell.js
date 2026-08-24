import Nav from "./Nav";
import Footer from "./Footer";
import useReveal from "../hooks/useReveal";

export default function PageShell({ children, className = "" }) {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className={`min-h-screen bg-ink font-body ${className}`}>
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
