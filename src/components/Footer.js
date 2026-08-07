export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-sand/10 bg-ink py-8">
      <div className="container flex flex-col gap-3 text-sm text-sand/65 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} James Rallis</p>
        <p>Front-End Engineer & Multimedia Designer</p>
      </div>
    </footer>
  );
}
