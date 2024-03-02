import { gql, useQuery } from "@apollo/client";
import { Button } from "antd";
import { Key } from "react";
import { Link } from "react-router-dom";
import { IBook } from "../../../shared/model/interfaces";
import { BookCard } from "../features/CardBook/ui/CardBook";
import styles from "./BookList.module.css";

const GET_ALL_BOOKS = gql`
  query getAllBooks {
    books @client {
      id
      name
      types
      author
      rating
      year
    }
  }
`;

const AddBook = () => {
  return (
    <Link to={`/form`} className={styles.item}>
      <Button type="primary">Добавить новую книгу</Button>
    </Link>
  );
};

export const BookList = () => {
  const { data = [] } = useQuery(GET_ALL_BOOKS);
  const { books = [] } = data;

  return !books.length ? (
    <div className={styles.root}>
      <h2 className={styles.item}>Список книг пустой</h2>
      <h4 className={styles.item}>Хотите добавить?</h4>
      <AddBook />
    </div>
  ) : (
    <div className={styles.listRoot}>
      <div className={styles.header}>
        <AddBook />
      </div>

      <div className={styles.books}>
        {books.map((book: IBook, index: Key) => {
          return <BookCard book={book} key={index} />;
        })}
      </div>
    </div>
  );
};
