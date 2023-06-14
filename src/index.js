import uniqid from "uniqid";
import "./styles.css";

//////////////////////// FIREBASE STUFF //////////////////////////////////
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvNdTxbOBMokb4IfsLmtnOxDF5re1xYps",
  authDomain: "odin-library-9287e.firebaseapp.com",
  projectId: "odin-library-9287e",
  storageBucket: "odin-library-9287e.appspot.com",
  messagingSenderId: "887607140477",
  appId: "1:887607140477:web:5ed8e814edd5e6a7fa5114",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const shelf = document.getElementById("shelf");
const addBtn = document.querySelector(".add-btn");
const form = document.getElementById("add-form");
const submit = document.getElementById("submit");
const page = document.querySelector("body");
const close = document.getElementById("close-form");

//let myLibrary = [];
let booksOnScreen = [];
let buttonIndex = 0;

async function addBookToLibrary(
  titleInput,
  authorInput,
  pagesInput,
  readInput
) {
  try {
    const docRef = await addDoc(collection(db, "books"), {
      title: titleInput,
      author: authorInput,
      pages: pagesInput,
      read: readInput,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  displayBooks();
}

async function displayBooks() {
  const myLibrary = await getDocs(collection(db, "books"));

  myLibrary.forEach((book) => {
    if (!booksOnScreen.includes(book.id)) {
      const bookNode = document.createElement("div");
      bookNode.classList.add("book-card");
      bookNode.setAttribute("id", book.id);

      const title = document.createElement("p");
      title.classList.add("book-title");
      const titleNode = document.createTextNode(
        '"' + `${book.data().title}` + '"'
      );
      title.appendChild(titleNode);
      bookNode.appendChild(title);

      const author = document.createElement("p");
      author.classList.add("book-author");
      author.textContent = book.data().author;
      bookNode.appendChild(author);

      const pages = document.createElement("p");
      pages.classList.add("book-pages");
      pages.textContent = `${book.data().pages} pages`;
      bookNode.appendChild(pages);

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("btn-container");
      bookNode.appendChild(btnContainer);

      const readBtn = document.createElement("button");
      readBtn.classList.add("read-btn");
      if (book.data().read) {
        readBtn.classList.add("book-read");
        readBtn.textContent = "Read";
      } else {
        readBtn.classList.add("book-not-read");
        readBtn.textContent = "Not read";
      }
      btnContainer.appendChild(readBtn);

      const removeBtn = document.createElement("button");
      removeBtn.classList.add("book-remove-btn");
      removeBtn.classList.add(book.id);
      removeBtn.textContent = "Remove";
      btnContainer.appendChild(removeBtn);

      shelf.appendChild(bookNode);
      booksOnScreen.push(book.id);
      buttonIndex++;
    }
  });
  switchRead();
  remove();
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
    removeBtn.addEventListener("click", async (e) => {
      console.log("remove() called");
      const bookId = e.target.classList[1];
      // remove book from library array
      await deleteDoc(doc(db, "books", bookId));

      // remove book from books on screen array
      const indexBookToRemove = booksOnScreen.indexOf(Number(bookId));
      booksOnScreen.splice(indexBookToRemove, 1);

      // remove book from DOM
      const bookToRemove = document.getElementById(bookId);
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
  addBookToLibrary(title, author, pages, read);
  switchRead();
  remove();
  form.reset();
});

switchRead();
remove();
displayBooks();
