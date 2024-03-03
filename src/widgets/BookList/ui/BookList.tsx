import { gql, useQuery } from "@apollo/client";
import { Key, useState } from "react";
import { IBook } from "../../../shared/model/interfaces";
import { AddBook } from "../features/AddBook/ui/AddBook";
import { BookCard } from "../features/CardBook/ui/CardBook";
import { RemoveBook } from "../features/RemoveBook/ui/RemoveBook";
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

export const BookList = () => {
  const { data = [] } = useQuery(GET_ALL_BOOKS);
  const { books = [] } = data;

  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

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
        <RemoveBook
          selectedBooks={selectedBooks}
          setSelectedBooks={setSelectedBooks}
        />
      </div>

      <div className={styles.books}>
        {books.map((book: IBook, index: Key) => {
          return (
            <BookCard
              book={book}
              key={index}
              setSelectedBooks={setSelectedBooks}
              selectedBooks={selectedBooks}
            />
          );
        })}
      </div>
    </div>
  );
};
