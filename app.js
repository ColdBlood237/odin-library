const shelf = document.getElementById("shelf");

let myLibrary = [];

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

    const readBtn = document.createElement("button");
    if (book.read) {
      readBtn.classList.add("book-read");
      readBtn.textContent = "Read";
    } else {
      readBtn.classList.add("book-not-read");
      readBtn.textContent = "Not read";
    }
    bookNode.appendChild(readBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("book-remove-btn");
    removeBtn.textContent = "Remove";
    bookNode.appendChild(removeBtn);

    console.log(bookNode);
    shelf.appendChild(bookNode);
  });
}

const testBook = new Book("TestBook", "Ryan", 26, true);
myLibrary.push(testBook);

displayBooks();
