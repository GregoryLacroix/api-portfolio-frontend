import React, { useEffect, useRef, useState } from "react";
import Nav from "../../components/backend/Nav";
import SideBar from "../../components/backend/Sidebar";
import Footer from "../../components/backend/Footer";
import MainSkillAdd from "../../components/backend/MainSkillAdd";

const AdminSkillAdd = () => {
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
      <MainSkillAdd />
      <Footer />
    </>
  );
};

export default AdminSkillAdd;
