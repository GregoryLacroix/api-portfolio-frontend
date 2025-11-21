import React, { useEffect, useRef, useState } from "react";
import { useTypewriter } from "react-simple-typewriter";
import { getApiPortfolio } from "../../utils/api";
import Slider from "./Slider";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/core";
import stylesFrontEnd from "../../css/frontend/style.module.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function () {
  const BASE_URL_AWS = (
    import.meta.env.VITE_BASE_URL_AWS ||
    process.env.REACT_BASE_URL_AWS ||
    ""
  ).replace(/['";]/g, "");

  const [data, setData] = useState([]);
  const cardsRef = useRef([]);

  /** 🔹 Récupération API */
  useEffect(() => {
    const fetchData = async () => {
      const request = await getApiPortfolio();
      if (!request) return alert("data error");
      setData(request.data);
    };

    fetchData();
  }, []);

  /** 🔹 Animation GSAP */
  useEffect(() => {
    if (data.length === 0) return;

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            end: "top 20%",
            scrub: true, // animation suit le scroll
            markers: false,
          },
        }
      );
    });
  }, [data]);

  /** 🔹 Typewriter */
  const [text] = useTypewriter({
    words: [
      "Je code des mondes que seul le web révèle.",
      "Je transforme des idées en lumière numérique.",
      "Je sculpte l’invisible, une ligne de code à la fois.",
      "Entre pixels et logique, je fais naître des expériences.",
      "J’écris le web comme d’autres écrivent des poèmes.",
    ],
    loop: 0,
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 500,
  });

  return (
    <div className={stylesFrontEnd.main}>
      <section className={stylesFrontEnd.main__about} id="competences">
        <h2 className={stylesFrontEnd.title__about}>{text}</h2>
      </section>
      <section className={stylesFrontEnd.main__about}>
        <div className={stylesFrontEnd.main__about__content}>
          <p className={stylesFrontEnd.undertitle__about}>
            Développeur web depuis neuf ans, j’explore le web comme un terrain
            de jeu où React, Symfony et Node.js sont mes outils de prédilection.
          </p>
          <p className={stylesFrontEnd.undertitle__about}>
            J’aime transformer une idée en interface vivante, donner du rythme à
            des données, et faire dialoguer le front et le back sans fausse
            note.
          </p>
          <p className={stylesFrontEnd.undertitle__about}>
            Depuis six ans, je suis aussi formateur digital : j’accompagne tout
            public — curieux, débutants, reconvertis ou passionnés — à
            apprivoiser le numérique. J’aime démystifier la technique, traduire
            le complexe en clair et révéler le potentiel de chacun.
          </p>
          <p className={stylesFrontEnd.undertitle__about}>
            {" "}
            Entre création, pédagogie et veille constante, j’évolue dans un web
            qui bouge vite… et c’est exactement ce qui me motive.
          </p>
        </div>
      </section>

      <Slider />

      <section className={stylesFrontEnd.main__portfolio} id="portfolio">
        <h3 className={stylesFrontEnd.main__title__portfolio}>Projets</h3>

        <div className={stylesFrontEnd.cards__portfolio}>
          {data.map((element, index) => (
            <div
              className={stylesFrontEnd.card}
              ref={(el) => (cardsRef.current[index] = el)}
              key={element.id}
            >
              <a
                href={element.url}
                className={
                  element.bgColor
                    ? stylesFrontEnd.card__link + " " + element.bgColor
                    : stylesFrontEnd.card__link
                }
                target="_blank"
              >
                <img
                  src={BASE_URL_AWS + "logos/" + element.image}
                  alt={element.title}
                  className={stylesFrontEnd.card__picture}
                />
              </a>

              <div className={stylesFrontEnd.card__content}>
                <h4 className={stylesFrontEnd.card__title}>{element.title}</h4>
                <p className={stylesFrontEnd.card__description}>

                  <i
                    className={
                      element.skills + " " + stylesFrontEnd.icones__skills
                    }
                    title={element.name}
                  ></i>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={stylesFrontEnd.main__contact}>
        <p className={stylesFrontEnd.contact__infos}>
          Pour me contacter, cliquez sur un des liens
          <i className="em em-point_down"></i>
        </p>

        <h2 className={stylesFrontEnd.main__title__contact}>
          Disponible pour des&nbsp;
          <a
            href="mailTo:gregorylacroix78@gmail.com"
            className={stylesFrontEnd.link__hire}
            target="_blank"
            title="mailto"
          >
            missions
          </a>
          &nbsp;ou pour tout projet&nbsp;
          <a
            href="mailTo:gregorylacroix78@gmail.com"
            className={stylesFrontEnd.link__freelance}
            target="_blank"
            title="mailto"
          >
            freelance
          </a>
        </h2>
      </section>
    </div>
  );
}
