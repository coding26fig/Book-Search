import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation Mutation($book: inputBook!) {
    saveBook(book: $book) {
      username
      savedBooks {
        description
        bookId
        image
        link
        title
        authors
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation Mutation($removedBookId: String!) {
    removeBook(removedBookId: $removedBookId) {
      savedBooks {
        description
        bookId
        image
        title
        link
        authors
      }
    }
  }
`;
