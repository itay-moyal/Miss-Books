const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"

export function BookIndex() {
  const [books, setBooks] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    return bookService.query().then(setBooks)
  }

  if (!books)
    return (
      <div className="loader">
        <p>Loading...</p>
      </div>
    )
  return <h1>{books.title}</h1>
}
