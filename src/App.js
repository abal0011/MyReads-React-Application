import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Search from './Search'
import Home from './home'
import * as BooksAPI from './BooksAPI'
class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ books }))
    })
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/Search" render={() => (
            <Search books={this.state.books} />
          )} />
          <Route exact path="/" render={() => (
            <Home />
          )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
