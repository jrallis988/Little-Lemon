import { instagramPosts } from "../data/instagram";
import { links } from "../data/links";
import { useInView } from "../hooks/useInView";
import { CampusImage } from "./CampusImage";

export function InstagramFeed() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="instagram" ref={ref} className="bg-foam px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-site">
        <div
          className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          } transition-all duration-700`}
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
              Social
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
              Follow us on Instagram
            </h2>
            <p className="mt-4 max-w-lg text-steel">
              Backyard hangs, new releases, and campus life — same feed as{" "}
              <a
                href={links.instagram}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-tide underline-offset-2 hover:underline"
              >
                @smuttynosebeer
              </a>
              .
            </p>
          </div>
          <a
            href={links.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex self-start bg-ink px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
          >
            Open Instagram
          </a>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {instagramPosts.map((post, index) => (
            <li
              key={post.id}
              className={`group relative aspect-square overflow-hidden transition-all duration-700 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{
                transitionDelay: visible ? `${80 + index * 60}ms` : "0ms",
              }}
            >
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="block h-full w-full"
              >
                <CampusImage
                  name={post.image}
                  alt={post.caption}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 p-3 text-xs font-medium leading-snug text-foam opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {post.caption}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
