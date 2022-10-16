var book1 = {
    titleEl: document.querySelector("#book-title-1"),
    authorEl: document.querySelector("#book-author-1"),
    summaryEl: document.querySelector("#book-desc-1"),
    imgEl: document.querySelector("#book-cover-1"),
    saveBtnEl: document.querySelector("#book-save-1"),
    moreBtnEl: document.querySelector("#book-see-more-1"),
    infoUrl: undefined
};

var book2 = {
    titleEl: document.querySelector("#book-title-2"),
    authorEl: document.querySelector("#book-author-2"),
    summaryEl: document.querySelector("#book-desc-2"),
    imgEl: document.querySelector("#book-cover-2"),
    saveBtnEl: document.querySelector("#book-save-2"),
    moreBtnEl: document.querySelector("#book-see-more-2"),
    infoUrl: undefined
};

var book3 = {
    titleEl: document.querySelector("#book-title-3"),
    authorEl: document.querySelector("#book-author-3"),
    summaryEl: document.querySelector("#book-desc-3"),
    imgEl: document.querySelector("#book-cover-3"),
    saveBtnEl: document.querySelector("#book-save-3"),
    moreBtnEl: document.querySelector("#book-see-more-3"),
    infoUrl: undefined
};

var book4 = {
    titleEl: document.querySelector("#book-title-4"),
    authorEl: document.querySelector("#book-author-4"),
    summaryEl: document.querySelector("#book-desc-4"),
    imgEl: document.querySelector("#book-cover-4"),
    saveBtnEl: document.querySelector("#book-save-4"),
    moreBtnEl: document.querySelector("#book-see-more-4"),
    infoUrl: undefined
};

var book5 = {
    titleEl: document.querySelector("#book-title-5"),
    authorEl: document.querySelector("#book-author-5"),
    summaryEl: document.querySelector("#book-desc-5"),
    imgEl: document.querySelector("#book-cover-5"),
    saveBtnEl: document.querySelector("#book-save-5"),
    moreBtnEl: document.querySelector("#book-see-more-5"),
    infoUrl: undefined
};

var bookContainerEls = [book1, book2, book3, book4, book5];

/* to store the books the user saves */
var savedBooks = [];

/* Saved books gallery */
var ggBoxEl = document.querySelector(".gg-box");
gridGallery({
    // gallery selector
    selector: "#savedBooksHistory",
    // enable dark mode
    darkMode: true,
    // or "horizontal"
    layout: "square",
    // space between images
    gapLength: 4,
    // row height
    rowHeight: 320,
    // column width
    columnWidth: 200
    
});

function showBooks() {
    /* get the best sellers and display them */
    getBestSellers();

    /* set up event listeners for the Save and More buttons */
    for (var i = 0; i < 5; i++) {
        bookContainerEls[i].saveBtnEl.addEventListener('click', handleSaveBtns);
        bookContainerEls[i].moreBtnEl.addEventListener('click', handleMoreBtns);
    }

    /* get the saved books from the history and display them */
    getSavedBooksHistory();
}

function getBestSellers() {

    /* query by author name */
    //var requestUrl = "https://api.nytimes.com/svc/books/v3/reviews.json?author=barack+obama&api-key=mbr0cIYuEknkV8twRd7HKM3gDlmmsYSA";

    /* query best sellers */
    //var requestUrl = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?age_group=8&api-key=mbr0cIYuEknkV8twRd7HKM3gDlmmsYSA";

    /* for best seller lists request with published_date - this works better */
    var requestUrl = "https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=2022-10-01&api-key=mbr0cIYuEknkV8twRd7HKM3gDlmmsYSA";

    fetch(requestUrl)
        .then(function (response) {
            if(response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayBestSellers(data);
                });
            } else {
                console.log("HTTP error: " + response.status);
            } 
        }) 
        .catch(function(){
            alert(response.status);
        });

}

function displayBestSellers(data) {
    var numListsLength = data.results.lists.length;
    var listChoice;
    var bookList;
    var bookChoice;

    /* get 5 books from various lists */
    for (var i = 0; i < 5; i++) {

        /* we don't want to display the same book - pick 5 unique books */
        var isDuplicate;

        do {
            isDuplicate = false;
            // randomize from among the lists returned
            listChoice = Math.floor(Math.random() * numListsLength);
            bookList = data.results.lists[listChoice].books;
            bookChoice = Math.floor(Math.random() * bookList.length);

            for (var j = 0; j < i; j++) {
                if (bookContainerEls[j].titleEl.textContent === bookList[bookChoice].title) {
                    console.log("Duplicate!!!");
                    console.log(bookContainerEls[j].titleEl.textContent + " : " + bookList[bookChoice].title);
                    isDuplicate = true;
                }
            }
        } while (isDuplicate);

        bookContainerEls[i].imgEl.src = bookList[bookChoice].book_image;

        bookContainerEls[i].titleEl.textContent = bookList[bookChoice].title;

        bookContainerEls[i].authorEl.textContent = bookList[bookChoice].author;

        bookContainerEls[i].summaryEl.textContent = bookList[bookChoice].description;

        bookContainerEls[i].infoUrl = bookList[bookChoice].amazon_product_url;

    }

}

function getSavedBooksHistory() {
    /* Using store.js library to store and retrieve from local storage */
    savedBooks = store.get('books');
    if (!savedBooks) {
        console.log("No saved books, nothing to show");
        savedBooks = []; 
    } else {
        showSavedBooksHistory();
    }
}

function showSavedBooksHistory() {
    /* display in a grid gallery */
    if(savedBooks) {
        $("#savedBooks").append("<ul>" + "</ul>");
        for (var i = 0; i < savedBooks.length; i++) {
            createGalleryItem(savedBooks[i].img, savedBooks[i].infoUrl);
        }
    }
}

function createGalleryItem(bookCover, url) {
    var imgEl = document.createElement('img');
    imgEl.src = bookCover;
    imgEl.setAttribute("style", "width: 250px; padding: 2px;");
    imgEl.addEventListener('click', function() { window.open(url, '_blank')});
    ggBoxEl.append(imgEl);
    console.log(ggBoxEl);
}

function handleSaveBtns(event) {
    console.log("handleSaveBtns: " + event.target);
    for (var i = 0; i < 5; i++) {
        if (bookContainerEls[i].saveBtnEl == event.target) {
            console.log(bookContainerEls[i].titleEl.textContent);
            if (bookContainerEls[i].titleEl.textContent == "") {
                /* nothing to save */
                return;
            }

            /* check for duplicates here before pushing */
            if (savedBooks) {
                console.log("number of saved books: " + savedBooks.length)
                console.log("checking for duplicates");
                var isDuplicate = false;
                for (var j = 0; j < savedBooks.length; j++) {
                    if (savedBooks[j].title === bookContainerEls[i].titleEl.textContent) {
                        console.log("found duplicated");
                        isDuplicate = true;
                    }
                }
                if (!isDuplicate) {
                    console.log("not a duplicate");
                }
            } else {
                /* create an empty array and a list (below the genre search) to display the saved books */
                savedBooks = [];
                $("#savedBooks").append("<ul>" + "</ul>"); 
            }

            /* Add the book to the savedBooks[] if it is empty or if it is not already in the array (duplicate).
                Set to local storage, show in list below genre search. */
            if((savedBooks.length == 0) || (!isDuplicate)) {
                savedBooks.push({ title: bookContainerEls[i].titleEl.textContent, 
                    author: bookContainerEls[i].authorEl.textContent, 
                    img: bookContainerEls[i].imgEl.src,
                    infoUrl: bookContainerEls[i].infoUrl });
                store.set('books', savedBooks);
                console.log(store.get('books'));
                $("#savedBooks").append("<li>" + bookContainerEls[i].titleEl.textContent + " - " + bookContainerEls[i].authorEl.textContent +  "</li>");
                createGalleryItem(bookContainerEls[i].imgEl.src, bookContainerEls[i].infoUrl);
            }
        }
    }
}
function handleMoreBtns(event) {
    console.log("handleMoreBtns: " + event.target);

    for (var i = 0; i < 5; i++) {
        if (bookContainerEls[i].moreBtnEl == event.target) {
            /* open in a new tab */
            window.open(bookContainerEls[i].infoUrl, '_blank');
        }
    }
}

$('document').ready(showBooks);

var genreSearchEntry = $("#genreSearch");
var genreCurrent = $("#current-genre");
var modalPopup = $("#my-modal-3");
var modalPopupBtn = $("#btnModel");
modalPopupBtn.hide();


$('#submit').on('click', function (event) {
    event.preventDefault();

    if(genreSearchEntry.val() === null) {
        modalPopup = modalPopupBtn.click() ; 
        // alert('Please select genre');
    }else{
        randomPicks();
    }

    
});

function randomPicks() {

    var genreEntry = genreSearchEntry.val();
    var requestUrlBook = 'https://www.googleapis.com/books/v1/volumes?q=subject:' + genreEntry + '&orderBy=newest&printType=books&maxResults=40&key=AIzaSyAAo4826hqGYvowcixZb8ZXQ3hpqBGqD2Q';

    fetch(requestUrlBook)
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
            }
            return response.json();


        }).then(function (dataB) {
            console.log(dataB);
            displayRandomPicks(dataB);

        });

}

function displayRandomPicks(dataB) {

    var yourBooks = [];
    var newBook;

    genreCurrent.html(genreSearchEntry.val());

    
    for (var i = 0; i < 5; i++) {
        newBook = dataB.items[Math.floor(Math.random() * dataB.items.length)];

        if (yourBooks.includes(newBook)) {
            i = i - 1;
        } else {
            yourBooks[i] = newBook;
        }


        console.log(bookContainerEls[i].imgEl);
        bookContainerEls[i].imgEl.src = yourBooks[i].volumeInfo.imageLinks.thumbnail;

        console.log(bookContainerEls[i].titleEl);
        bookContainerEls[i].titleEl.textContent = yourBooks[i].volumeInfo.title;

        console.log(bookContainerEls[i].authorEl);
        bookContainerEls[i].authorEl.textContent = yourBooks[i].volumeInfo.authors[0];
        //   console.log(bookContainerEls[i].authorEl.textContent = yourBooks[i].volumeInfo.authors);

        console.log(bookContainerEls[i].summaryEl);
        if (yourBooks[i].volumeInfo.description.length > 150) {
            bookContainerEls[i].summaryEl.textContent = yourBooks[i].volumeInfo.description.substring(0, 150) + '...';
        } else {
            bookContainerEls[i].summaryEl.textContent = yourBooks[i].volumeInfo.description;
        }

        bookContainerEls[i].infoUrl = yourBooks[i].volumeInfo.previewLink;

    }
}
