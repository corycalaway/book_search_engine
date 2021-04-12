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
//fix user to book
// saveBook(input: BookInput!): User
//     removeBook(bookId: String!): User


// mutation saveBook($input: BookInput!) {
//     saveBook(input: $input) {

//      username
//       savedBooks{
//         authors
//         description
//         bookId
//         image
//         link
//         title
//       }


//     }
//   }
// {
//     "input": {
//       "authors": "no",
//       "description": "a little to late",
//       "bookId": "2354",
//       "image": "none",
//       "link": "none",
//       "title": "sun light forever"
//     }
//   }
// {
//     "id": "60727ca250a5b551ec65a5a6"
//  "post": {
//    "authors": "Jenny Bo Little",
//    "description": "a little to late",
//    "bookId": "2354",
//    "image": "none",
//    "link": "none",
//    "title": "sun light forever"
//  }
// }
// type Query {
//     me: User
//     users: [User]
//     user(username: String!): User
//     savedBooks(username: String): [bookSchema]

//   },
//typeDefs.js: Define the necessary Query and Mutation types:

// Query type:

// me: Which returns a User type.

// Mutation type:





// saveBook: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)

// removeBook: Accepts a book's bookId as a parameter; returns a User type.

// User type:

// _id

// username

// email

// bookCount

// savedBooks (This will be an array of the Book type.)



// Book type:

// bookId (Not the _id, but the book's id value returned from Google's Book API.)

// authors (An array of strings, as there may be more than one author.)

// description

// title

// image

// link

// Auth type:

// token

// user (References the User type.)

// export the typeDefs
module.exports = typeDefs;