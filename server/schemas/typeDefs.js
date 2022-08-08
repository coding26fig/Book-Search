const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    description: String
    bookId: String
    image: String
    link: String
    title: String
    authors: [String]
  }

  input inputBook {
    description: String
    bookId: String
    image: String
    link: String
    title: String
    authors: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(book: inputBook!): User
    removeBook(removedBookId: String!): User
  }
`;

module.exports = typeDefs;
