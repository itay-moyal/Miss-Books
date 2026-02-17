const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "./BookDetails.jsx"

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)

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
        <img style={{ color: "blue" }} src="./BooksImages/loader.svg" alt="" />
      </div>
    )
  return (
    <div className="book-index">
      {!selectedBook && (
        <BookList
          books={books}
          onRemove={removeBook}
          onSelect={setSelectedBook}
        />
      )}

      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onClearSelectedBook={() => setSelectedBook(null)}
        />
      )}
    </div>
  )
}
