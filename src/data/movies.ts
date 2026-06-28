export type Movie = {
  id: string;
  title: string;
  poster: string;
  backdrop?: string;
  titleImage?: string;
  rating: string;
  year: string;
  genre: string;
  duration: string;
  age: string;
  description: string;
  video: string;
};

// Real, freely-licensed films (Blender open movies / Internet Archive).
const SINTEL = "https://archive.org/download/Sintel/sintel-2048-surround.mp4";
const ED = "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4";
const BBB =
  "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4";
const BBB2 = "https://www.w3schools.com/html/mov_bbb.mp4";

export const movies: Movie[] = [
  {
    id: "indiana-jones",
    title: "Индиана Джонс и колесо судьбы",
    poster: "/images/2/poster.png",
    backdrop: "/images/1/bg.png",
    titleImage: "/images/1/title.png",
    rating: "7,5",
    year: "2023",
    genre: "Боевик, приключения",
    duration: "2 ч 34 мин",
    age: "16+",
    description:
      "Неувядающий авантюрист и пытливый археолог-исследователь по-прежнему в седле. Последнее приключение приводит его к артефакту, способному переписать ход истории.",
    video: SINTEL,
  },
  {
    id: "blue-beetle",
    title: "Синий жук",
    poster: "/images/2/poster.png",
    rating: "7,0",
    year: "2023",
    genre: "Фантастика, боевик",
    duration: "2 ч 07 мин",
    age: "12+",
    description:
      "Студент Хайме Рейес неожиданно становится носителем древнего инопланетного артефакта, который дарит ему боевой экзокостюм и меняет всю его жизнь.",
    video: BBB,
  },
  {
    id: "home-team",
    title: "Домашняя игра",
    poster: "/images/3/poster.png",
    rating: "6,9",
    year: "2022",
    genre: "Спорт, комедия",
    duration: "1 ч 35 мин",
    age: "6+",
    description:
      "Отстранённый от большого спорта тренер возвращается в родной город и берётся за детскую команду, чтобы доказать себе и сыну, что ещё чего-то стоит.",
    video: ED,
  },
  {
    id: "salyut-7",
    title: "Салют 7",
    poster: "/images/4/poster.png",
    rating: "7,8",
    year: "2017",
    genre: "Драма, история",
    duration: "1 ч 51 мин",
    age: "12+",
    description:
      "Орбитальная станция перестаёт отвечать на сигналы с Земли. Двум космонавтам предстоит совершить невозможное: состыковаться с неуправляемым аппаратом и спасти станцию.",
    video: SINTEL,
  },
  {
    id: "catch-me-if-you-can",
    title: "Поймай меня, если сможешь",
    poster: "/images/5/poster.jpeg",
    rating: "8,3",
    year: "2002",
    genre: "Драма, криминал",
    duration: "2 ч 21 мин",
    age: "12+",
    description:
      "Реальная история талантливого мошенника, который успел поработать пилотом, врачом и адвокатом, прежде чем за ним началась настоящая охота агента ФБР.",
    video: BBB2,
  },
  {
    id: "red-notice",
    title: "Красное уведомление",
    poster: "/images/7/poster.png",
    rating: "6,3",
    year: "2021",
    genre: "Боевик, комедия",
    duration: "1 ч 58 мин",
    age: "16+",
    description:
      "Профайлер Интерпола вынужден объединиться с самым разыскиваемым в мире вором, чтобы поймать ещё более неуловимую аферистку. Погоня охватывает весь мир.",
    video: ED,
  },
  {
    id: "my-fault",
    title: "Моё прекрасное несчастье",
    poster: "/images/6/poster.png",
    rating: "7,1",
    year: "2023",
    genre: "Мелодрама",
    duration: "1 ч 57 мин",
    age: "18+",
    description:
      "Переехав в новый дом, Ноа знакомится со сводным братом Ником, дерзким и недосягаемым. Их взаимное притяжение оказывается сильнее всех запретов.",
    video: SINTEL,
  },
  {
    id: "the-witcher",
    title: "Ведьмак",
    poster: "/images/8/poster.png",
    rating: "7,9",
    year: "2019",
    genre: "Фэнтези, приключения",
    duration: "Сериал",
    age: "18+",
    description:
      "Геральт из Ривии, наёмный охотник на чудовищ, ищет своё место в мире, где люди нередко оказываются куда коварнее монстров.",
    video: BBB,
  },
];

export const getMovie = (id: string) => movies.find((m) => m.id === id);

export const featuredMovie = movies[0];
