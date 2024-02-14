const myLibrary = [];
const booksDiv = document.querySelector('.books');

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
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(pagesDiv);
    bookDiv.appendChild(readButton);
    booksDiv.appendChild(bookDiv);
}

window.onload = () => {
    const book1 = new Book('Worm', 'Wildbow', 500, 500);
    const book2 = new Book('The Perfect Run', 'Void Herald', 1000, 1000);
    const book3 = new Book('Dungeon Crawler Carl', 'Matt Dinniman', 750, 350);
    myLibrary.push(book1, book2, book3);
    for (const book of myLibrary) {
        buildBook(book);
    }
}