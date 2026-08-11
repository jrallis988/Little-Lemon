import Link from "next/link";
import { candidate } from "@/lib/candidate";

export function AboutPreview() {
  return (
    <section className="about-section section-bg-color home-1" aria-labelledby="about-heading">
      <div className="about-section-content">
        <div className="container">
          <div className="row justify-content-center flex-row-reverse">
            <div className="col-xl-5">
              <div className="about-politican">
                <div className="about-bio d-flex flex-wrap">
                  <div className="politician-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/candidate-portrait.svg"
                      alt={`${candidate.fullName} portrait placeholder`}
                    />
                  </div>
                  <div className="politician-content text-center text-sm-left">
                    <h4 className="name" id="about-heading">
                      {candidate.fullName}
                    </h4>
                    <p className="designation">
                      Independent Write-In · {candidate.hometown}, NH
                    </p>
                    <ul className="social-media justify-content-center justify-content-md-start">
                      <li>
                        <a
                          className="facebook"
                          href={candidate.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                        >
                          <i className="fa fa-facebook" aria-hidden />
                        </a>
                      </li>
                      <li>
                        <a
                          className="twitter"
                          href={candidate.social.x}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="X (Twitter)"
                        >
                          <i className="fa fa-twitter" aria-hidden />
                        </a>
                      </li>
                      <li>
                        <Link className="linkedin" href="/contact" aria-label="Contact">
                          <i className="fa fa-envelope" aria-hidden />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="about-qoute">
                  <h5>
                    <i>
                      I serve the people of New Hampshire — not party bosses, not donors.
                    </i>
                  </h5>
                  <p>{candidate.coreStatement}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-7">
              <div className="about-media row no-gutters">
                <div className="col-md-12">
                  <div className="media-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/theme/assets/images/homepage1/banner/varga-hero.jpg"
                      alt="Newmarket, New Hampshire"
                      className="w-100"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="media-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/theme/assets/images/homepage1/about/media/02.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="media-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/theme/assets/images/homepage1/about/media/03.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="media-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/theme/assets/images/homepage1/about/media/04.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <Link href="/meet-nick" className="view-more">
                    <i className="fa fa-angle-double-right" aria-hidden /> Meet Nick
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
