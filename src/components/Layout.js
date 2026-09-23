import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { resolvePageMeta } from "../data/seo";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { initAnalytics, trackPageView } from "../utils/analytics";

function Layout() {
  const location = useLocation();
  const { pathname, search } = location;
  const meta = resolvePageMeta(pathname);

  useDocumentMeta(meta);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(`${pathname}${search}`, meta.title);
  }, [pathname, search, meta.title]);

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
