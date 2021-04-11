// mutations.js:
import gql from 'graphql-tag';


// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        username
      }
      token
      user {
        _id
      }
    }
  }
`;
// ADD_USER will execute the addUser mutation.
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      
  token
   user {
    _id
    username
    email
    bookCount
    savedBooks {
      id
      authors
      description
      bookId
      image
      link
      title
    }
    
  }
  
      
    }
  }
`;
// SAVE_BOOK will execute the saveBook mutation.
export const SAVE_BOOK = gql`

mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
      
     username
      savedBooks{
        authors
        description
        bookId
        image
        link
        title
      }
     
      
    }
  }
`;
// REMOVE_BOOK will execute the removeBook mutation.
export const REMOVE_BOOK = gql`

mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
   username
      bookCount
    }
  }
`;