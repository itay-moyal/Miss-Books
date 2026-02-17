const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"

export function BookIndex() {
  const [books, setBooks] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    return bookService.query().then(setBooks)
  }

  function removeBook(bookId) {
    return bookService
      .remove(bookId)
      .then(() =>
        setBooks((prevBook) => prevBook.filter((book) => book.id !== bookId)),
      )
  }

  if (!books)
    return (
      <div className="loader">
        <p>Loading...</p>
      </div>
    )
  return <BookList books={books} onRemove={removeBook} />
}
