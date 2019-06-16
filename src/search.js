import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import { PropTypes } from 'prop-types'
import { debounce } from 'lodash'

export class Search extends Component {
    state = { books: [] }

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
                if (!books) {
                    this.setState({ books: [] })

                }
                else {
                    books = books.filter((book) => (book.imageLinks))
                    books = this.updateShelf(books)
                    this.setState({ books })
                }

            })
        }
        else {
            this.setState({ books: [] })
        }

    }

    updateShelf = debounce((books) => {

        let all_Books = this.state.books
        for (let book of books) {
            for (let b of all_Books) {
                if (b.id === book.id) {
                    book.shelf = b.shelf
                }
            }
        }
        for (let book of books) {
            book.shelf = "none"
        }


        return books
    }, 500)
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
              </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
