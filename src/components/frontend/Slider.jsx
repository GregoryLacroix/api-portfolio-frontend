import React, { useEffect, useState } from "react";
import { getApiSkills } from "../../utils/api";
import stylesFrontEnd from "../../css/frontend/style.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function SkillsSlider() {
  const [dataSkills, setDataSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await getApiSkills();
      if (!request) return console.log("data skills error");
      setDataSkills(request.data);
    };
    fetchData();
  }, []);

  // Détermine si on peut activer le loop
  const shouldLoop = dataSkills.length >= 6; // ou selon slidesPerView max

  return (
    <section className={stylesFrontEnd.main__skills}>
      <h2 className={stylesFrontEnd.title__about__skills}>Outils & technologies</h2>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={6}
        spaceBetween={20}
        loop={shouldLoop}
        speed={500}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {dataSkills.map((element, index) => (
          <SwiperSlide key={index}>
            <div className={stylesFrontEnd.skills__item}>
              <i
                className={
                  element.cssClass + " " + stylesFrontEnd.icones__skills
                }
                title={element.name}
              ></i>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
