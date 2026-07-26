import { NavLink } from "react-router-dom";

function SectionNav({ label, items }) {
  return (
    <nav className="section-nav" aria-label={label}>
      <div className="container section-nav-inner">
        <ul>
          {items.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.end}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default SectionNav;
