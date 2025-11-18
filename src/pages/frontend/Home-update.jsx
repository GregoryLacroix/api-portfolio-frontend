import React from "react";
import Canvas from "../../components/frontend/Canvas";
import Header from "../../components/frontend/Header";
import Main from "../../components/frontend/Main";
import Footer from "../../components/frontend/Footer";

const Home = () => {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove(
      "has-aside-left",
      "has-aside-mobile-transition",
      "has-navbar-fixed-top",
      "has-aside-expanded"
    );
  }, []); // [] => s’exécute une seule fois au montage

  return (
    <div
      className="container-home-previous"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={"/assets/images/maintenance-page.png"}
        className="picture__maintenance"
        alt="picture maintenance"
      />
    </div>
  );
};

export default Home;
