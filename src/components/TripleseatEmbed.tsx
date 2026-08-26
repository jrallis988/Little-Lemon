import { useEffect, useRef } from "react";

type TripleseatEmbedProps = {
  scriptUrl: string;
};

/** Loads the official Tripleseat lead form used on smuttynose.com/private-event/ */
export function TripleseatEmbed({ scriptUrl }: TripleseatEmbedProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.innerHTML = "";
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    host.appendChild(script);

    return () => {
      host.innerHTML = "";
    };
  }, [scriptUrl]);

  return (
    <div
      ref={hostRef}
      className="min-h-[28rem] border border-ink/10 bg-foam p-4 md:min-h-[32rem] md:p-6"
      aria-label="Tripleseat private event booking form"
    />
  );
}
