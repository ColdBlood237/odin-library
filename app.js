const shelf = document.getElementById("shelf");
const addBtn = document.querySelector(".add-btn");
const form = document.getElementById("add-form");
const submit = document.getElementById("submit");
const page = document.querySelector("body");
const close = document.getElementById("close-form");

let myLibrary = [];
let formOpen = false;

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(titleInput, authorInput, pagesInput, readInput) {
  // do stuff here
  const book = new Book(titleInput, authorInput, pagesInput, readInput);
  myLibrary.push(book);
}

function displayBooks() {
  myLibrary.forEach((book) => {
    const bookNode = document.createElement("div");
    bookNode.classList.add("book-card");

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
    removeBtn.textContent = "Remove";
    btnContainer.appendChild(removeBtn);

    console.log(bookNode);
    shelf.appendChild(bookNode);
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

addBtn.addEventListener("click", () => {
  form.style.display = "flex";
});

// close the form
document.addEventListener("click", (e) => {
  if (
    e.target !== addBtn &&
    (e.target === close ||
      e.target === submit ||
      !e.target.closest("#add-form"))
  ) {
    form.style.display = "none";
    e.preventDefault();
  }
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
});

// test books
const testBook = new Book('"TestBook"', "Ryan", 26, true);
myLibrary.push(testBook);

const berserk = new Book('"Berserk"', "Kentaro Miura", 456, true);
myLibrary.push(berserk);

const solo = new Book('"Solo levelling"', "Chugong", 320, true);
myLibrary.push(solo);

console.log(myLibrary);

displayBooks();
switchRead();
