import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        try {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch {
          target.scrollIntoView();
        }
        return;
      }
    }

    try {
      window.scrollTo(0, 0);
    } catch {
      // jsdom does not implement scrollTo
    }
  }, [pathname, hash]);

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
