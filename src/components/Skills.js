import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import JavaImg from '../images/JAVA.png';
import ReactImg from '../images/React.png';
import SpringImg from '../images/Spring.png';
import DataAnalyticsImg from '../images/DataAnalytics.png';
import SQLImg from '../images/SQL.png';
import HibernateImg from '../images/Hibernate.png';
import WebTechImg from '../images/WebTech.png';
import PHPImg from '../images/PHP.png';
import ABAP from '../images/ABAP.png';

import './Skills.css';

const skills = [
  { name: 'Java', img: JavaImg },
  { name: 'ABAP', img: ABAP },
  { name: 'React', img: ReactImg },
  { name: 'Spring Boot', img: SpringImg },
  { name: 'Data Analytics', img: DataAnalyticsImg },
  { name: 'SQL', img: SQLImg },
  { name: 'Hibernate', img: HibernateImg },
  { name: 'Web-tech', img: WebTechImg },
  { name: 'PHP', img: PHPImg }
];

const Skills = () => {
  return (
    <section className="skills-section">
      <h2 className="skills-title">Skills</h2>
      <div className="skills-swiper-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
          }}
        >
          {skills.map((skill, index) => (
            <SwiperSlide key={index}>
              <div className="skill">
                <img src={skill.img} alt={skill.name} className="skill-icon" />
                <div className="skill-name">{skill.name}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Skills;