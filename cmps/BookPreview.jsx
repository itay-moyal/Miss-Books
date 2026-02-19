export function BookPreview({ book }) {
  return (
    <article>
      <h2>{book.title}</h2>
      <p>
        {book.listPrice.amount} {book.listPrice.currencyCode}
      </p>
      <img src={book.thumbnail} alt={book.title} />
    </article>
  )
}
