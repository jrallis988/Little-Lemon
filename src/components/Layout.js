import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    if (typeof window.scrollTo === "function") {
      try {
        window.scrollTo(0, 0);
      } catch {
        // jsdom may not implement scrollTo
      }
    }
  }, [pathname, hash]);

  return null;
}

function Layout() {
  return (
    <div className="min-h-screen bg-paper text-charcoal">
      <ScrollManager />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
