import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { resolvePageMeta } from "../data/seo";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Layout() {
  const { pathname } = useLocation();
  const meta = resolvePageMeta(pathname);

  useDocumentMeta(meta);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
