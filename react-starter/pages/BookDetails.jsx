export function BookDetails({ book, onClearSelectedBook }) {
  return (
    <article className="book-details">
      <h2 className="book-title">{book.title}</h2>
      <img className="book-img" src={book.thumbnail} alt={book.title} />
      <p className="book-desc">{book.description}</p>
      <p className="book-price">
        {book.listPrice.amount} {book.listPrice.currencyCode}
      </p>
      <button onClick={onClearSelectedBook}>Back</button>
    </article>
  )
}
