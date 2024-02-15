const myLibrary = [];
const booksDiv = document.querySelector('.books');
const formContainer = document.querySelector('.form-container');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const totalPagesInput = document.querySelector('#total-pages');
const pagesReadInput = document.querySelector('#pages-read');
const addBookButton = document.querySelector('.submit');
const readCheckBox = document.querySelector('#book-read');

const inputEmptyWarning = document.createElement('div');
inputEmptyWarning.classList.add('warning');
inputEmptyWarning.textContent = 'Please enter all fields!';
const notNumberWarning = document.createElement('div');
notNumberWarning.classList.add('warning');
notNumberWarning.textContent = 'Please enter numbers in Total Pages and Pages Read';
let inputEmptyWarningDisplayed = false;
let notNumberWarningDisplayed = false;

function Book(title, author, totalPages, pagesRead) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.pagesRead = pagesRead;
}

function buildBook(book) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = book.title;
    const authorDiv = document.createElement('div');
    authorDiv.classList.add('author');
    authorDiv.textContent = `- ${book.author}`;
    const pagesDiv = document.createElement('div');
    pagesDiv.classList.add('pages');
    pagesDiv.textContent = `${book.pagesRead} / ${book.totalPages} pages read`
    const readButton = document.createElement('button');
    readButton.classList.add('read-button');
    readButton.textContent = 'Read';
    const deleteIcon = document.createElement('img');
    deleteIcon.src = './icons/close-circle.svg';
    deleteIcon.setAttribute('data-book-index', myLibrary.length)
    deleteIcon.classList.add('delete-icon');
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(pagesDiv);
    bookDiv.appendChild(readButton);
    booksDiv.appendChild(bookDiv);
    bookDiv.addEventListener('mouseenter', () => {
        bookDiv.appendChild(deleteIcon);
    });
    bookDiv.addEventListener('mouseleave', () => {
        bookDiv.removeChild(deleteIcon);
    });
    deleteIcon.addEventListener('click', () => {
        booksDiv.removeChild(bookDiv);
        myLibrary.splice(deleteIcon.getAttribute('data-book-index'), 1);
    });
}

window.onload = () => {
    const book1 = new Book('Worm', 'Wildbow', 500, 500);
    const book2 = new Book('The Perfect Run', 'Void Herald', 1000, 1000);
    const book3 = new Book('Dungeon Crawler Carl', 'Matt Dinniman', 750, 350);
    buildBook(book1);
    myLibrary.push(book1);
    buildBook(book2);
    myLibrary.push(book2);
    buildBook(book3);
    myLibrary.push(book3);
}

readCheckBox.addEventListener('change', (e) => {
    pagesReadInput.disabled = readCheckBox.checked;
})

function removeWarning(warning) {
    formContainer.removeChild(warning);
}

addBookButton.addEventListener('click', () => {
    if (readCheckBox.checked) {
        pagesReadInput.value = totalPagesInput.value;
    }
    if (!titleInput.value || !authorInput.value || !totalPagesInput.value || !pagesReadInput.value) {
        if (!inputEmptyWarningDisplayed) {
            formContainer.appendChild(inputEmptyWarning);
            inputEmptyWarningDisplayed = true;
            setTimeout(() => {
                removeWarning(inputEmptyWarning);
                inputEmptyWarningDisplayed = false;
            }, 5000);
        }
    } else if (isNaN(+totalPagesInput.value) || isNaN(+pagesReadInput.value)) {
        if (!notNumberWarningDisplayed) {
            formContainer.appendChild(notNumberWarning);
            notNumberWarningDisplayed = true;
            setTimeout(() => {
                removeWarning(notNumberWarning);
                notNumberWarning = false;
            }, 5000);
        }
    } else {
        const book = new Book(titleInput.value, authorInput.value, +totalPagesInput.value, +pagesReadInput.value);
        buildBook(book);
        myLibrary.push(book);
        titleInput.value = authorInput.value = totalPagesInput.value = pagesReadInput.value = '';
    }
});