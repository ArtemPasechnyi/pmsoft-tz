import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProvider } from "notistack";
import { ApolloProvider } from "@apollo/client";
import { GET_ALL_BOOKS } from "./common/method";
import { client } from "./common/createCache";
import FormikCreateBook from "./widgets/FormikCreateBook/ui/FormikCreateBook";
import { BookList } from "./widgets/BookList/ui/BookList";

const books = [
  {
    id: 1,
    name: "Властелин Колец",
    author: "Дж.Р.Р. Толкин",
    types: ["Фэнтези"],
    year: 1954,
    rating: 5,
  },
  {
    id: 2,
    name: "451 градус по Фаренгейту",
    author: "Рэй Брэдбери",
    types: ["Научная Фантастика"],
    year: 1953,
    rating: 4,
  },
  {
    id: 3,
    name: "Убийство в Восточном экспрессе",
    author: "Агата Кристи",
    types: ["Детектив"],
    year: 1934,
    rating: 4.5,
  },
  {
    id: 4,
    name: "Гордость и предубеждение",
    author: "Джейн Остин",
    types: ["Романтика"],
    year: 1813,
    rating: 5,
  },
  {
    id: 5,
    name: "Молчание ягнят",
    author: "Томас Харрис",
    types: ["Триллер"],
    year: 1988,
    rating: 4.5,
  },
  {
    id: 6,
    name: "Поместье Вайдахо",
    author: "Эрнест Хемингуэй",
    types: ["Историческая Проза"],
    year: 1940,
    rating: 4,
  },
  {
    id: 7,
    name: "Дневник Анны Франк",
    author: "Анна Франк",
    types: ["Нон-фикшн"],
    year: 1947,
    rating: 4.5,
  },
  {
    id: 8,
    name: "Стив Джобс: Биография",
    author: "Уолтер Айзексон",
    types: ["Биография"],
    year: 2011,
    rating: 4,
  },
  {
    id: 9,
    name: "Оно",
    author: "Стивен Кинг",
    types: ["Ужасы"],
    year: 1986,
    rating: 4.5,
  },
  {
    id: 10,
    name: "Путешествие к центру Земли",
    author: "Жюль Верн",
    types: ["Приключения"],
    year: 1864,
    rating: 4,
  },
].reverse();

const { cache } = client;

cache.writeQuery({
  query: GET_ALL_BOOKS,
  data: {
    books,
  },
});

const loader = (props: any) => {
  const { request } = props;
  const { url } = request;
  const urlID = new URL(url);
  const bookId = Number(urlID.searchParams.get("id"));

  return { bookId };
};

const router = createBrowserRouter([
  { path: "/", element: <BookList /> },
  { path: "/form", element: <FormikCreateBook />, loader },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SnackbarProvider maxSnack={5} autoHideDuration={4000}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
