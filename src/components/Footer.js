export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">Saltline Motel</div>
        <div className="footer__meta">
          <span>118 Shore Road, Seabreeze Cove</span>
          <span>(831) 555-0148</span>
          <span>stay@saltlinemotel.com</span>
        </div>
        <p className="footer__copy">
          © {new Date().getFullYear()} Saltline Motel. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
