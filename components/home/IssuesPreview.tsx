import Link from "next/link";
import { issues } from "@/lib/issues";

const PREVIEW = issues.slice(0, 3);

const THUMBS = [
  "/theme/assets/images/homepage1/blog/01.jpg",
  "/theme/assets/images/homepage1/blog/02.jpg",
  "/theme/assets/images/homepage1/blog/03.jpg",
];

export function IssuesPreview() {
  return (
    <section
      className="latest-news-section section-padding-140 section-bg-color"
      aria-labelledby="issues-preview-heading"
    >
      <div className="container">
        <div className="section-heading">
          <h2 id="issues-preview-heading">Where Nick Stands</h2>
          <p>Platform priorities in plain English — people over politics.</p>
        </div>
        <div className="section-wrapper row justify-content-center">
          {PREVIEW.map((issue, i) => (
            <div className="col-lg-4 col-sm-6" key={issue.slug}>
              <div className="post-item">
                <div className="post-thumb">
                  <Link href={`/issues/${issue.slug}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={THUMBS[i]} alt="" />
                  </Link>
                </div>
                <div className="post-content">
                  <h6 className="title">
                    <Link href={`/issues/${issue.slug}`}>{issue.title}</Link>
                  </h6>
                  <ul className="post-meta">
                    <li>{issue.subtitle}</li>
                  </ul>
                  <p>{issue.oneLiner}</p>
                  <Link href={`/issues/${issue.slug}`} className="custom-btn custom-btn-sm pull-left">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href="/issues" className="custom-btn">
            All Issues
          </Link>
        </div>
      </div>
    </section>
  );
}
