const myLibrary = [];

function Book(title, author, numPages, readYet) {
	this.title = title;
	this.author = author;
	this.numPages = numPages;
	this.readYet = readYet;
	this.info = function() {
		string = this.title + " by " + this.author + ", " + this.numPages + " pages, " + readYet;
		return string;
	};

function addBookToLibrary() {
  // do stuff here
};

function toggleRead() {
    // do stuff to switch between read and unread
};

function deleteBook() {
    // do stuff to delete the book
};