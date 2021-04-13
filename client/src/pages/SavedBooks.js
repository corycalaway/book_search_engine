import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations'

const SavedBooks = () => {
  console.log(GET_ME)
  const { loading, data } = useQuery(GET_ME)
  console.log(loading)
  const userData = data
  const [removeBook, { error }] = useMutation(REMOVE_BOOK, {refetchQueries: [
    { query: GET_ME }
  ]})


  // const [userData, setUserData] = useState(data);
  // // if(!loading){
  // // console.log(data)
  // setUserData(data);
  // }
  // if data isn't here yet, say so





  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {


    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(bookId)
    if (!token) {
      return false;
    }
    console.log(token)

    try {
      const { data } = await removeBook({
        variables: { bookId }
      });
      console.log(data.removeBook.token)
      removeBookId(bookId);
      Auth.loggedIn(token);
    } catch (e) {
      console.error(e);
    }

  };

  if (!userData) {
    return <h2>LOADING...</h2>;
  }
  console.log(userData)
  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.me.savedBooks.length
            ? `Viewing ${userData.me.savedBooks.length} saved ${userData.me.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.me.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
  // }
};

export default SavedBooks;

// SavedBooks.js:

// Remove the useEffect() Hook that sets the state for UserData.

// Instead, use the useQuery() Hook to execute the GET_ME query on load and save it to a variable named userData.

// Use the useMutation() Hook to execute the REMOVE_BOOK mutation in the handleDeleteBook() function instead of the deleteBook() function that's imported from API file. (Make sure you keep the removeBookId() function in place!)