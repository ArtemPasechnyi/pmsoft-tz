import { ApolloClient, InMemoryCache } from "@apollo/client";
import { IBook } from "../shared/model/interfaces";
import { GET_ALL_BOOKS } from "./method";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  resolvers: {
    Mutation: {
      createBook: (_, variables, { cache }) => {
        const { book } = variables;
        const query = GET_ALL_BOOKS;
        const { books } = cache.readQuery({ query });

        const maxId = Math.max(...books.map((book: any) => book.id));

        book.id = !books.length ? 1 : maxId + 1;
        const data = { books: [book, ...books] };

        cache.writeQuery({ query, data });

        return data;
      },

      deleteBook: (_, variables, { cache }) => {
        const { id } = variables;
        const query = GET_ALL_BOOKS;
        const { books } = cache.readQuery({ query });

        const bookIndex = books.findIndex((book: IBook) => book.id === id);
        const newBooks = [...books];
        newBooks.splice(bookIndex, 1);
        const data = { books: [...newBooks] };

        cache.writeQuery({ query, data });

        return data;
      },

      deleteBooks: (_, variables, { cache }) => {
        const { ids } = variables;
        const query = GET_ALL_BOOKS;
        const { books } = cache.readQuery({ query });

        const newBooks = books.filter((book: IBook) => !ids.includes(book.id));

        const data = { books: [...newBooks] };

        cache.writeQuery({ query, data });

        return data;
      },

      updateBook: (_, variables, { cache }) => {
        const { book } = variables;
        const { id } = book;
        const query = GET_ALL_BOOKS;
        const { books } = cache.readQuery({ query });
        const newBooks = [...books];
        const bookIndex = books.findIndex((book: IBook) => book.id === id);
        newBooks[bookIndex] = book;

        const data = { books: [...newBooks] };

        cache.writeQuery({ query, data });

        return data;
      },
    },
    Query: {
      getBookById: (_, variables, { cache }) => {
        const { id } = variables;
        const query = GET_ALL_BOOKS;
        const { books } = cache.readQuery({ query });
        const bookIndex = books.findIndex((book: IBook) => book.id === id);

        return books[bookIndex];
      },
    },
  },
});
