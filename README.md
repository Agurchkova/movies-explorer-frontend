# Проект: Поисковик фильмов (frontend для дипломного проекта)

# О проекте
Дипломный проект выполнен в рамках курса "Веб-разработчик" от <a href="https://practicum.yandex.ru/">Яндекс.Практикум</a>. 
Проект представляет собой React приложение, стилизованное под часть функционала сервиса типа "кино-поиск".
После авторизации на сайте пользователь попадает на страницу поиска фильмов, становятся доступны остальные страницы - главная страница
с информацией о студенте, страница поиска фильмов, страница с сохраненными пользователем фильмами, страница профиля пользователя,
страница 404. 
Реализация поиска фильмов: список фильмов загружается через API Beatfilm, данные отфильтровываются в соответствии со строкой запроса
и положением чек-бокса для отбора короткометражных фильмов формы поиска. Регистрация, авторизация, добавление фильмов в избранное
происходит через взаимодействие с разработанным API. В формах реализована валидация данных.

<img align="center" src="https://github.com/Agurchkova/Agurchkova/blob/main/movies.jpg" width="1012" alt="Movies"/>

## Технологический стек:
#####  <li>HTML</li>
#####  <li>CSS</li>
#####  <li>JS</li>
#####  <li>React</li>
#####  <li>React Router</li>
#####  <li>Create React App</li>
#####  <li>Node.js</li>
#####  <li>MongoDB</li>
#####  <li>Express</li>
#####  <li>Адаптивная верстка с использованием медиа-запросов</li>
#####  <li>Семантическая вёрстка</li>

### Планы по доработке проекта:
#####  <li>Доработать дизайн сайта;</li>
#####  <li>Добавить кнопку очистки формы поиска фильмов;</li>
#####  <li>Добавить функцию выставления оценки фильмам;</li>
#####  <li>Добавить иконку рейтинга фильмов;</li>
#####  <li>Добавить функцию, чтобы при клике на фильм всплывал попап, где бы отображалось 
#####  полное описание фильма,с рецензией, и нажав дополнительно на обложку, открывался трейлер.</li>

### Запуск проекта

```ts
git clone https://github.com/Agurchkova/movies-explorer-frontend.git
cd movies-explorer-frontend
npm install
npm run build 
npm start
```

##### Ссылка на макет проекта: https://disk.yandex.ru/d/xF_rGEkKCjJf0A
##### Ссылка на проект: https://agurchkova.movies.nomoredomains.rocks
