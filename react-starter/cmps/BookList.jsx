import { BookPreview } from "../cmps/BookPreview.jsx"
export function BookList({ books, onRemove }) {
  return (
    <section className="book-list">
      <ul className="fluid-grid">
        {books.map((book) => (
          <li key={book.id}>
            <BookPreview book={book} />

            <div className="actions">
              <button className="details-btn">Details</button>
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
