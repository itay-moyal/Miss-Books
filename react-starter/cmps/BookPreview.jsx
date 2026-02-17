export function BookPreview({ book, idx }) {
  return (
    <article>
      <h2>{book.title}</h2>
      <img src={`./BooksImages/${idx + 1}.jpg`} alt="" />
      <p>
        {book.listPrice.amount} {book.listPrice.currencyCode}
      </p>
    </article>
  )
}
