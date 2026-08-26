import { Link } from "react-router-dom";
import { links } from "../data/links";
import { SealMark } from "./SealMark";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-foam">
      <div className="mx-auto max-w-site px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-3">
              <SealMark className="h-9 w-9 text-foam" />
              <p className="font-display text-3xl font-bold uppercase tracking-[0.06em]">
                Smuttynose
              </p>
            </div>
            <p className="mt-2 max-w-sm text-sm text-foam/70">
              Smuttynose Brewing · Hampton, New Hampshire · Est. 1994
            </p>
            <p className="mt-1 text-sm text-foam/60">{links.address}</p>
            <div className="mt-4 space-y-1 text-sm text-foam/70">
              <p>
                Backyard Club ·{" "}
                <a href={links.phone} className="hover:text-foam">
                  {links.phoneDisplay}
                </a>
              </p>
              <p>
                Brewery ·{" "}
                <a href={links.phoneBrewery} className="hover:text-foam">
                  {links.phoneBreweryDisplay}
                </a>
              </p>
            </div>
            <p className="mt-4 max-w-sm text-xs text-foam/45">
              {links.hours}
              <br />
              {links.hoursKitchen}
            </p>
            <p className="mt-3 max-w-sm text-xs text-foam/45">
              Campus photo © SmuttynoseBeer /{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:SBC_rtl4637.jpg"
                target="_blank"
                rel="noreferrer"
                className="underline-offset-2 hover:underline"
              >
                Wikimedia Commons
              </a>{" "}
              (CC BY-SA 4.0)
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-salt">
              Explore
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-foam/80">
              <a href="/#beers" className="transition-colors hover:text-foam">
                Beers
              </a>
              <Link to="/shop" className="transition-colors hover:text-foam">
                Shop
              </Link>
              <Link to="/finder" className="transition-colors hover:text-foam">
                Beer locator
              </Link>
              <Link
                to="/events/private"
                className="transition-colors hover:text-foam"
              >
                Private events
              </Link>
              <a href="/#visit" className="transition-colors hover:text-foam">
                Visit
              </a>
              <a href="/#contact" className="transition-colors hover:text-foam">
                Contact
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-salt">
              Official
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-foam/80">
              <a
                href={links.beers}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foam"
              >
                Full lineup
              </a>
              <a
                href={links.releaseCalendar}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foam"
              >
                Release calendar
              </a>
              <a
                href={links.campusEvents}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foam"
              >
                Campus events
              </a>
              <a
                href={links.giftCards}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foam"
              >
                E-gift cards
              </a>
              <Link
                to="/be-kind"
                className="transition-colors hover:text-foam"
              >
                Be KIND
              </Link>
              <a
                href={links.careers}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foam"
              >
                Careers
              </a>
              <a
                href={links.home}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foam"
              >
                smuttynose.com
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-foam/70">
              <a
                href={links.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foam"
              >
                Facebook
              </a>
              <a
                href={links.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foam"
              >
                Instagram
              </a>
              <a
                href={links.untappd}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foam"
              >
                Untappd
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
