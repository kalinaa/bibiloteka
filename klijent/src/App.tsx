import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import { Author, Book, Topic, User } from './tipovi';
import { SERVER } from './util';
import axios from 'axios';
import Loading from './components/Loading';
import { Switch, Route, Redirect } from 'react-router';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import BooksPage from './pages/BooksPage';
import BookPage from './pages/BookPage';
import Dashboard from './pages/Dashboard';
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
        <PrivateRoute active={user?.isAdmin || false} path='/dashboard' redirect='/login'>
          <Dashboard books={books} authors={authors} topics={topics} />
        </PrivateRoute>
        <PrivateRoute active={user !== undefined} path='/books/:id' redirect='/login'>
          <BookPage getBook={getBook} />
        </PrivateRoute>
        <PrivateRoute active={user !== undefined} path='/books' redirect='/login'>
          <BooksPage authors={authors} topics={topics} books={books} />
        </PrivateRoute>
        <PrivateRoute active={user !== undefined} path='/' redirect='/login'>

        </PrivateRoute>


      </Switch>
    </>
  );
}

export default App;
