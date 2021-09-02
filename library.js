const serachBook = () => {
        const searchField = document.getElementById('search-field');
        const searchText = searchField.value;

        searchField.value = '';


        // load data 
        const url = `https://openlibrary.org/search.json?q=${searchText}`

        fetch(url)
                .then(res => res.json())
                .then(books => {
                        const number = document.getElementById('numbers');
                        number.textContent = '';
                        const p = document.createElement('p');
                        p.innerText = `Total Result:${books.docs.length}`;
                        console.log(books.docs.length);
                        number.appendChild(p);

                        // check condition and call function
                        if (books.docs.length >= 10) {
                                booksFound([books.docs[0], books.docs[1], books.docs[2], books.docs[3], books.docs[4], books.docs[5]]);
                        }
                        if (books.docs.length <= 10 && books.docs.length === 3) {
                                booksFound([books.docs[0], books.docs[1], books.docs[2]]);
                        }
                        if (books.docs.length <= 2 && books.docs.length === 1) {
                                booksFound([books.docs[0]])
                        }
                        if (books.docs.length === 0) {
                                const searchResult = document.getElementById('search-result');
                                searchResult.textContent = '';
                                const number = document.getElementById('numbers');
                                number.textContent = '';
                                const p = document.createElement('p');
                                p.innerText = 'No result Found';
                                number.appendChild(p);
                        }


                })




}

// function for adding result in website

const booksFound = books => {
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        const number = document.getElementById('numbers');

        const p1 = document.createElement('p');
        p1.innerText = '';
        p1.innerText = `Results Showing: ${books.length}`;
        number.appendChild(p1);
        books.forEach(book => {
                console.log(book);
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                <img class="w-50" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                 <div class="card-body">
                    <h5 class="card-title">Title:${book.title}</h5>
                    <p class="card-text">Author:${book.author_name}</p>
                    <p class="card-text">First Published:${book.first_publish_year}</p>
                    <p class="card-text">Publisher:${book.publisher.slice(0, 10)}</p>
                </div>
                </div>
                `
                searchResult.appendChild(div);
        })
}
