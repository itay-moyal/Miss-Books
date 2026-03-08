const { useState } = React

import { bookService } from "../services/book.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

import { DynamicCmp } from "./dynamic-cmps/DynamicCmp.jsx"

export function AddReview({ bookId, onReview }) {
  const [cmpType, setCmpType] = useState("RateBySelect")
  const [rating, setRating] = useState(3)

  function saveReview(ev) {
    ev.preventDefault()
    const { rate, name, date } = ev.target
    const review = {
      name: name.value,
      rate: rating,
      date: date.value,
      cmpType,
    }
    bookService.addReview(bookId, review).then(onReview)
    showSuccessMsg(`Review Successfully Added!`)
  }
  return (
    <form className="book-edit" onSubmit={saveReview}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" id="name" placeholder="full name" />

      <div className="rate">
        <p>Select Rating Style:</p>
        <label>
          <input
            type="radio"
            name="cmpType"
            value="RateBySelect"
            onChange={() => {
              setCmpType("RateBySelect")
            }}
          />
        </label>
        <label>
          <input
            type="radio"
            name="cmpType"
            value="RateByTextbox"
            onChange={() => {
              setCmpType("RateByTextbox")
            }}
          />
        </label>
        <label>
          <input
            type="radio"
            name="cmpType"
            value="RateByStars"
            onChange={() => {
              setCmpType("RateByStars")
            }}
          />
        </label>
      </div>
      <DynamicCmp cmpType={cmpType} val={rating} selected={setRating} />
      <label htmlFor="date">Date:</label>
      <input type="date" name="date" id="date" />
      <div className="actions">
        <button>Add Review</button>
      </div>
    </form>
  )
}
