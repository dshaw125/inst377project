const host = window.location.origin;
function getToday() {
    const date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    properDate = yyyy + '-' + mm + '-' + dd;
    return properDate;
}

function loadBook(title, author, cover){
    localStorage.setItem('title',title)
    localStorage.setItem('author',author)
    localStorage.setItem('cover', cover)
    window.location = 'book.html'
}

async function popBesties() {
    const slideList = document.getElementById('besties');
    var today = getToday();
    var myBooks = fetch(`https://api.nytimes.com/svc/books/v3/lists/${today}/combined-print-and-e-book-fiction.json?api-key=48tFA6TjZPbiddgyFZgHlijxAT88SpEz`)
    .then((res) => res.json());
    myBooks = await myBooks;
    function correctArgMaker(title, author, cover) {
        return () => loadBook(title, author, cover);
    }
    for (let i = 0; i < 10; i++) {
        var currentBook = myBooks.results.books[i];
        var myImg = document.createElement('img');
        myImg.onclick = correctArgMaker(currentBook.title, currentBook.author, currentBook.book_image);
        myImg.src = currentBook.book_image;
        myImg.alt = 'oops';
        myImg.height = 500;
        myImg.width = 300;
        var newEntry = document.createElement('li');
        newEntry.className = 'glide__slide';
        newEntry.appendChild(myImg);
        slideList.appendChild(newEntry);
    }
    new Glide('.glide', {perView: 3, focusAt: 'center'}).mount()
}


function searchBook(){
    query = document.getElementById('usersearch').value
    localStorage.setItem('query', query)
    window.location = 'searchpage.html'
}