import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import { PropTypes } from 'prop-types'

export class Search extends Component {
    state = {
        books: []
    }

    static PropTypes = {
        books: PropTypes.array
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
    searchQuery = (event) => {
        const query = event.target.value
        if (query !== '') {
            BooksAPI.search(query, 20).then(books => {

                if (books.length > 0) {
                    books = books.filter((book) => (book.imageLinks))
                    books = this.updateShelf(books)
                    this.setState({ books })
                }
                else
                    this.setState({ books: [] })


            })
        }
        else {
            this.setState({ books: [] })
        }

    }

    updateShelf = (Tempbook) => {

        let all_Books = this.props.books
        for (let book of Tempbook) {
            for (let b of all_Books) {
                if (b.id === book.id) {
                    book.shelf = b.shelf
                }
                else
                    book.shelf = "none"
            }
        }
        return Tempbook
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
              </Link>
                    <div className="search-books-input-wrapper">

                        <input type="text" placeholder="Search by title or author" value={this.state.searchBook} onChange={this.searchQuery} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.length > 0 && <BookShelf handleChange={this.handleChange} books={this.state.books} />}
                    </ol>


                </div>
            </div>
        )
    }
}

export default Search
