import React from "react";
import '../css/style.404.css';

const PageNotFound = () => {
  return (
    <main className="main__page__404">
      <h1 className="title__404">404</h1>
      <h2 className="subtitle__404">
        Oups ! La page que vous demandez n'existe pas.
      </h2>
      <a href="/" className="link__404">
        Retourner sur la page d'accueil
      </a>
    </main>
  );
};

export default PageNotFound;
