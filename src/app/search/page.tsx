"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState, type FormEvent } from "react";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  LoadingCard,
  VibeShell,
  SectionTitle,
  blogPostAuthor,
  useMockStoreState,
  visibleBlogPosts,
} from "@/app/_components/vibe-page-utils";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [draft, setDraft] = useState(q);
  const { store } = useMockStoreState();

  const results = useMemo(() => {
    if (!store || !q.trim()) return { people: [], posts: [], interests: [] as string[] };
    const needle = q.trim().toLowerCase();
    const people = store.profiles.filter((profile) =>
      [
        profile.display_name,
        profile.username,
        profile.bio ?? "",
        profile.location ?? "",
        ...profile.interests,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
    const posts = visibleBlogPosts(store).filter((post) =>
      [post.title, post.body, post.mood ?? "", post.currently_listening ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
    const interests = Array.from(
      new Set(
        store.profiles.flatMap((profile) =>
          profile.interests.filter((interest) => interest.toLowerCase().includes(needle))
        )
      )
    ).sort();

    return { people, posts, interests };
  }, [q, store]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/search?q=${encodeURIComponent(draft.trim())}`);
  }

  if (!store) return <LoadingCard label="Loading search..." />;

  return (
    <div className="space-y-5">
      <Card>
        <h1 className="text-3xl font-black text-[#222222]">Search</h1>
        <form onSubmit={submitSearch} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <Input
              id="global-search"
              label="Search Vibe"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="People, posts, interests..."
            />
          </div>
          <Button type="submit" className="self-end">
            Search
          </Button>
        </form>
      </Card>

      {!q.trim() ? (
        <Card className="text-sm text-[#6E6E6E]">
          Enter a search term to find people, blog posts, and shared interests.
        </Card>
      ) : (
        <>
          <Card>
            <SectionTitle title={`People (${results.people.length})`} />
            {results.people.length === 0 ? (
              <p className="text-sm text-[#6E6E6E]">No people matched &quot;{q}&quot;.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {results.people.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            )}
          </Card>

          <Card>
            <SectionTitle title={`Blog posts (${results.posts.length})`} />
            {results.posts.length === 0 ? (
              <p className="text-sm text-[#6E6E6E]">No blog posts matched &quot;{q}&quot;.</p>
            ) : (
              <div className="space-y-3">
                {results.posts.map((post) => {
                  const author = blogPostAuthor(store, post);
                  return (
                    <article key={post.id} className="rounded border border-[#E5E5E5] bg-white p-3">
                      <Link href={`/blog/${post.id}`} className="text-lg font-black no-underline">
                        {post.title}
                      </Link>
                      <p className="text-sm text-[#6E6E6E]">
                        by {author?.display_name ?? "Vibe member"}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm">{post.body}</p>
                    </article>
                  );
                })}
              </div>
            )}
          </Card>

          <Card>
            <SectionTitle title={`Interests (${results.interests.length})`} />
            {results.interests.length === 0 ? (
              <p className="text-sm text-[#6E6E6E]">No interests matched &quot;{q}&quot;.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {results.interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    className="rounded-full border border-[#7B61FF] bg-white px-3 py-1 text-sm font-bold text-[#222222]"
                    onClick={() => {
                      setDraft(interest);
                      router.push(`/search?q=${encodeURIComponent(interest)}`);
                    }}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <VibeShell>
      <Suspense fallback={<LoadingCard label="Loading search..." />}>
        <SearchContent />
      </Suspense>
    </VibeShell>
  );
}
