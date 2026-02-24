const { Link } = ReactRouterDOM
import { BookPreview } from "../cmps/BookPreview.jsx"

export function BookList({ books, onRemove }) {
  return (
    <section className="book-list">
      <ul className="fluid-grid">
        {books.map((book) => (
          <li key={book.id}>
            <BookPreview book={book} />

            <div className="actions">
              <Link to={`/book/${book.id}`}>
                <button className="btn-details">Details</button>
              </Link>
              <Link to={`/book/edit/${book.id}`}>
                <button className="btn-edit">Edit</button>
              </Link>
              <button className="remove-btn" onClick={() => onRemove(book.id)}>
                x
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
