const { useEffect, useState } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

export function BookEdit() {
  const [book, setBook] = useState(bookService.getEmptyBook())

  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (params.id) {
      bookService.get(params.id).then(setBook)
    }
  }, [])

  function handleChange({ target }) {
    const { type, name, value } = target
    const itemValue = type === "text" ? value : +value

    if (name === "amount") {
      setBook((prev) => ({
        ...prev,
        listPrice: { ...prev.listPrice, amount: itemValue },
      }))
    } else {
      setBook((prev) => ({
        ...prev,
        [name]: itemValue,
      }))
    }
  }

  function onSaveBook(ev) {
    ev.preventDefault()

    bookService.save(book).then((book) => {
      showSuccessMsg(`Book ${book.title} Saved!`)

      navigate("/book")
    })
  }
  //   if (!book) return <div>Loading...</div>
  return (
    <form className="book-edit" onSubmit={onSaveBook}>
      <label htmlFor="title">Name:</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Enter Book Name"
        value={book.title || ""}
        onChange={handleChange}
      />
      <label htmlFor="amount">Price:</label>
      <input
        type="number"
        name="amount"
        id="amount"
        placeholder="Enter a Price"
        value={book.listPrice.amount || ""}
        onChange={handleChange}
      />
      <div className="actions">
        <button>Save</button>
        <Link to="/book">
          <button type="button">Cancel</button>
        </Link>
      </div>
    </form>
  )
}
