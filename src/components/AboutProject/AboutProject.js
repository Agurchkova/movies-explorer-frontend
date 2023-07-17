import "./AboutProject.css";

function AboutProject ({ aboutRef }) {
  return (
    <section className="about" id="about-project" ref={aboutRef}>
      <h2 className="about__title">О проекте</h2>
      <div className="about__description-area">
        <div className="about__description-column">
          <h3>Дипломный проект включал 5&nbsp;этапов</h3>
            <span>Составление плана, работу над бэкендом, вёрстку, 
                добавление функциональности и&nbsp;финальные доработки.
            </span>
        </div>
        <div className="about__description-column">
          <h3>На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
            <span>У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, 
              которые нужно было соблюдать, чтобы успешно защититься.
            </span>
        </div>
      </div>
      <div>
        <div className="about__time-line">
          <div className="about__backend">1&nbsp;неделя</div>
          <div className="about__frontend">4&nbsp;недели</div>
        </div>
        <div className="about__time-text">
          <div className="about__backend-text">Back-end</div>
          <div className="about__frontend-text">Front-end</div>
        </div>
      </div>
    </section>
  )
};

export default AboutProject;