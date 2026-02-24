import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"
import { booksData } from "../books.js"

const BOOK_KEY = "bookDB"
const REVIEW_KEY = "reviewDB"
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
  addReview,
  removeReview,
}
// For Debug (easy access from console):
// window.cs = bookService

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i")
      books = books.filter((book) => regExp.test(book.title))
    }

    if (filterBy.minPrice) {
      books = books.filter((book) => book.listPrice.amount >= filterBy.minPrice)
    }

    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId).then((book) => {
    book = _setNextPrevBookId(book)
    return book
  })
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getEmptyBook(title = "", amount = "") {
  return {
    title,
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. I`,
    thumbnail: "./BooksImages/1.jpg",
    listPrice: {
      amount,
      currencyCode: "EUR",
      isOnSale: false,
    },
  }
}

function getDefaultFilter(filterBy = { txt: "", minPrice: 0 }) {
  return { txt: filterBy.txt, minPrice: filterBy.minPrice }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = booksData
    utilService.saveToStorage(BOOK_KEY, books)
  }
}

function _createBook(title, amount = 250) {
  const book = getEmptyBook(title, amount)
  book.id = utilService.makeId()
  return book
}

function _setNextPrevBookId(book) {
  return storageService.query(BOOK_KEY).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevBook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1]
    book.nextBookId = nextBook.id
    book.prevBookId = prevBook.id
    return book
  })
}

function addReview(bookId, review) {
  return get(bookId).then((book) => {
    review.id = utilService.makeId()
    if (!book.reviews) book.reviews = []
    book.reviews.push(review)
    return save(book)
  })
}

function removeReview(bookId, reviewId) {
  return get(bookId).then((book) => {
    book.reviews = book.reviews.filter((review) => review.id !== reviewId)
    return save(book)
  })
}
