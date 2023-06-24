import "./AboutMe.css";
import photo from "../../images/photo hh.jpeg";

function AboutMe () {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <article  className="about-me__bio">
          <span className="about-me__name">Елена</span>
          <span className="about-me__job">Фронтенд-разработчик</span>
          <span className="about-me__text">
            Я&nbsp;родилась и&nbsp;живу в&nbsp;Санкт-Петербурге, закончила экономический факультет в&nbsp;СПбГМТУ. 
            Люблю учиться и&nbsp;осваивать новые технологии. Больше всего во&nbsp;фронтенд&mdash;разработке
            мне нравится процесс создания с&nbsp;нуля продукта своими руками. Из&nbsp;хобби: люблю путешествовать
            (уже посетила 20&nbsp;стран и&nbsp;не&nbsp;собираюсь останавливаться) и&nbsp;кататься на&nbsp;велосипеде.
          </span>
          <a className="about-me__link" 
          href="https://github.com/Agurchkova" 
          target="_blank" 
          rel="noreferrer">Github</a>
        </article>
        <img
          className="about-me__photo"
          src={photo}
          alt="Фотография"
        />
      </div>
    </section>
  )
};

export default AboutMe;