import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import BookPage from './pages/BookPage';
import BooksPage from './pages/BooksPage';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Author, Book, Review, Topic, User } from './tipovi';
import { SERVER } from './util';
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [fetching, setFetching] = useState(true);
  const [books, setBooks] = useState<Book[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  useEffect(() => {
    axios.get(SERVER + '/check').then(res => {

      setUser(res.data);

      return axios.get(SERVER + '/book')
    })
      .then(res => {
        setBooks(res.data);
        return axios.get(SERVER + '/topic')
      })
      .then(res => {
        setTopics(res.data);
        return axios.get(SERVER + '/author')
      })
      .then(res => {
        setAuthors(res.data);
      })
      .finally(() => {
        setFetching(false)
      })
  }, [])
  useEffect(() => {
    if (!user) {
      return;
    }
    setFetching(true);
    axios.get(SERVER + '/book').then(res => {
      setBooks(res.data);
      return axios.get(SERVER + '/topic')
    })
      .then(res => {
        setTopics(res.data);
        return axios.get(SERVER + '/author')
      })
      .then(res => {
        setAuthors(res.data);
      })
      .finally(() => {
        setFetching(false)
      })
  }, [user])
  const getBook = (id: number) => {
    return books.find(element => element.id === id);
  }
  if (fetching) {
    return <Loading />
  }
  const addBook = (b: Book) => {
    setBooks(prev => {
      return [...prev, b];
    })
  }
  const createReview = async (c: Review) => {
    c.user = user;
    const res = await axios.post(SERVER + '/review', c as Review)
    const id = res.data.id;
    setBooks(prev => {

      return prev.map(element => {
        if (element.id === c.book?.id) {
          return {
            ...element, reviews: [...element.reviews, {
              ...c, id
            }]
          }
        }
        return element;

      })

    })
  }
  const updateBook = (b: Book) => {
    setBooks(prev => {
      return prev.map(element => {
        if (element.id === b.id) {
          return b;
        }
        return element;
      })
    })
  }
  const deleteBook = (id: number) => {
    setBooks(prev => {
      return prev.filter(element => element.id !== id);
    })
  }

  return (
    <>
      <Navbar full={user !== undefined} logout={() => { setUser(undefined) }} admin={user?.isAdmin} />

      <Switch>
        <Route path='/login'>
          {user ? (
            <Redirect to='/' />
          ) : (
            <Login setUser={setUser} />
          )}
        </Route>
        <Route path='/register'>
          {user ? (
            <Redirect to='/' />
          ) : (
            <Register setUser={setUser} />
          )}

        </Route>
        <PrivateRoute active={user?.isAdmin || false} path='/dashboard' redirect='/'>
          <Dashboard
            books={books}
            authors={authors}
            topics={topics}
            createBook={addBook}
            updateBook={updateBook}
            deleteBook={deleteBook}
          />
        </PrivateRoute>
        <PrivateRoute active={user !== undefined} path='/books/:id' redirect='/login'>
          <BookPage getBook={getBook} addReview={createReview} />
        </PrivateRoute>
        <PrivateRoute active={user !== undefined} path='/books' redirect='/login'>
          <BooksPage authors={authors} topics={topics} books={books} />
        </PrivateRoute>
        <PrivateRoute active={user !== undefined} path='/' redirect='/login'>
          <Home books={books} topics={topics} />
        </PrivateRoute>


      </Switch>
    </>
  );
}

export default App;
