import React, { useEffect } from "react";
import Nav from "../../components/backend/Nav";
import SideBar from "../../components/backend/Sidebar";
import Main from "../../components/backend/MainDashboard";
import Footer from "../../components/backend/Footer";
import "../../css/backend/main.min.css";
import "../../js/main";

const AdminHome = () => {
  useEffect(() => {
    const html = document.documentElement; // plus clair que getElementsByTagName("html")[0]
    html.classList.add(
      "has-aside-left",
      "has-aside-mobile-transition",
      "has-navbar-fixed-top",
      "has-aside-expanded"
    );

    // Nettoyage optionnel (au démontage du composant)
    return () => {
      html.classList.remove(
        "has-aside-left",
        "has-aside-mobile-transition",
        "has-navbar-fixed-top",
        "has-aside-expanded"
      );
    };
  }, []); // [] = ne s’exécute qu’une fois au montage

  return (
    <>
      <Nav />
      <SideBar />
      <Main />
      <Footer />
    </>
  );
};

export default AdminHome;
