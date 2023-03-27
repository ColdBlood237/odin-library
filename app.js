let myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    if (read) {
      return `${title} by ${author}, ${pages} pages, read`;
    } else {
      return `${title} by ${author}, ${pages} pages, not read yet`;
    }
  };
}

function addBookToLibrary(titleInput, authorInput, pagesInput, readInput) {
  // do stuff here
  const book = new Book(titleInput, authorInput, pagesInput, readInput);
  myLibrary.push(book);
}

function displayBooks() {
  for (book of myLibrary) {
    console.log(book.info());
  }
}
