import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import Search from './search'
import Home from './home'
class BooksApp extends React.Component {


  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <Search />
        )} />
        <Route exact path="/" render={() => (
          <Home />
        )} />
      </div>
    )
  }
}

export default BooksApp
