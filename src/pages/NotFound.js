import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <div className="section-shell flex min-h-[70vh] flex-col justify-center py-28">
      <Seo
        title="Page not found"
        description="That page is not on the River Valley Community College site. Browse programs or talk with admissions."
        path="/404"
      />
      <p className="eyebrow">404</p>
      <h1 className="display-title mt-3">This page isn’t here</h1>
      <p className="body-copy mt-4 max-w-xl">
        The link may be outdated, or the page moved. Try programs, admissions, or
        head back home.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="btn-primary">
          Back home
        </Link>
        <Link to="/programs" className="btn-ghost">
          Browse programs
        </Link>
        <Link to="/admissions" className="btn-ghost">
          Request information
        </Link>
      </div>
    </div>
  );
}
