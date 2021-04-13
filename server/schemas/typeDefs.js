// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
input BookInput {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}
type Book {
    id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
},
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]

  },
type Query {
    me: User
    users: [User]
    user(username: String!): User
    savedBooks(username: String): [Book]
  },
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: String!): User
  },
type Auth {
      token: ID!
      user: User
  }

`;

module.exports = typeDefs;