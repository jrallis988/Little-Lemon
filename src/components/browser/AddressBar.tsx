import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Bot, Mic, MicOff, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBrowserActions, looksLikeUrl } from "@/hooks/useBrowserActions";
import { cn } from "@/lib/utils";
import type { BrowserTab } from "@/types";

type Props = {
  activeTab: BrowserTab | null;
  onAskAi?: (prompt: string) => void;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  const speechWindow = window as Window & {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null;
}

export const AddressBar = forwardRef<HTMLInputElement, Props>(
  ({ activeTab, onAskAi }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
    const { openSearch, openWebUrl } = useBrowserActions();
    const [value, setValue] = useState("");
    const [listening, setListening] = useState(false);
    const voiceSupported = Boolean(getSpeechRecognition());

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      if (!activeTab) {
        setValue("");
        return;
      }
      if (activeTab.kind === "search") {
        const url = new URL(activeTab.url, window.location.origin);
        setValue(url.searchParams.get("q") ?? activeTab.title);
        return;
      }
      setValue(activeTab.kind === "newtab" ? "" : activeTab.url);
    }, [activeTab]);

    useEffect(() => {
      const focus = () => inputRef.current?.select();
      window.addEventListener("surf-focus-address", focus);
      return () => window.removeEventListener("surf-focus-address", focus);
    }, []);

    useEffect(() => {
      return () => recognitionRef.current?.stop();
    }, []);

    const submitValue = (raw: string) => {
      const next = raw.trim();
      if (!next) return;
      if (looksLikeUrl(next)) {
        void openWebUrl(next, next);
      } else {
        openSearch(next);
      }
    };

    const toggleVoice = () => {
      const Recognition = getSpeechRecognition();
      if (!Recognition) return;

      if (listening) {
        recognitionRef.current?.stop();
        setListening(false);
        return;
      }

      const recognition = new Recognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;
      recognition.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript?.trim();
        if (transcript) {
          setValue(transcript);
          submitValue(transcript);
        }
      };
      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
      recognition.start();
      setListening(true);
    };

    return (
      <form
        className="relative flex flex-1 items-center gap-1"
        onSubmit={(event) => {
          event.preventDefault();
          submitValue(value);
        }}
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
          <Input
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search learning topics or enter an approved URL"
            className="h-10 rounded-2xl border-white/70 bg-white/90 pl-10 pr-24 shadow-soft"
            aria-label="Address and search bar"
          />
          <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              aria-label="Ask Surf AI about this"
              onClick={() => onAskAi?.(value.trim() || activeTab?.title || "")}
            >
              <Sparkles className="h-4 w-4 text-orange" />
            </Button>
            {voiceSupported && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", listening && "text-orange")}
                aria-label={listening ? "Stop voice search" : "Voice search"}
                onClick={toggleVoice}
              >
                {listening ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
        <span className="sr-only">
          <Bot />
        </span>
      </form>
    );
  },
);

AddressBar.displayName = "AddressBar";
