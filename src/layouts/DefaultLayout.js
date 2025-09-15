import {NavLink, Outlet} from "react-router";

export function DefaultLayout() {
  return <div>
    <header className="app-header">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/todos/done">Done</NavLink>
        <NavLink to="/about">About Us</NavLink>
      </nav>
    </header>
    <main>
      <Outlet/>
    </main>
  </div>;
}