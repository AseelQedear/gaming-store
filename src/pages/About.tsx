import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/About.scss';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="about-page-section py-5">
      <div className="container text-center" data-aos="fade-up">
        <h2 className="section-title mb-4">🎮 {t("about_page.story_title")}</h2>

        <p className="about-description lead">{t("about_page.story_paragraph1")}</p>
        <p className="about-description">{t("about_page.story_paragraph2")}</p>
        <p className="about-description">{t("about_page.story_paragraph3")}</p>

        <div className="gif-banner my-5" data-aos="fade-up">
          <div className="gif-cropper">
            <img
              src="/media/Kawaii Pixel Cyberpunk Room.gif"
              alt="Gaming Dreams"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>

        <h2 className="section-title mb-4">🕹️ {t("about_page.journey_title")}</h2>
        <div className="timeline-horizontal" data-aos="fade-up">
          <div className="timeline-track">
            {[
              { year: 2005, key: "milestone1" },
              { year: 2010, key: "milestone2" },
              { year: 2015, key: "milestone3" },
              { year: 2020, key: "milestone4" },
              { year: 2024, key: "milestone5" },
            ].map((event, i) => (
              <div className="timeline-event" key={i}>
                <span className="timeline-year">{event.year}</span>
                <p>{t(`about_page.timeline.${event.key}`)}</p>
              </div>
            ))}
          </div>
        </div>

        <h2 className="section-title mb-4">✨ {t("about_page.mission_title")}</h2>
        <p className="about-description">{t("about_page.mission_paragraph1")}</p>
        <p className="about-description">{t("about_page.mission_paragraph2")}</p>

        <div className="fun-fact mt-5">
        <span>🎮 {t("about_page.fun_fact")}</span>
      </div>

      </div>
    </section>
  );
};

export default About;
