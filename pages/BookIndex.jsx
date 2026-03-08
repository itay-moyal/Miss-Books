const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    bookService.getFilterFromSearchParams(searchParams),
  )

  useEffect(() => {
    loadBooks()
    setSearchParams(utilService.trimObj(filterBy))
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
