"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Flag, Images } from "lucide-react";

import type { Album, Photo } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import { EmptyState } from "@/components/ui/EmptyState";

export interface PhotoGalleryProps {
  albums: Album[];
  photos: Photo[];
  initialAlbumId?: string;
  onAlbumSelect?: (album: Album) => void;
  onPhotoSelect?: (photo: Photo) => void;
  onReportPhoto?: (photo: Photo) => void;
  className?: string;
}

export function PhotoGallery({
  albums,
  photos,
  initialAlbumId,
  onAlbumSelect,
  onPhotoSelect,
  onReportPhoto,
  className,
}: PhotoGalleryProps) {
  const [selectedAlbumId, setSelectedAlbumId] = React.useState(
    initialAlbumId ?? albums[0]?.id
  );
  const [viewerIndex, setViewerIndex] = React.useState<number | null>(null);

  const albumPhotos = React.useMemo(
    () => photos.filter((photo) => photo.albumId === selectedAlbumId),
    [photos, selectedAlbumId]
  );
  const selectedAlbum = albums.find((album) => album.id === selectedAlbumId);
  const viewedPhoto = viewerIndex === null ? null : albumPhotos[viewerIndex];

  const openPhoto = (index: number) => {
    const photo = albumPhotos[index];
    if (!photo) return;
    setViewerIndex(index);
    onPhotoSelect?.(photo);
  };

  const moveViewer = (direction: -1 | 1) => {
    if (viewerIndex === null || !albumPhotos.length) return;
    setViewerIndex(
      (viewerIndex + direction + albumPhotos.length) % albumPhotos.length
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Photo Albums</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {albums.length === 0 ? (
          <EmptyState
            icon={Images}
            title="No albums yet"
            description="Photo albums will show here once this profile shares them."
          />
        ) : (
          <>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {albums.map((album) => {
                const cover =
                  photos.find((photo) => photo.id === album.coverPhotoId) ??
                  photos.find((photo) => photo.albumId === album.id);
                const selected = album.id === selectedAlbumId;
                return (
                  <button
                    key={album.id}
                    type="button"
                    className={`min-w-40 rounded-card border p-2 text-left transition ${
                      selected
                        ? "border-brand bg-brand-soft"
                        : "border-surface-border bg-surface-muted hover:border-brand/50"
                    }`}
                    onClick={() => {
                      setSelectedAlbumId(album.id);
                      setViewerIndex(null);
                      onAlbumSelect?.(album);
                    }}
                  >
                    <div className="mb-2 h-20 overflow-hidden rounded-card bg-navy-100">
                      {cover ? (
                        <img
                          src={cover.url}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                    <span className="block truncate text-sm font-bold text-navy-900">
                      {album.title}
                    </span>
                    <span className="text-xs text-navy-500">
                      {photos.filter((photo) => photo.albumId === album.id).length} photos
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedAlbum ? (
              <div>
                <div className="mb-3">
                  <h3 className="text-base font-bold text-navy-900">
                    {selectedAlbum.title}
                  </h3>
                  {selectedAlbum.description ? (
                    <p className="text-sm text-navy-600">
                      {selectedAlbum.description}
                    </p>
                  ) : null}
                </div>
                {albumPhotos.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {albumPhotos.map((photo, index) => (
                      <button
                        key={photo.id}
                        type="button"
                        className="group overflow-hidden rounded-card border border-surface-border bg-white text-left shadow-soft transition hover:border-brand/50"
                        onClick={() => openPhoto(index)}
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption ?? "Profile photo"}
                          className="aspect-square w-full object-cover"
                          loading="lazy"
                        />
                        <span className="block truncate px-2 py-1 text-xs text-navy-600 group-hover:text-brand">
                          {photo.caption ?? formatDate(photo.createdAt)}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={Images}
                    title="This album is empty"
                    description="There are no visible photos in this album."
                  />
                )}
              </div>
            ) : null}
          </>
        )}
      </CardContent>

      <Dialog
        open={Boolean(viewedPhoto)}
        onClose={() => setViewerIndex(null)}
        title={selectedAlbum?.title ?? "Photo viewer"}
        className="max-w-3xl"
        footer={
          viewedPhoto ? (
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-navy-500">
                {viewerIndex !== null ? viewerIndex + 1 : 0} of {albumPhotos.length}
              </p>
              {onReportPhoto ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onReportPhoto(viewedPhoto)}
                >
                  <Flag className="h-4 w-4" aria-hidden />
                  Report
                </Button>
              ) : null}
            </div>
          ) : null
        }
      >
        {viewedPhoto ? (
          <div className="space-y-3">
            <div className="relative">
              <img
                src={viewedPhoto.url}
                alt={viewedPhoto.caption ?? "Profile photo"}
                className="max-h-[65vh] w-full rounded-card object-contain"
              />
              {albumPhotos.length > 1 ? (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute left-2 top-1/2 -translate-y-1/2 px-2"
                    onClick={() => moveViewer(-1)}
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2"
                    onClick={() => moveViewer(1)}
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </Button>
                </>
              ) : null}
            </div>
            {viewedPhoto.caption ? (
              <p className="rounded-card bg-surface-muted px-3 py-2 text-sm text-navy-700">
                {viewedPhoto.caption}
              </p>
            ) : null}
          </div>
        ) : null}
      </Dialog>
    </Card>
  );
}
