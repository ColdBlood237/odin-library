import "./styles.css";

const shelf = document.getElementById("shelf");
const addBtn = document.querySelector(".add-btn");
const form = document.getElementById("add-form");
const submit = document.getElementById("submit");
const page = document.querySelector("body");
const close = document.getElementById("close-form");

let myLibrary = [];
let booksOnScreen = [];
let formOpen = false;
let index = 0;
let buttonIndex = 0;

class Book {
  constructor(title, author, pages, read, data) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.data = data;
  }
}

function addBookToLibrary(titleInput, authorInput, pagesInput, readInput) {
  // do stuff here
  const book = new Book(titleInput, authorInput, pagesInput, readInput, index);
  myLibrary.push(book);
  index++;
  displayBooks();
}

function displayBooks() {
  myLibrary.forEach((book) => {
    if (!booksOnScreen.includes(book.data)) {
      const bookNode = document.createElement("div");
      bookNode.classList.add("book-card");
      bookNode.setAttribute("id", book.data);

      const title = document.createElement("p");
      title.classList.add("book-title");
      const titleNode = document.createTextNode(book.title);
      title.appendChild(titleNode);
      bookNode.appendChild(title);

      const author = document.createElement("p");
      author.classList.add("book-author");
      author.textContent = book.author;
      bookNode.appendChild(author);

      const pages = document.createElement("p");
      pages.classList.add("book-pages");
      pages.textContent = `${book.pages} pages`;
      bookNode.appendChild(pages);

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("btn-container");
      bookNode.appendChild(btnContainer);

      const readBtn = document.createElement("button");
      readBtn.classList.add("read-btn");
      if (book.read) {
        readBtn.classList.add("book-read");
        readBtn.textContent = "Read";
      } else {
        readBtn.classList.add("book-not-read");
        readBtn.textContent = "Not read";
      }
      btnContainer.appendChild(readBtn);

      const removeBtn = document.createElement("button");
      removeBtn.classList.add("book-remove-btn");
      removeBtn.classList.add(buttonIndex);
      removeBtn.textContent = "Remove";
      btnContainer.appendChild(removeBtn);

      shelf.appendChild(bookNode);
      booksOnScreen.push(book.data);
      buttonIndex++;
    }
  });
}

function switchRead() {
  const readBtns = document.querySelectorAll(".read-btn");
  readBtns.forEach((readBtn) =>
    readBtn.addEventListener("click", () => {
      if (readBtn.classList.contains("book-read")) {
        readBtn.classList.replace("book-read", "book-not-read");
        readBtn.textContent = "Not read";
      } else {
        readBtn.classList.replace("book-not-read", "book-read");
        readBtn.textContent = "Read";
      }
    })
  );
}

function remove() {
  const removeBtns = document.querySelectorAll(".book-remove-btn");
  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", (e) => {
      const buttonNumber = e.target.classList[1];
      // remove book from library array
      myLibrary = myLibrary.filter((book) => {
        return book.data != buttonNumber;
      });

      // remove book from books on screen array
      const indexBookToRemove = booksOnScreen.indexOf(Number(buttonNumber));
      booksOnScreen.splice(indexBookToRemove, 1);

      console.log(myLibrary, booksOnScreen);

      // remove book from DOM
      const bookToRemove = document.getElementById(buttonNumber);
      bookToRemove.remove();
    });
  });
}

addBtn.addEventListener("click", () => {
  form.style.display = "flex";
});

// close the form
document.addEventListener("click", (e) => {
  if (
    e.target !== addBtn &&
    (e.target === close || !e.target.closest("#add-form"))
  ) {
    form.style.display = "none";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  console.log(read);
  addBookToLibrary('"' + title + '"', author, pages, read);
  switchRead();
  remove();
  form.reset();
  console.log(myLibrary);
});

// test books
addBookToLibrary('"TestBook"', "Ryan", 26, true);
addBookToLibrary('"Berserk"', "Kentaro Miura", 456, true);
addBookToLibrary('"Solo levelling"', "Chugong", 320, true);

switchRead();
remove();
