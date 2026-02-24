const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { showSuccessMsg } from "../services/event-bus.service.js"

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    return bookService.query(filterBy).then(setBooks)
  }

  function removeBook(bookId) {
    return bookService
      .remove(bookId)
      .then(
        () =>
          setBooks((prevBook) => prevBook.filter((book) => book.id !== bookId)),
        showSuccessMsg(`Book Removed Successfully`),
      )
  }

  if (!books)
    return (
      <div className="loader">
        <img style={{ color: "blue" }} src="./BooksImages/loader.svg" alt="" />
      </div>
    )
  return (
    <div className="book-index">
      <React.Fragment>
        <BookFilter filterBy={filterBy} setFilterBy={setFilterBy} />

        <Link to="/book/edit">
          <button>Add a Book</button>
        </Link>

        <BookList books={books} onRemove={removeBook} />
      </React.Fragment>
    </div>
  )
}
