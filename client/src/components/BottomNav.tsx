import { NavLink } from "react-router-dom";

const Item = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex-1 text-center py-3 ${isActive ? "text-[var(--pink)] font-medium" : "text-gray-600"}`
    }
  >
    {label}
  </NavLink>
);

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="mx-auto max-w-5xl flex">{[
        {to:"/",label:"Home"},
        {to:"/emergency",label:"Emergency"},
        {to:"/news",label:"News"},
        {to:"/about",label:"About"},
      ].map(i => <Item key={i.to} {...i} />)}</div>
    </nav>
  );
}
