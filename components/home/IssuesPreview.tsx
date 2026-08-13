import Link from "next/link";
import { issues, type IssueSlug } from "@/lib/issues";
import { Reveal } from "@/components/motion/Reveal";

const PREVIEW = issues.slice(0, 3);

const THUMBS: Partial<Record<IssueSlug, string>> = {
  "term-limits": "/images/issues/term-limits.jpg",
  "economy-jobs": "/theme/assets/images/homepage1/blog/02.jpg",
  healthcare: "/images/issues/healthcare.jpg",
};

const FALLBACK_THUMBS = [
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
        <Reveal>
          <div className="section-heading">
            <h2 id="issues-preview-heading">Where Nick Stands</h2>
            <p>Platform priorities in plain English — people over politics.</p>
          </div>
        </Reveal>
        <div className="section-wrapper row justify-content-center">
          {PREVIEW.map((issue, i) => {
            const thumb = THUMBS[issue.slug] ?? FALLBACK_THUMBS[i] ?? FALLBACK_THUMBS[0];
            return (
              <Reveal className="col-lg-4 col-sm-6" key={issue.slug} delayMs={i * 110} variant="scale">
                <div className="post-item varga-lift-card">
                  <div className="post-thumb">
                    <Link href={`/issues/${issue.slug}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={thumb} alt="" />
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
                    <Link
                      href={`/issues/${issue.slug}`}
                      className="custom-btn custom-btn-sm varga-btn-motion"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="text-center mt-4" delayMs={280}>
          <Link href="/issues" className="custom-btn varga-btn-motion">
            All Issues
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
