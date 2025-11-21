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
            href="https://www.gregory-lacroix-pf.com/Grégory-LACROIX-DEV-11-2025.pdf"
            className={stylesFrontEnd.footer__link}
            download="CV_Gregory_Lacroix.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Curriculum vitae"
          >
            <span className={stylesFrontEnd.footer__link__cv}>CV</span>
          </a>
          <a
            href="https://www.linkedin.com/in/gregory-lacroix/"
            className={stylesFrontEnd.footer__link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={"devicon-linkedin-plain " + stylesFrontEnd.icone__linkedin + " " + stylesFrontEnd.icone__footer}></i>
          </a>
          <a
            href="https://github.com/GregoryLacroix"
            className={stylesFrontEnd.footer__link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={"devicon-github-original " + stylesFrontEnd.icone__github + " " + stylesFrontEnd.icone__footer}></i>
          </a>
        </div>
      </section>
    </>
  );
}
