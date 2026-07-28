import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How TrumpRx collects, uses, and protects limited information when you compare medication prices.",
};

export default function PrivacyPage() {
  return (
    <div className="trx-atmosphere min-h-[70dvh]">
      <article className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6 sm:py-12">
        <header className="space-y-3">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: June 11, 2026
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            TrumpRx is committed to transparency about how we handle your
            information. This Privacy Policy explains what data we collect, how
            we use it, and your choices regarding that data.
          </p>
        </header>

        <section className="space-y-4" aria-labelledby="collect-heading">
          <h2
            id="collect-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            1. Information We Collect
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            We collect limited information to provide you with medication pricing
            services:
          </p>

          <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold">Location Data</h3>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong className="text-foreground">Automatic (IP-based):</strong>{" "}
                When you visit our site, our hosting provider (Cloudflare)
                automatically detects your approximate location (city, state,
                postal code) from your IP address to show local pharmacies.
              </li>
              <li>
                <strong className="text-foreground">Browser Geolocation:</strong>{" "}
                If you click &quot;Use my current location,&quot; we request your
                device&apos;s GPS coordinates to find pharmacies near you. This
                requires your explicit permission.
              </li>
              <li>
                <strong className="text-foreground">User-Entered:</strong> You may
                enter a ZIP code to set your location manually.
              </li>
            </ul>
            <p className="leading-relaxed text-muted-foreground">
              Your location preference is stored in your browser&apos;s local
              storage so you don&apos;t have to re-enter it each visit. This data
              stays on your device and is not stored on our servers.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold">Email Address</h3>
            <p className="leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Notification Signup:</strong> If
              you sign up for new medication alerts, we store your email to notify
              you when new discounts are added. You can unsubscribe at any time.
            </p>
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="not-collect-heading">
          <h2
            id="not-collect-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            2. Information We Do Not Collect
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            We do not collect, store, or process:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>
              Your name or contact information (except email as described above)
            </li>
            <li>Health or medical information</li>
            <li>Prescription details or medication history</li>
            <li>
              Payment information (all purchases are made directly with
              pharmacies)
            </li>
            <li>Social Security numbers or government IDs</li>
          </ul>
        </section>

        <section className="space-y-4" aria-labelledby="use-heading">
          <h2
            id="use-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            3. How We Use Your Information
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>
              <strong className="text-foreground">Location data:</strong> To show
              pharmacies near you
            </li>
            <li>
              <strong className="text-foreground">Email address:</strong> To
              notify you of new medications if you signed up (stored until you
              unsubscribe)
            </li>
          </ul>
        </section>

        <section className="space-y-4" aria-labelledby="cookies-heading">
          <h2
            id="cookies-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            4. Cookies &amp; Local Storage
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            This site uses:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>
              <strong className="text-foreground">Local Storage:</strong> To
              remember your location preference on your device
            </li>
          </ul>
          <p className="leading-relaxed text-muted-foreground">
            You can clear your browser&apos;s local storage and cookies at any
            time through your browser settings.
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="third-party-heading">
          <h2
            id="third-party-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            5. Third-Party Services
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            We use the following third-party services to provide our
            functionality:
          </p>

          <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold">Cloudflare</h3>
            <p className="leading-relaxed text-muted-foreground">
              Hosts our website and provides IP-based geolocation. Cloudflare may
              collect standard server logs including IP addresses for security and
              performance purposes.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold">AWS Location Service</h3>
            <p className="leading-relaxed text-muted-foreground">
              Provides location services including geocoding (converting addresses
              to coordinates), reverse geocoding (converting coordinates to
              addresses), and location autocomplete to help you find pharmacies
              near you.
            </p>
          </div>

          <p className="leading-relaxed text-muted-foreground">
            Each of these services has their own privacy policy. We encourage you
            to review them:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                className="font-medium text-primary underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cloudflare Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://aws.amazon.com/privacy/"
                className="font-medium text-primary underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                AWS Privacy Policy
              </a>
            </li>
          </ul>
        </section>

        <section className="space-y-4" aria-labelledby="retention-heading">
          <h2
            id="retention-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            6. Data Retention
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>
              <strong className="text-foreground">
                Location data in local storage:
              </strong>{" "}
              Persists until you clear your browser data
            </li>
            <li>
              <strong className="text-foreground">Notification signups:</strong>{" "}
              Stored until you unsubscribe or request deletion
            </li>
          </ul>
        </section>

        <section className="space-y-4" aria-labelledby="security-heading">
          <h2
            id="security-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            7. Data Security
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            We implement technical measures to protect the very limited
            information we collect, including:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>HTTPS encryption for all data in transit</li>
            <li>Rate limiting to prevent abuse</li>
            <li>Minimal data collection practices</li>
            <li>No storage of sensitive personal information</li>
          </ul>
        </section>

        <section className="space-y-4" aria-labelledby="rights-heading">
          <h2
            id="rights-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            8. Your Rights &amp; Choices
          </h2>
          <p className="leading-relaxed text-muted-foreground">You can:</p>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>
              <strong className="text-foreground">Clear location data:</strong>{" "}
              Delete your browser&apos;s local storage to remove your saved
              location preference
            </li>
            <li>
              <strong className="text-foreground">Deny geolocation:</strong>{" "}
              Decline browser geolocation requests and enter your ZIP code
              manually instead
            </li>
            <li>
              <strong className="text-foreground">
                Use the service without providing email:
              </strong>{" "}
              All pricing features work without providing an email; you can print
              or screenshot coupons instead
            </li>
            <li>
              <strong className="text-foreground">
                Unsubscribe from notifications:
              </strong>{" "}
              Click the &quot;Unsubscribe&quot; link in any email you receive from
              TrumpRx.
            </li>
          </ul>
        </section>

        <section className="space-y-4" aria-labelledby="changes-heading">
          <h2
            id="changes-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            9. Changes to This Policy
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            We may update this Privacy Policy from time to time. When we make
            significant changes, we will update the &quot;Last Updated&quot; date
            at the top of this page. We encourage you to review this policy
            periodically.
          </p>
        </section>

        <p className="border-t border-border pt-6 text-sm text-muted-foreground">
          Questions about this policy? See our{" "}
          <Link
            href="/help"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Help
          </Link>{" "}
          page or review our{" "}
          <Link
            href="/terms"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Terms of Service
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
