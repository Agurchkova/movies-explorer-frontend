import "./Portfolio.css";

function Portfolio () {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list-projects">
        <li>
          <a className="portfolio__link"
            target="_blank"
            rel="noreferrer" 
            href="https://github.com/Agurchkova/how-to-learn"> 
            Статичный сайт
          </a>
          <span>&#x2197;</span>
        </li>
        <li>
          <a className="portfolio__link"
            target="_blank" 
            rel="noreferrer" 
            href="https://github.com/Agurchkova/russian-travel">
            Адаптивный сайт
          </a>
          <span>&#x2197;</span>
        </li>
        <li>
          <a className="portfolio__link" 
            target="_blank"
            rel="noreferrer" 
            href="https://github.com/Agurchkova/react-mesto-api-full-gha">
            Одностраничное приложение
          </a>
          <span>&#x2197;</span>
        </li>
      </ul>
    </section>
  )
};

export default Portfolio;