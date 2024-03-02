import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation createBook($book: [IBook]) {
    createBook(book: $book) @client
  }
`;

export const UPDATE_BOOK = gql`
  mutation updateBook($book: [IBook]) {
    updateBook(book: $book) @client
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: Int!) {
    deleteBook(id: $bookId) @client
  }
`;

export const DELETE_BOOKS = gql`
  mutation deleteBooks($bookIds: [Int!]!) {
    deleteBooks(ids: $bookIds) @client
  }
`;

export const GET_ALL_BOOKS = gql`
  query getAllBooks {
    books
  }
`;

export const GET_BOOK_BY_ID = gql`
  query getBookById($bookId: Int!) {
    getBookById(id: $bookId) @client {
      id
      name
      types
      author
      rating
      year
    }
  }
`;
