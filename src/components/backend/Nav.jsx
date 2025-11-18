import React, { useEffect, useState, useRef } from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const BASE_URL_AWS = process.env.REACT_BASE_URL_AWS.replaceAll(
    '/";',
    ""
  ).replace('"', "");

  const signOut = useSignOut();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [isAuthenticated, setIsAuthenticated] = useState(user);
  const userName = useRef();
  const avatarRef = useRef();

  useEffect(() => {
    setIsAuthenticated(user);
    userName.current.innerText = `${isAuthenticated.data.firstName} ${isAuthenticated.data.lastName}`;
    avatarRef.current.src = `${BASE_URL_AWS}avatar/${isAuthenticated.data.avatar}`;
    avatarRef.current.alt = `${isAuthenticated.data.firstName} ${isAuthenticated.data.lastName}`;
    return () => {
      setIsAuthenticated(false);
    };
  }, []);

  const logout = () => {
    signOut();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("message");
    return navigate("/admin/login");
  };

  return (
    <nav id="navbar-main" className="navbar is-fixed-top">
      <div className="navbar-brand">
        <a className="navbar-item is-hidden-desktop jb-aside-mobile-toggle">
          <span className="icon">
            <i className="mdi mdi-forwardburger mdi-24px"></i>
          </span>
        </a>
      </div>
      <div className="navbar-brand is-right">
        <a
          className="navbar-item is-hidden-desktop jb-navbar-menu-toggle"
          data-target="navbar-menu"
        >
          <span className="icon">
            <i className="mdi mdi-dots-vertical"></i>
          </span>
        </a>
      </div>
      <div className="navbar-menu fadeIn animated faster" id="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item has-dropdown has-dropdown-with-icons has-divider is-hoverable"></div>
        </div>
        <div className="navbar-item has-dropdown has-dropdown-with-icons has-divider has-user-avatar">
          <a className="navbar-link is-arrowless">
            <div className="is-user-avatar">
              <img ref={avatarRef} alt="Grégory LACROIX" />
            </div>
            <div className="is-user-name">
              <span ref={userName}></span>
            </div>
          </a>
        </div>
        <span
          onClick={() => logout()}
          title="Log out"
          className="navbar-item is-desktop-icon-only logout-admin"
        >
          <span className="icon">
            <i className="mdi mdi-logout"></i>
          </span>
          <span>Log out</span>
        </span>
      </div>
    </nav>
  );
};

export default Nav;
