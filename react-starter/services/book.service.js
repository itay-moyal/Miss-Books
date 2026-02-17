import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"
import { booksData } from "../books.js"

const BOOK_KEY = "bookDB"
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
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
    description: "",
    thumbnail: "",
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
