export function BookDetails({ book, onClearSelectedBook }) {
  console.log('Is on sale?', book);
  const bookPrice = book.listPrice.amount
  const txtColor = bookPrice >= 150 ? "red" : bookPrice <= 20 ? "green" : ""
  function handlePageCount(pagecount) {
    if (pagecount > 500) return "Serious Reading"
    else if (pagecount > 200) return "Descent Reading"
    else if (pagecount < 100) return "Light Reading"
    return
  }

  function handleDate(date) {
    const currDate = new Date()
    const currYear = currDate.getFullYear()
    const yearsDiff = currYear - date

    if (yearsDiff >= 10) return "Vintage"
    else if (yearsDiff <= 1) return "New"
  }

  return (
    <article className="book-details">
      <h2 className="book-title">{book.title}</h2>
      <img className="book-img" src={book.thumbnail} alt={book.title} />
      <p className="book-desc">{book.description}</p>
      <p className="book-pagecount">{handlePageCount(book.pageCount)}</p>
      {book.listPrice.isOnSale && <p className="on-sale">On Sale!</p>}
      <p className="book-date">{handleDate(book.publishedDate)}</p>
      <p style={{ color: txtColor }} className="book-price">
        {bookPrice} {book.listPrice.currencyCode}
      </p>
      <button onClick={onClearSelectedBook}>Back</button>
    </article>
  )
}
