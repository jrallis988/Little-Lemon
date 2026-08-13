import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

const ACTIONS = [
  {
    href: "/volunteer",
    title: "Volunteer with the campaign",
    detail: "Across New Hampshire",
    icon: "fa-map-marker",
    cta: "Sign Up",
    thumb: "/images/get-involved/volunteer.jpg",
    alt: "Campaign volunteers with clipboards and materials at a community table",
  },
  {
    href: "/shop",
    title: "Apparel & marketing collateral",
    detail: "Campaign store (demo checkout)",
    icon: "fa-shopping-bag",
    cta: "Shop",
    thumb: "/images/get-involved/apparel.jpg",
    alt: "Campaign t-shirts, cap, and printed marketing materials",
  },
  {
    href: "/events",
    title: "Town halls & campaign stops",
    detail: "Dates announced as confirmed",
    icon: "fa-calendar",
    cta: "See Events",
    thumb: "/theme/assets/images/homepage1/campaign/03.jpg",
    alt: "",
  },
  {
    href: "/come-to-my-town",
    title: "Request a town visit",
    detail: "New Hampshire communities",
    icon: "fa-map-marker",
    cta: "Request a Visit",
    thumb: "/theme/assets/images/homepage1/campaign/04.jpg",
    alt: "",
  },
] as const;

export function TownEvents() {
  return (
    <section
      className="campaign-program-section get-involved-section"
      aria-labelledby="get-involved-heading"
    >
      <div className="section-overlay section-padding-140">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <h2 id="get-involved-heading">Get Involved</h2>
              <p>Volunteer, shop campaign gear, or bring Nick to your town.</p>
            </div>
          </Reveal>
          <div className="section-wrapper">
            <div className="campaign-list">
              {ACTIONS.map((item, i) => (
                <Reveal key={item.href} delayMs={i * 100} variant="up">
                  <div className="campaign-item varga-lift-card">
                    <div className="campaign-thumb">
                      <Link href={item.href}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.thumb} alt={item.alt} />
                      </Link>
                    </div>
                    <div className="campaign-content">
                      <h5 className="campaign-title">
                        <Link href={item.href}>{item.title}</Link>
                      </h5>
                      <ul className="campaign-detail-list">
                        <li>
                          <i className={`fa ${item.icon}`} aria-hidden /> {item.detail}
                        </li>
                      </ul>
                      <Link href={item.href} className="custom-btn custom-btn-sm varga-btn-motion">
                        {item.cta}
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
