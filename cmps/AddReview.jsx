import { bookService } from "../services/book.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

export function AddReview({ bookId, onReview }) {
  function saveReview(ev) {
    ev.preventDefault()
    const { rate, name, date } = ev.target
    const review = {
      name: name.value,
      rate: rate.value,
      date: date.value,
    }
    bookService.addReview(bookId, review).then(onReview)
    showSuccessMsg(`Review Successfully Added!`)
  }
  return (
    <form className="book-edit" onSubmit={saveReview}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" id="name" placeholder="full name" />
      <label htmlFor="rate">Rating:</label>
      <select name="rate" id="rate">
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <label htmlFor="date">Date:</label>
      <input type="date" name="date" id="date" />
      <div className="actions">
        <button>Add Review</button>
      </div>
    </form>
  )
}
