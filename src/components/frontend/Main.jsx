import React, { useEffect, useRef, useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { getApiPortfolio } from "../../utils/api";
import Slider from "./Slider";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/core";
import stylesFrontEnd from "../../css/frontend/style.module.css";

export default function () {
  // const BASE_URL = process.env.BASE_URL.replaceAll('/";', "").replace('"', "");
  const BASE_URL_AWS = process.env.REACT_BASE_URL_AWS.replaceAll(
    '/";',
    ""
  ).replace('"', "");

  const [data, setData] = useState([]);

  useEffect(() => {
    const data = async () => {
      const request = await getApiPortfolio();
      if (!request) return alert("data error");
      setData(request.data);
    };

    data();
  }, []);

  const ref = useRef();
  const [rollInLeft, setRollInLeft] = useState(false);
  ref.current = rollInLeft;

  useEffect(() => {
    const rollInLeftChange = () => {
      const show = document.body.scrollHeight >= 500;

      if (ref.current !== show) {
        setRollInLeft(true);
      }
    };

    window.addEventListener("scroll", rollInLeftChange);

    return () => window.removeEventListener("scroll", rollInLeftChange);
  }, []);

  const [text] = useTypewriter({
    words: [
      "Je suis passionné par la programmation et le développement web",
      "J'aime le design, l'UX et le code de qualité",
      "Aujourd'hui, je travaille principalement avec React / Symfony",
    ],
    loop: 0,
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 500,
    // onLoopDone: handleDone,
  });

  return (
    <div className={stylesFrontEnd.main}>
      <section className={stylesFrontEnd.main__about}>
        <h2 className={stylesFrontEnd.title__about}>{text}</h2>
      </section>
      <Slider />
      <section className={stylesFrontEnd.main__portfolio} id="portfolio">
        <h3 className={stylesFrontEnd.main__title__portfolio}>Portfolio</h3>
        <div className={stylesFrontEnd.cards__portfolio}>
          {data.map((element) => (
            <div
              className={
                stylesFrontEnd.card +
                " " +
                (rollInLeft ? stylesFrontEnd.roll_in_left : "")
              }
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
                  {element.skills}
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
