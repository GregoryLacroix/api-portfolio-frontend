import React from "react";
import stylesFrontEnd  from "../../css/frontend/style.module.css";

export default function () {
  return (
    <>
      <section className={stylesFrontEnd.footer}>
        <p className={stylesFrontEnd.footer__copyrigth}>
          Made by&nbsp;
          <i className={"em em-hearts " + stylesFrontEnd.icone__heart}></i>
        </p>
        <div className={stylesFrontEnd.footer_reseaux}>
          <a
            href="https://www.linkedin.com/in/gregory-lacroix/"
            className={stylesFrontEnd.footer__link}
            target="_blank"
          >
            <i className={"devicon-linkedin-plain " + stylesFrontEnd.icone__linkedin + " " + stylesFrontEnd.icone__footer}></i>
          </a>
          <a
            href="https://github.com/GregoryLacroix"
            className={stylesFrontEnd.footer__link}
            target="_blank"
          >
            <i className={"devicon-github-original " + stylesFrontEnd.icone__github + " " + stylesFrontEnd.icone__footer}></i>
          </a>
        </div>
      </section>
    </>
  );
}
