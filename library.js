'use strict';
//Import the read line module to handle user input.
const readLine = require('readline');
// Book class with a constructor.
class Book{
    constructor(title, author, isbn, availableCopies){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.availableCopies = availableCopies;
        //Function to reduce available copies when checked out.
        this.borrowBook = function (){
            if (this.availableCopies > 0){
                this.availableCopies -= 1;
            } else if(this.availableCopies==0){
                console.log(`No available copies of ${this.title}`);
            }
        }
        //Function to increase the available copies when a book is returned.
        this.returnBook = function(){
            this.availableCopies +=1;
        }
    }
};
//Library class with constructor function
class Library{
    constructor(name, books){
        //String name
        this.name = name;
        //Array of book objects
        this.books = books;
        // Function to add a book to the Library
        this.addBook = function (book){
            let addBookTracker = 0;
            //Iterate thru the books array
            this.books.forEach((libraryBook)=>{
                if(libraryBook.title==book.title){
                    //Increase the available copies if the book is already in the books array
                    libraryBook.availableCopies += book.availableCopies;
                    console.log(`Book already exist available copies has been updated`);
                    return;
                };
                if(addBookTracker==this.books.length-1){
                    //Add book to the books array if the book doesn't already exist
                    this.books.push(book);
                    console.log(`Book added`);
                };
                addBookTracker++;
            });
        };
        //Function to remove a book from the library using the isbn.
        this.removeBook = function (isbn){
            let removeBookTracker = 0;
            //Iterate thru the books array
            this.books.forEach((book)=>{
                if(book.isbn == isbn){
                    //Remove a book if a book with the target isbn is found.
                    this.books.splice(removeBookTracker, 1);
                    console.log(`The book with ${book.title} title was removed`)
                }
                removeBookTracker++;
                if (removeBookTracker==this.books.length){
                    console.log(`No book found with isbn of ${isbn}`)
                }
            });
        };
        //Function to find a book by the title of the book.
        this.findBookByTitle = function(searchedTitle){
            let matchedBook;
            this.books.forEach((book)=>{
                //Make both values lower case so its not case sensitive when searching
                if(book.title.toLocaleLowerCase() === searchedTitle.toLocaleLowerCase()){
                    matchedBook = book; 
                    console.log(`Book with a title of "${book.title}" was found.`);
                }
            });
            if(matchedBook!=undefined){
            return matchedBook;
            } else {
                //Log if no book is found
                console.log(`No book found with a title of ${searchedTitle}`)
            }
        };
        //Function to display the details of all books in the Library.
        this.listAllBooks = function(){
            this.books.forEach((book)=>{
                console.log(`Title: ${book.title}
Author: ${book.author}
isbn: ${book.isbn}
Available Copies: ${book.availableCopies}
`);
            });
        }
    }
}
//Const Array of random books
const libraryBooks = [
    new Book("To Kill a Mockingbird", "Harper Lee", "InStoreNumber1", 2),
    new Book("The Adventures of Huckleberry Finn", "Marl Twain", "InStoreNumber2", 1),
    new Book("The Catcher in the Rye", "J.D. Salinger", "InStoreNumber3", 3),
    new Book("Hamlet", "William Shakespeare", "InStoreNumber4", 4),
]
//New library object made with a name and books array passed in
const jeremieLibrary = new Library("Jeremie's Library", libraryBooks);

//Prompt user input
console.log(`What would you like to Do please enter a number? Search by title = 1, Add book to library = 2, Remove a Book using isbn = 3 `);
//Create interface to handle user input
var readInitial = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
})
// Tracker for handling input
let tracker;
// Items to create a new book 
let newTitle, newAuthor, newIsbn, newAvailable;
readInitial.on('line', function(line){
    // cascade of if else statements to handle as user inputs data
   if (line=="1" && tracker==undefined){
    console.log(`Please enter a title to search for`);
    tracker = line;
   } else if (line=="2"&& tracker==undefined){
    console.log(`Please enter the title to the book you wish to add`);
    tracker = line;
   } else if (line=="3" && tracker==undefined){
    console.log(`Please enter the isbn to the book you wish to remove`);
    tracker = line;
   } else if (tracker=="1"){
        let searchedBook = jeremieLibrary.findBookByTitle(line);
        if (searchedBook!=undefined){
            console.log(searchedBook);
        }
        readInitial.close();
   } else if (tracker=="2"&&newTitle==undefined){
        newTitle=line;
        console.log(`Please enter the Author`);
   } else if (tracker=="2"&&newAuthor==undefined){
        newAuthor= line;
        console.log(`Please enter the isbn`);
   } else if (tracker=="2"&& newIsbn ==undefined){
        newIsbn = line;
        console.log(`Please enter the number of copies`);
   } else if(tracker=="2"&& newAvailable==undefined){
        newAvailable = line;
        jeremieLibrary.addBook(new Book(newTitle, newAuthor, newIsbn, newAvailable));
        jeremieLibrary.listAllBooks();
        readInitial.close();
   } else if(tracker=="3"){
        let targetIsbn = line;
        jeremieLibrary.removeBook(targetIsbn);
        readInitial.close();
   } else if(tracker==undefined){
        console.log(`Not a valid option Please choose between 1, 2, or 3.`);
   }
})