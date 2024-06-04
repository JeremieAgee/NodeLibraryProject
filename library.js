"use strict";
//Import the read line module to handle user input.
const readLine = require("readline");
// Book class with a constructor.
class Book {
	constructor(title, author, isbn, availableCopies) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
		this.availableCopies = availableCopies;
		//Function to reduce available copies when checked out.
		this.borrowBook = function () {
			if (this.availableCopies > 0) {
				this.availableCopies -= 1;
			} else if (this.availableCopies == 0) {
				console.log(`No available copies of ${this.title}`);
			}
		};
		//Function to increase the available copies when a book is returned.
		this.returnBook = function () {
			this.availableCopies += 1;
		};
	}
}
//Library class with constructor function
class Library {
	constructor(name, books) {
		//String name
		this.name = name;
		//Array of book objects
		this.books = books;
		// Function to add a book to the Library
		this.addBook = function (newBook) {
			const oldBook = this.books.find(
				(book) =>
					book.isbn.toLowerCase() == newBook.isbn.toLowerCase() &&
					book.title.toLowerCase() == newBook.title.toLowerCase()
			);
			if (oldBook != undefined) {
				oldBook.availableCopies += newBook.availableCopies;
			} else {
				this.books.push(newBook);
			}
		};
		//Function to remove a book from the library using the isbn.
		this.removeBook = function (isbn) {
			const book = this.books.find(
				(book) => book.isbn.toLowerCase() == isbn.toLowerCase()
			);
			this.books.splice(book, 1);
		};
		//Function to find a book by the title of the book.
		this.findBookByTitle = function (searchedTitle) {
			const matchedBook = this.books.find(
				(book) => book.title.toLowerCase() == searchedTitle.toLowerCase()
			);
			//If the book is found return the book
			if (matchedBook != undefined) {
				return matchedBook;
			} else {
				//Log if no book is found
				console.log(`No book found with a title of ${searchedTitle}`);
			}
		};
		//Function to display the details of all books in the Library.
		this.listAllBooks = function () {
			this.books.forEach((book) => {
				console.log(`Title: ${book.title}
Author: ${book.author}
isbn: ${book.isbn}
Available Copies: ${book.availableCopies}
`);
			});
		};
	}
}
//Const Array of random books
const libraryBooks = [
	new Book("To Kill a Mockingbird", "Harper Lee", "InStoreNumber1", 2),
	new Book(
		"The Adventures of Huckleberry Finn",
		"Marl Twain",
		"InStoreNumber2",
		1
	),
	new Book("The Catcher in the Rye", "J.D. Salinger", "InStoreNumber3", 3),
	new Book("Hamlet", "William Shakespeare", "InStoreNumber4", 4),
];
//New library object made with a name and books array passed in
const jeremieLibrary = new Library("Jeremie's Library", libraryBooks);
jeremieLibrary.findBookByTitle("To Kill a Mockingbird");
jeremieLibrary.listAllBooks();
jeremieLibrary.books[1].borrowBook();
jeremieLibrary.listAllBooks();
