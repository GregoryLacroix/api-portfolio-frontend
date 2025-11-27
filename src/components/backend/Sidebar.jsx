import React from "react";
import { NavLink } from "react-router";
import { useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="aside is-placed-left is-expanded">
      <div className="aside-tools">
        <div className="aside-tools-label">
          <span>
            <b>BackOffice</b> Portfolio
          </span>
        </div>
      </div>
      <div className="menu is-menu-main">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink
              to="/admin/portfolios"
              className={({ isActive }) =>
                isActive ? "is-active has-icon" : "has-icon"
              }
            >
              <span
                className={
                  pathname === "/admin/portfolios"
                    ? "icon has-update-mark"
                    : "icon"
                }
              >
                <span className="mdi mdi-library"></span>
              </span>
              <span className="menu-item-label">Projets</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/skills"
              className={({ isActive }) =>
                isActive ? "is-active has-icon" : "has-icon"
              }
            >
              <span
                className={
                  pathname === "/admin/skills" ? "icon has-update-mark" : "icon"
                }
              >
                <span className="mdi mdi-wrench"></span>
              </span>
              <span className="menu-item-label">Outils & Technologies</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? "is-active has-icon" : "has-icon"
              }
            >
              <span
                className={
                  pathname === "/admin/users" ? "icon has-update-mark" : "icon"
                }
              >
                <span className="mdi mdi-account-group"></span>
              </span>
              <span className="menu-item-label">Administrateurs</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" title="Log out" className="has-icon">
              <span className="icon">
                <i className="mdi mdi-logout"></i>
              </span>
              <span>Quitter</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
