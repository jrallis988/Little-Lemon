import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Callout, CalloutEmergency, Notice } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "Brand-compliant tokens, components, and patterns for the Boston Children's Hospital redesign.",
};

const colors = [
  { name: "Boston Blue", hex: "#003087", use: "Nav, primary CTAs, section heads", swatch: "bg-blue" },
  { name: "Boston Ocean", hex: "#007DBA", use: "h2/h3, links, interactive", swatch: "bg-ocean" },
  { name: "Ocean Dark", hex: "#005F9E", use: "Ocean hover / pressed", swatch: "bg-ocean-dark" },
  { name: "Nav Dark", hex: "#002060", use: "Utility bar, blue hover", swatch: "bg-nav-dark" },
  { name: "Boston Pink", hex: "#C14991", use: "Tagline ONLY — extreme restraint", swatch: "bg-pink" },
  { name: "Boston Sky", hex: "#41B6E6", use: "Decorative only — not text on white", swatch: "bg-sky" },
  { name: "Boston Bay", hex: "#68759C", use: "Secondary accent", swatch: "bg-bay" },
  { name: "Boston Green", hex: "#628000", use: "Success / status on light", swatch: "bg-green" },
  { name: "Green Bright", hex: "#9BC23A", use: "Status on dark surfaces", swatch: "bg-green-bright" },
  { name: "Boston Indigo", hex: "#007396", use: "Secondary brand accent", swatch: "bg-indigo" },
  { name: "Red Alert", hex: "#E30000", use: "EMERGENCY / STOP / BLOOD ONLY", swatch: "bg-emergency" },
  { name: "Body Text", hex: "#4A4C52", use: "WCAG AA body copy", swatch: "bg-text-body" },
];

export default function DesignSystemPage() {
  return (
    <>
      <PageHero
        eyebrow="Internal reference"
        title="BCH Design System v3"
        lead="Brand-compliant tokens, components, and patterns extracted from the redesign prototype."
      />

      <div className="wrap py-s9">
        <div className="section-header">
          <span className="eyebrow">Tokens</span>
          <h2>Color Palette</h2>
          <p>
            Exact HEX values per BCH Brand Guidelines 2021. Note: Red is
            emergency/stop/blood ONLY.
          </p>
        </div>

        <div className="mb-s8 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-s3">
          {colors.map((c) => (
            <div
              key={c.name}
              className="rounded-md border border-border bg-white p-s5"
            >
              <div className={`mb-s3 h-16 rounded-sm ${c.swatch}`} />
              <strong className="text-sm text-text">{c.name}</strong>
              <br />
              <code className="text-xs text-text-meta">{c.hex}</code>
              <br />
              <span className="text-xs text-text-meta">{c.use}</span>
            </div>
          ))}
        </div>

        <div className="section-header">
          <h2>Buttons</h2>
          <p>
            Primary CTAs use Boston Blue or Ocean. Red emergency button is for
            emergency context only.
          </p>
        </div>
        <div className="mb-s4 flex flex-wrap items-center gap-s3">
          <Button variant="primary">Primary (Blue)</Button>
          <Button variant="ocean">Ocean CTA</Button>
          <Button variant="outline">Outline Blue</Button>
          <Button variant="outline-ocean">Outline Ocean</Button>
          <Button variant="ghost-white" className="bg-blue">
            Ghost White
          </Button>
          <Button variant="emergency">Emergency Only</Button>
        </div>
        <div className="mb-s8 flex flex-wrap items-center gap-s3">
          <Button size="sm">Small</Button>
          <Button>Regular</Button>
          <Button size="lg">Large</Button>
        </div>

        <div className="section-header">
          <h2>Typography Scale</h2>
        </div>
        <div className="mb-s8">
          <div className="mb-s4 text-[50px] font-medium leading-[1.15] text-ocean">
            Hero Headline — Museo 500
          </div>
          <div className="mb-s4 text-[38px] font-medium leading-[1.2] text-ocean">
            Page Title (h1) — Museo 500
          </div>
          <h2 className="mb-s4 text-2xl font-bold text-ocean">
            Section Header (h2) — Museo 700
          </h2>
          <h3 className="mb-s4 text-xl font-bold text-ocean">
            Subhead (h3) — Museo 700
          </h3>
          <p className="lead mb-s4">
            Lead paragraph text at 19px — Museo 300. Used for introductions and
            hero descriptions.
          </p>
          <p className="mb-s4 text-md font-light leading-[1.75] text-text-body">
            Body copy at 17px — Museo 300. Color #4A4C52 (adjusted from Boston
            Gray for WCAG AA compliance).
          </p>
          <p className="tagline mb-s3">
            Tagline — Boston Pink — &ldquo;Where the world comes for answers.&rdquo;
          </p>
          <span className="eyebrow">Eyebrow label — 11px 800 weight all-caps</span>
        </div>

        <div className="section-header">
          <h2>Badges & Status</h2>
        </div>
        <div className="mb-s8 flex flex-wrap gap-s2">
          <Badge>Ocean badge</Badge>
          <Badge variant="blue">Blue badge</Badge>
          <Badge variant="green">Status: active</Badge>
          <Badge variant="pink">Pink accent</Badge>
          <Badge variant="gray">Neutral label</Badge>
        </div>

        <div className="section-header">
          <h2>Callout Patterns</h2>
        </div>
        <div className="mb-s8 flex flex-col gap-s4">
          <Callout title="When to call your doctor">
            <p>
              Used for informational guidance on condition pages. Boston Blue
              left border. Never red for non-emergency callouts.
            </p>
          </Callout>
          <CalloutEmergency title="Call 911 — Emergency callout">
            <p>
              Red border is correct here. This pattern is for life-threatening
              emergency guidance ONLY.
            </p>
          </CalloutEmergency>
          <Notice>
            <p>
              Info notice pattern — gentle informational message. Ocean
              background, contained, non-alarming.
            </p>
          </Notice>
        </div>
      </div>
    </>
  );
}
