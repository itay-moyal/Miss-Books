import { BookPreview } from "../cmps/BookPreview.jsx"
export function BookList({ books }) {
  return (
    <section className="car-list">
      <ul className="fluid-grid">
        {books.map((book, idx) => (
          <li key={book.id}>
            <BookPreview book={book} idx={idx} />

            <div className="actions">
              <button className="details-btn">Details</button>
              <button className="remove-btn">x</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
