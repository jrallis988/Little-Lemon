import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="top-nav">
      <NavLink to="/" className="brand-mark" aria-label="Disney Jr home">
        Disney<span className="jr">Jr</span>
      </NavLink>
      <nav aria-label="Primary">
        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/academy-rock">Academy Rock</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
