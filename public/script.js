const API_URL = "https://book-exchange-hhx0.onrender.com";
const addBookForm = document.getElementById("addBookForm");

const title = document.getElementById("title");
const author = document.getElementById("author");
const quantity = document.getElementById("quantity");

const booksList = document.getElementById("booksList");

const bookSelect = document.getElementById("bookSelect");

const issueBookForm = document.getElementById("issueBookForm");

const personName = document.getElementById("personName");

const addMessage = document.getElementById("addMessage");
const issueMessage = document.getElementById("issueMessage");

const searchBook = document.getElementById("searchBook");

const issuedBooksList = document.getElementById("issuedBooksList");


let books = [];

let issuedBooks = [];

async function getBooks() {

    const response = await fetch(`${API_URL}/api/books`);

    books = await response.json();

    displayBooks();

    showBooksInSelect();

}

function displayBooks() {

    booksList.innerHTML = "";

    let searchText = searchBook.value.toLowerCase();

    let availableBooks = books.filter(function(book) {

        return book.quantity > 0 &&
               book.title.toLowerCase().includes(searchText);

    });


    availableBooks.forEach(function(book) {

        booksList.innerHTML += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.quantity}</td>
                <td>
                    <span class="status">
                        Available
                    </span>
                </td>
            </tr>
        `;

    });

}
function showBooksInSelect() {

    bookSelect.innerHTML = `
        <option value="">
            Select Book
        </option>
    `;


    books.forEach(function(book) {

        if (book.quantity > 0) {

            bookSelect.innerHTML += `
                <option value="${book._id}">
                    ${book.title}
                </option>
            `;

        }

    });

}
addBookForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    let bookTitle = title.value;

    let bookAuthor = author.value;

    let bookQuantity = Number(quantity.value);


    const response = await fetch(`${API_URL}/api/books`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: bookTitle,
            author: bookAuthor,
            quantity: bookQuantity
        })

    });


    const data = await response.json();


    if (response.ok) {

        addMessage.textContent = "Book added successfully";

        addBookForm.reset();

        getBooks();

    } else {

        addMessage.textContent = data.message;

    }

});
issueBookForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    let name = personName.value;

    let bookId = bookSelect.value;


    if (bookId === "") {

        issueMessage.textContent = "Please select a book";

        return;

    }
    const response = await fetch(
        `${API_URL}/api/books/${bookId}/issue`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                personName: name
            })
        }
    );

    const data = await response.json();


    if (response.ok) {

        issueMessage.textContent =
            "Book issued successfully";

        let selectedBook =
            books.find(function(book) {

                return book._id === bookId;

            });

        if (selectedBook) {

            issuedBooks.push({

                personName: name,

                title: selectedBook.title,

                date: new Date().toLocaleDateString()

            });

        }


        issueBookForm.reset();

        displayIssuedBooks();

        getBooks();

    } else {

        issueMessage.textContent =
            data.message;

    }

});


function displayIssuedBooks() {

    issuedBooksList.innerHTML = "";


    issuedBooks.forEach(function(book) {

        issuedBooksList.innerHTML += `
            <tr>
                <td>${book.personName}</td>
                <td>${book.title}</td>
                <td>${book.date}</td>
            </tr>
        `;

    });

}

searchBook.addEventListener("input", function() {

    displayBooks();

});


getBooks();