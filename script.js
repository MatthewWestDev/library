const bookList = document.querySelector("#bookList");
const form = document.querySelector(".add-book");
const myLibrary = [];

class Book {

    constructor( title, author, numPages, isRead ) {
        this.title = title;
	    this.author = author;
	    this.numPages = Number(numPages);
	    this.isRead = isRead;
    };
}

/* function Book(title, author, numPages, isRead) {
	this.title = title;
	this.author = author;
	this.numPages = Number(numPages);
	this.isRead = isRead;
	}; */

const bookTitle = document.querySelector("#book_title");
const bookAuthor = document.querySelector("#book_author");
const bookPages = document.querySelector("#book_pages");
const bookRead = document.querySelector("#book_read");

function addBookToLibrary() {
  const book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
  myLibrary.push(book);
};

const addBookModal = document.querySelector("#addBookModal");
const addBookBtn = document.querySelector("#addBookBtn");
addBookBtn.addEventListener("click", () => {
    addBookModal.showModal();
});
const closeBookBtn = document.querySelector(".closeModal");
closeBookBtn.addEventListener("click", () => {
    addBookModal.close();
});

const addBookSubmit = document.querySelector("#addBookSubmit");
addBookSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary();
    addBookModal.close();
    form.reset();
    refreshBookList();
});

function refreshBookList() {
    let index = 0;
    bookList.replaceChildren();

    for (const bookItem of myLibrary) {
        // create all the books in a list
        const li = document.createElement("li");
        li.classList.add(index);
        
        const h3 = document.createElement("h3");
        const title = document.createTextNode(bookItem.title);
        
        const h4 = document.createElement("h4");
        const author = document.createTextNode("by: " + bookItem.author);
        
        const pPages = document.createElement("p");
        const pages = document.createTextNode(bookItem.numPages + " pages");
        
        const pRead = document.createElement("p");
        pRead.classList.add("p-read");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("is-read");
        checkbox.classList.add("toggle");
        checkbox.setAttribute("data-index", index);
        checkbox.checked = bookItem.isRead ? "checked" : "";
        const label = document.createElement("label");
        label.htmlFor = "is_read";
        label.classList.add("is-read");
        label.setAttribute("data-index", index);
        label.appendChild(document.createTextNode("Read"));
        
        const bookButton = document.createElement("button");
        const bookButtonText = document.createTextNode("X Delete");
        bookButton.setAttribute("data-index", index);
        bookButton.classList.add("delete-book");
        
        bookButton.appendChild(bookButtonText)
        pRead.appendChild(checkbox);
        pRead.appendChild(label);
        pPages.appendChild(pages);
        h4.appendChild(author);
        h3.appendChild(title);
        li.appendChild(h3);
        li.appendChild(h4);
        li.appendChild(pPages);
        li.appendChild(pRead);
        li.appendChild(bookButton);
        bookList.appendChild(li);

        index++;
    };
};

bookList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-book")) {
        deleteBook(e.target.dataset.index);
    } else if (e.target.classList.contains("is-read")) {
        myLibrary[e.target.dataset.index].toggleRead();
    };
});

function deleteBook (index) {
    myLibrary.splice(index, 1);
    refreshBookList();
};

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
    refreshBookList();
};