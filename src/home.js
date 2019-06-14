import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
export class Home extends Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState(() => ({ books }))
        })
    }
    handleChange = (book, event) => {
        let e = event.target.value;
        BooksAPI.update(book, e).then(res => {
            book.shelf = e;
            this.updateBooks();
        })
    }

    updateBooks() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf handleChange={this.handleChange} shelf="Currently Reading" books={this.state.books.filter(book => book.shelf === 'currentlyReading')} />
                        <BookShelf handleChange={this.handleChange} shelf="Want to read" books={this.state.books.filter(book => book.shelf === 'wantToRead')} />
                        <BookShelf handleChange={this.handleChange} shelf="Read" books={this.state.books.filter(book => book.shelf === 'read')} />

                    </div>
                    <div className="open-search">
                        <Link
                            to="/search"
                            className="open-search">
                            Add a book
                </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
