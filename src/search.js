import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

export class Search extends Component {
    state = { books: [] }

    searchQuery = (event) => {
        const query = event.target.value
        if (query !== '') {
            BooksAPI.search(query, 20).then(books => {
                if (!books || books.error) {
                    this.setState({ books: [] })

                }
                else {
                    this.setState({ books })
                }
            })
        }
        else {
            this.setState({ books: [] })
        }

    }

    updateShelf = (book, shelf) => {
        console.log(book, shelf)
        BooksAPI.update(book, shelf).then(
            this.setState(oldState => ({
                books: oldState.books.map(b => {
                    if (b.id === book.id) {
                        b.shelf = shelf;
                    }
                    return b;
                })
            })
            )
        )
    }
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
                    {this.state.book = !undefined &&
                        <BookShelf books={this.state.books} />
                    }
                </div>
            </div>
        )
    }
}

export default Search
