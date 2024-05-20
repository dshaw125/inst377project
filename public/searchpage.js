function bookInfo(title,author, cover){
    localStorage.setItem('cover', cover)
    localStorage.setItem('title',title)
    localStorage.setItem('author',author)
    window.location = 'book.html'
}

async function loadResults(query){
    var raw = await fetch(`https://openlibrary.org/search.json?q=${query}`).
    then((res) => res.json());
    var results = raw.docs;
    var myTable = document.getElementById('resTable');
    for (i=0; i<10; i++) {
        var current = results[i];
        var cover = `https://covers.openlibrary.org/b/id/${current.cover_i}-M.jpg`;
        console.log(cover);
        var author = current.author_name;
        var title = current.title;
        var linkButton =  document.createElement('button');
        var newRow = document.createElement('tr');
        var coverData = document.createElement('td');
        var authorData = document.createElement('td');
        var titleData = document.createElement('td');
        var linkData = document.createElement('td');
        coverData.innerHTML = `<img src=${cover} width=50 height=70>`;
        authorData.innerHTML = author;
        titleData.innerHTML = title;
        linkButton.onclick = function() {
            /*console.log($(this).parent());*/
            var myAuthor = $(this).parent().prev()[0];
            var myTitle = $(myAuthor).prev()[0];
            var myCover = $(myTitle).prev().children()[0];
            console.log(myCover);
            /*console.log($(this).parent().prev()[0]);*/
            bookInfo(myTitle.innerHTML, myAuthor.innerHTML, myCover.src);
        };
        linkButton.innerHTML = 'Details';
        linkData.appendChild(linkButton);
        newRow.appendChild(coverData);
        newRow.appendChild(titleData);
        newRow.appendChild(authorData);
        newRow.appendChild(linkData)
        myTable.appendChild(newRow);
    }
}
async function loadPage() {

    var query = localStorage.getItem('query')
    var fixedQuery = query.replace(/ /g, "+");
    loadResults(fixedQuery)   
    };

function loadSearch(){
    query = document.getElementById('usersearch').value
    var fixedQuery = query.replace(/ /g, "+");
    loadResults(fixedQuery)
}
window.onload = loadPage()