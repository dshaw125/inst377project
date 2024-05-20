const host = window.location.origin;
document.addEventListener('DOMContentLoaded', () => {
    fetchFavoritedBooks();
});

async function fetchFavoritedBooks() {
    const container = document.getElementById('favoriteBooksContainer');
    uid = localStorage.getItem('user_id')
    await fetch(`${host}/userBooks?user_id=${uid}`)
        .then((res) =>res.json() )
        .then(res => {
            console.log(res)
            for (let i = 0; i < res.length; i++) {
                book = res[i];
                bookEntry = document.createElement('li')
                bookEntry.innerHTML = `${book.title} by ${book.author}`
                bookImg = document.createElement('img')
                bookImg.src = book.cover
                line_space = document.createElement('br')
                container.appendChild(bookEntry)
                bookEntry.appendChild(line_space)
                bookEntry.appendChild(bookImg)
            }
        });    
}

