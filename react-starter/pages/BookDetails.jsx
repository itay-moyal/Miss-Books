const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM
import { AddReview } from "../cmps/AddReview.jsx"
import { bookService } from "../services/book.service.js"
import { ReviewList } from "../cmps/ReviewList.jsx"
import { showSuccessMsg } from "../services/event-bus.service.js"

export function BookDetails() {
  const [book, setBook] = useState(null)
  const params = useParams()

  useEffect(() => {
    bookService.get(params.id).then(setBook)
  }, [params.id])

  if (!book)
    return (
      <div className="loader">
        <img style={{ color: "blue" }} src="./BooksImages/loader.svg" alt="" />
      </div>
    )
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

  function onReview() {
    bookService.get(params.id).then(setBook)
  }

  function onRemoveReview(reviewId) {
    bookService.removeReview(book.id, reviewId).then(setBook)
    showSuccessMsg(`Review Successfully Removed!`)
  }
  return (
    <React.Fragment>
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

        <nav>
          <Link to={`/book/${book.prevBookId}`}>
            <button>Prev</button>
          </Link>
          <Link to="/book">
            <button>Back</button>
          </Link>
          <Link to={`/book/${book.nextBookId}`}>
            <button>Next</button>
          </Link>
        </nav>
      </article>
      <div className="book-reviews">
        {book.reviews && (
          <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />
        )}
      </div>
      <div className="book-review-editor">
        <AddReview bookId={book.id} onReview={onReview} />
      </div>
    </React.Fragment>
  )
}
