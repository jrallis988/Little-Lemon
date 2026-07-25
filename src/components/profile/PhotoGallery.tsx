"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon, Lock, Users, X } from "lucide-react";

import type { Album, Photo, Profile, ProfileComment, Visibility } from "@/lib/types/database";
import { PLACEHOLDER_AVATAR } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import { formatDateTime } from "@/lib/utils/format";

type PhotoGalleryProps = {
  albums: Album[];
  photos: Photo[];
  photoComments?: Record<string, ProfileComment[]>;
  commentAuthors?: Record<string, Profile>;
  isOwner?: boolean;
  isFriend?: boolean;
  className?: string;
};

function canView(visibility: Visibility, isOwner = false, isFriend = false) {
  if (isOwner) return true;
  if (visibility === "public") return true;
  if (visibility === "friends") return isFriend;
  return false;
}

function PrivacyBadge({ visibility }: { visibility: Visibility }) {
  const Icon = visibility === "public" ? ImageIcon : visibility === "friends" ? Users : Lock;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-black/65 px-2 py-0.5 text-xs font-bold text-white">
      <Icon className="h-3 w-3" aria-hidden="true" />
      {visibility}
    </span>
  );
}

export function PhotoGallery({
  albums,
  photos,
  photoComments = {},
  commentAuthors = {},
  isOwner = false,
  isFriend = false,
  className,
}: PhotoGalleryProps) {
  const visibleAlbums = useMemo(
    () => albums.filter((album) => canView(album.visibility, isOwner, isFriend)),
    [albums, isFriend, isOwner]
  );
  const visiblePhotos = useMemo(
    () => photos.filter((photo) => canView(photo.visibility, isOwner, isFriend)),
    [photos, isFriend, isOwner]
  );
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | "all">("all");
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (selectedAlbumId === "all") return visiblePhotos;
    return visiblePhotos.filter((photo) => photo.album_id === selectedAlbumId);
  }, [selectedAlbumId, visiblePhotos]);

  const viewerPhoto = viewerIndex === null ? null : filteredPhotos[viewerIndex];

  useEffect(() => {
    if (viewerIndex !== null && viewerIndex >= filteredPhotos.length) {
      setViewerIndex(filteredPhotos.length > 0 ? filteredPhotos.length - 1 : null);
    }
  }, [filteredPhotos.length, viewerIndex]);

  useEffect(() => {
    if (viewerIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setViewerIndex(null);
      if (event.key === "ArrowLeft") {
        setViewerIndex((index) =>
          index === null ? null : (index - 1 + filteredPhotos.length) % filteredPhotos.length
        );
      }
      if (event.key === "ArrowRight") {
        setViewerIndex((index) =>
          index === null ? null : (index + 1) % filteredPhotos.length
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredPhotos.length, viewerIndex]);

  const coverForAlbum = (album: Album) => {
    return (
      visiblePhotos.find((photo) => photo.id === album.cover_photo_id) ??
      visiblePhotos.find((photo) => photo.album_id === album.id)
    );
  };

  return (
    <section className={cn("profile-module", className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="profile-heading text-xl font-black">Photos</h2>
        <span className="rounded-full border border-current px-2 py-0.5 text-xs font-bold opacity-70">
          {visiblePhotos.length} photos
        </span>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        <button
          type="button"
          className={cn(
            "min-w-28 rounded border p-2 text-left text-sm font-bold",
            selectedAlbumId === "all"
              ? "border-[color:var(--mp-primary,#1a365d)] bg-white"
              : "border-transparent bg-white/50"
          )}
          onClick={() => setSelectedAlbumId("all")}
        >
          <span className="flex h-16 items-center justify-center rounded bg-[color-mix(in_srgb,var(--mp-secondary,#3b6ea5)_20%,white)]">
            <ImageIcon className="h-7 w-7 opacity-65" aria-hidden="true" />
          </span>
          <span className="mt-2 block">All photos</span>
        </button>

        {visibleAlbums.map((album) => {
          const cover = coverForAlbum(album);
          return (
            <button
              key={album.id}
              type="button"
              className={cn(
                "min-w-28 rounded border p-2 text-left text-sm font-bold",
                selectedAlbumId === album.id
                  ? "border-[color:var(--mp-primary,#1a365d)] bg-white"
                  : "border-transparent bg-white/50"
              )}
              onClick={() => setSelectedAlbumId(album.id)}
            >
              <span className="relative block h-16 overflow-hidden rounded bg-[color-mix(in_srgb,var(--mp-secondary,#3b6ea5)_20%,white)]">
                {cover ? (
                  <img src={cover.url} alt={`${album.title} album cover`} className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full items-center justify-center">
                    <ImageIcon className="h-7 w-7 opacity-65" aria-hidden="true" />
                  </span>
                )}
                <span className="absolute right-1 top-1">
                  <PrivacyBadge visibility={album.visibility} />
                </span>
              </span>
              <span className="mt-2 block truncate">{album.title}</span>
            </button>
          );
        })}
      </div>

      {filteredPhotos.length === 0 ? (
        <p className="mt-4 text-sm opacity-75">No photos available in this album.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filteredPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              className="group relative aspect-square overflow-hidden rounded border border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_18%,transparent)] bg-white text-left"
              onClick={() => setViewerIndex(index)}
            >
              <img
                src={photo.url}
                alt={photo.caption || "Profile photo"}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
              <span className="absolute left-2 top-2">
                <PrivacyBadge visibility={photo.visibility} />
              </span>
              {photo.caption ? (
                <span className="absolute inset-x-0 bottom-0 line-clamp-2 bg-black/65 p-2 text-xs font-semibold text-white">
                  {photo.caption}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      )}

      {viewerPhoto ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded bg-white text-slate-950 shadow-2xl">
            <div className="flex items-center justify-between border-b p-3">
              <div>
                <p className="font-black">Photo {viewerIndex! + 1} of {filteredPhotos.length}</p>
                <p className="text-xs opacity-70">{formatDateTime(viewerPhoto.created_at)}</p>
              </div>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-slate-100"
                onClick={() => setViewerIndex(null)}
                aria-label="Close photo viewer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid max-h-[80vh] overflow-auto lg:grid-cols-[1fr_320px]">
              <div className="relative grid min-h-80 place-items-center bg-slate-950">
                <img
                  src={viewerPhoto.url}
                  alt={viewerPhoto.caption || "Selected profile photo"}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
                {filteredPhotos.length > 1 ? (
                  <>
                    <button
                      type="button"
                      className="absolute left-3 top-1/2 rounded-full bg-white/85 p-2 text-slate-950 hover:bg-white"
                      onClick={() =>
                        setViewerIndex((index) =>
                          index === null
                            ? null
                            : (index - 1 + filteredPhotos.length) % filteredPhotos.length
                        )
                      }
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 rounded-full bg-white/85 p-2 text-slate-950 hover:bg-white"
                      onClick={() =>
                        setViewerIndex((index) =>
                          index === null ? null : (index + 1) % filteredPhotos.length
                        )
                      }
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </>
                ) : null}
              </div>

              <aside className="space-y-4 p-4">
                <div>
                  <div className="mb-2">
                    <PrivacyBadge visibility={viewerPhoto.visibility} />
                  </div>
                  <p className="whitespace-pre-line text-sm">
                    {viewerPhoto.caption || "No caption added."}
                  </p>
                  {viewerPhoto.content_warning ? (
                    <p className="mt-2 rounded border border-amber-300 bg-amber-50 p-2 text-xs text-amber-950">
                      Content warning: {viewerPhoto.content_warning}
                    </p>
                  ) : null}
                </div>

                <div>
                  <h3 className="font-black">Comments</h3>
                  {(photoComments[viewerPhoto.id] ?? []).length === 0 ? (
                    <p className="mt-2 text-sm opacity-70">No comments on this photo yet.</p>
                  ) : (
                    <ul className="mt-3 space-y-3">
                      {(photoComments[viewerPhoto.id] ?? []).map((comment) => {
                        const author = commentAuthors[comment.author_id];
                        return (
                          <li key={comment.id} className="flex gap-2 text-sm">
                            <img
                              src={author?.avatar_url ?? PLACEHOLDER_AVATAR}
                              alt={author ? `${author.display_name}'s avatar` : "Comment author avatar"}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-bold">{author?.display_name ?? "Vibe member"}</p>
                              <p className="text-xs opacity-60">{formatDateTime(comment.created_at)}</p>
                              <p className="mt-1 whitespace-pre-line">{comment.body}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default PhotoGallery;
