import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { OrganizationJsonLd } from "./JsonLd";
import { resolvePageMeta } from "../data/seo";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { initAnalytics, trackPageView } from "../utils/analytics";

function Layout() {
  const location = useLocation();
  const { pathname, search, hash } = location;
  const meta = resolvePageMeta(pathname);

  useDocumentMeta(meta);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(`${pathname}${search}`, meta.title);
  }, [pathname, search, meta.title]);

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, "");
      const target = id ? document.getElementById(id) : null;
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <OrganizationJsonLd />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
