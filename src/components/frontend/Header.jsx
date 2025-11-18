import React from "react";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import {
  faArrowDown,
  faHouseChimney,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import stylesFrontEnd from "../../css/frontend/style.module.css";

export default function () {
  const BASE_URL_AWS = process.env.REACT_BASE_URL_AWS.replaceAll(
    '/";',
    ""
  ).replace('"', "");

  const isAuth = useIsAuthenticated();
  const [toggleNav, setToggleNav] = useState(false);
  const ref = useRef(null);

  const [bar, setBar] = useState(true);
  const [dot, setDot] = useState(false);

  const handleDone = () => {
    setTimeout(() => {
      setBar(false);
    }, 2000);
    setTimeout(() => {
      setDot(".");
    }, 2500);
  };

  const [text] = useTypewriter({
    words: ["développeur Web", "formateur digital"],
    loop: 0,
    onLoopDone: handleDone,
  });

  useEffect(() => {
    const closeOpenMenus = (e) => {
      if (toggleNav && ref.current && !ref.current.contains(e.target)) {
        setToggleNav(false);
      }
    };
    document.addEventListener("mousedown", closeOpenMenus);

    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  }, [ref, toggleNav, setToggleNav]);

  function handleScrollBottom(e) {
    e.preventDefault();
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }

  function handleScrollTop(e) {
    e.preventDefault();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function scrollToView(e) {
    e.preventDefault();
    const element = document.getElementById("portfolio");
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }

  function handleScroll(e) {
    e.preventDefault();
    let margin = 57;
    if (window.innerWidth <= 468) margin = 20;
    const i = window.innerHeight - margin;
    window.scroll({
      top: i,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <section className={stylesFrontEnd.header}>
        <nav className={stylesFrontEnd.nav}>
          <ul className={stylesFrontEnd.nav__list}>
            <FontAwesomeIcon
              icon={faBars}
              ref={ref}
              className={stylesFrontEnd.icone__burger}
              onClick={(e) => {
                e.preventDefault();
                setToggleNav(!toggleNav);
              }}
            />
            <div
              className={
                stylesFrontEnd.nav__content +
                (toggleNav ? " " + stylesFrontEnd.toggle_nav : "")
              }
            >
              <div className={stylesFrontEnd.nav__dropdown}>
                <li className={stylesFrontEnd.nav__item}>
                  <a
                    href=""
                    className={stylesFrontEnd.nav__link}
                    onClick={handleScrollTop}
                  >
                    <FontAwesomeIcon icon={faHouseChimney} />
                  </a>
                </li>
                <li className={stylesFrontEnd.nav__item}>
                  <a
                    href=""
                    className={stylesFrontEnd.nav__link}
                    onClick={handleScroll}
                  >
                    Compétences
                  </a>
                </li>
                <li className={stylesFrontEnd.nav__item}>
                  <a
                    href=""
                    className={stylesFrontEnd.nav__link}
                    onClick={scrollToView}
                  >
                    Portfolio
                  </a>
                </li>
                <li className={stylesFrontEnd.nav__item}>
                  <a
                    href=""
                    className={stylesFrontEnd.nav__link}
                    onClick={handleScrollBottom}
                  >
                    Contact
                  </a>
                </li>
                {isAuth ? (
                  <li className={stylesFrontEnd.nav__item}>
                    <a
                      href="/admin/portfolios"
                      className={stylesFrontEnd.nav__link}
                    >
                      BackOffice
                    </a>
                  </li>
                ) : (
                  ""
                )}
              </div>
            </div>
          </ul>
        </nav>
        <div className={stylesFrontEnd.header__section}>
          <img
            src={BASE_URL_AWS + "avatar/avatar3.png"}
            className={stylesFrontEnd.avatar}
            alt="logo"
          />
          <h1 className={stylesFrontEnd.header__title}>Grégory Lacroix</h1>
          <h2 className={stylesFrontEnd.header__slogan}>
            Bonjour ! Je suis {text}
          </h2>
        </div>
      </section>
      <FontAwesomeIcon
        icon={faArrowDown}
        className={stylesFrontEnd.arrow__down}
        onClick={handleScroll}
      />
    </>
  );
}
