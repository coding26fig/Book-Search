import { gql } from '@apollo/client';

export const GET_ME = gql`
  query Query {
    me {
      _id
      username
      email
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
