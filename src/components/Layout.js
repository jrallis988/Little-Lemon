import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Analytics from "./Analytics";
import Seo from "./Seo";

const titles = {
  "/": "Home",
  "/academics": "Academics",
  "/academics/course-descriptions": "Course Descriptions",
  "/academics/course-schedule": "Course Schedule",
  "/admissions": "Admissions & Aid",
  "/admissions/how-to-apply": "How to Apply",
  "/athletics": "Athletics",
  "/contact": "Contact",
  "/directory": "Faculty & Staff Directory",
  "/news": "News",
  "/events": "Events",
  "/search": "Search",
  "/sitemap": "Sitemap",
  "/workforce": "Workforce Development",
  "/about": "About",
  "/student-experience": "Student Experience",
};

function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const title =
    titles[pathname] ||
    (pathname.startsWith("/news/")
      ? "News"
      : pathname.startsWith("/events/")
        ? "Events"
        : pathname.startsWith("/academics/programs/")
          ? "Program"
          : "Great Bay");

  return (
    <div className="site">
      <Seo title={pathname === "/" ? "" : title} path={pathname} />
      <Analytics />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
