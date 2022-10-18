# Book Reco's
# A repository of book recommendations
## Table of Contents
* [Description](#description)
* [Wireframe](#wireframe)
* [User Story](#user-story)
* [Screenshots](#screenshots)
* [Code Snippets](#code-snippets)
* [Technologies Used](#technologies-used)
* [Credits](#credits)
* [Author Links](#author-links)

## Description

Book Reco's offers a simple, easy to use interface to search for books by genre. With Book Reco’s™, each search returns books randomly picked from the whole universe of books belonging to that genre; no repetitions, no skewing towards the popular ones which a fan had probably already read. From the list of recommended books, a book lover can see information and ratings of these books, as well as a summary.The application has been deployed to the Github Pages at [Book Recos](https://sbhikshe.github.io/Book-Recos/).

## Learning Objectives

- Design a clean, intuitive, and responsive ui design with an unfamiliar CSS framework
- Research and implement various third-party, server-side APIs
- Research and utilize new javascript libraries
- Demonstrate the importance of a proper git work flow in a group setting
- Objectively assess and critique other members contributions
- Construct a final product that shows full understanding of user stories along with polish

## Usage

Upon first visiting the webpage, the user should be greeted with a header with our logo, a dropdown menu to select a book genre, and 5 New York Times Best Sellers.
The user can either refresh the page to see a new listing of New York Times best sellers or choose a genre from the dropdown menu. Either choice will generate 5 randomly chosen books. 
Each book displayed will have 2 buttons underneath it. The 'see more' button will redirect to either an amazon or google books link for that book. The 'save book' button will save that book's data to local storage. This also appends the book's title and author to a list on the left, underneath the search form. Underneath the displayed books, the saved book's cover will appear in a gallery. Clicking this cover will also redirect to its corresponding amazon or google books link. The book gallery will remain upon page refresh.

## Wireframe
![Wireframe Design - Initial interface](./assets/images/BR_1.png)
![After retrieving books with server side API](./assets/images/BR_3.png)

## User Story

| As a         | I want to                            | So that   
| ------------ | ------------------------------------ | ------------    |
| `Book lover` | select a genre from a dropdown       | `I see new books based on my selected genre` |
| `Book lover` | see the summary of a selected book   | `I can see whether that book seems interesting to me` |
| `Book lover` | see the title and author             | `I know how to refer to this book later` |
| `Book lover` | see more details about the book      | `I can get an idea easily` |
| `Book lover` | see NYTimes Best Sellers             | `I can see what are some popular books right now` |
| `Book lover` | save some of the books               | `I can check them later` |   
| `Book lover` | see a modal for invalid API response | `I know there was a server error` |

## Screenshots

### *1. Select genre from dropdown box*
!["Select genre from dropdown box"](./assets/images/Dropdown.png)

### *2. Initial Screen with form to search for books by genre - shows books from NY Times query*
!["Initial Screen with genre search form and NY Times best sellers"](./assets/images/MainPage.png)

### *3. Displaying search results by selected genre from Google Books API*
!["Search results from Google Books API"](./assets/images/GenreResult.png)

### *4. Save book to history*
!["Save book to history in local storage"](./assets/images/Bookshelf.png)

### *5. See More button leads to more information about the book*
!["See More button handling"](./assets/images/SeeMore.gif)

### *6. Gif of site at different screen sizes*
!["Gif of site at different screen sizes"](./assets/images/DifferentSizeResponse.gif)

## Code Snippets

### 1. Fetch request to get best sellers from New York Times
#### Send out the fetch request to get the NY Time best sellers filtered by a published date. Handle errors and display 5 books randomly picked from the search results.
```
   var requestUrl = "https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=2022-10-01&api-key=mbr0cIYuEknkV8twRd7HKM3gDlmmsYSA";

    fetch(requestUrl)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                displayBestSellers(data);
            })
        });
  
```

### 2. Fetch request to get books by genre from Google Books API
#### Send out the fetch request to get the books by genre from Google Books filtered by release date,print type and subject.
```
var requestUrlBook = 'https://www.googleapis.com/books/v1/volumes?q=subject:' + genreEntry + '&orderBy=newest&printType=books&maxResults=40&key=AIzaSyAAo4826hqGYvowcixZb8ZXQ3hpqBGqD2Q';

    fetch(requestUrlBook)
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                response.json().then(function (dataB) {
                    console.log(dataB);
                    displayRandomPicks(dataB);
        
                });
  
```

### 3. Handle the "See More" button
#### When the "See More" button is clicked on one of the books shown, open a new window with a page that has more information about the book.
```
     for (var i = 0; i < 5; i++) {
        if (bookContainerEls[i].moreBtnEl == event.target) {
            /* open in a new tab */
            window.open(bookContainerEls[i].infoUrl, '_blank');
        }
    }
```
### 4. Individual container for book information
#### Includes cover image, title, author, description using tailwind css
```
<div id="book-cover-container-1"
                    class="card card-compact custom-minimum-width w-80 m-3 bg-base-100 shadow-xl">
                    <figure><img id="book-cover-1" class="h-80 object-fill mt-2 " src="" alt="Book Cover" />
                    </figure>
                    <div class="card-body">
                        <h2 id="book-title-1" class="card-title justify-center text-center text-xl font-bold"></h2>
                        <h3 id="book-author-1" class="card-title justify-center text-xl font-semibold"></h3>
                        <p id="book-desc-1" class="text-base"></p>
                        <section class="inline-flex justify-between">
                            <div class="flex card-actions justify-start">
                                <button id="book-save-1" class="btn btn-sm btn-primary">Save Book</button>
                            </div>
                            <div class="flex card-actions justify-end">
                                <button id="book-see-more-1" class="btn btn-sm btn-primary">See More</button>
                            </div>
                        </section>
                    </div>
                </div>
```

### 5. Store.js library
### This part of the code for storing data
```
  savedBooks.push({ title: bookContainerEls[i].titleEl.textContent, 
                    author: bookContainerEls[i].authorEl.textContent, 
                    img: bookContainerEls[i].imgEl.src,
                    infoUrl: bookContainerEls[i].infoUrl });
                store.set('books', savedBooks);
```

### 6. Grid gallery
### This part of the code for adding book to the saved books gallery
```
function createGalleryItem(bookCover, url) {
    var imgEl = document.createElement('img');
    imgEl.src = bookCover;
    imgEl.setAttribute("style", "width: 250px; padding: 2px;");
    imgEl.addEventListener('click', function() { window.open(url, '_blank')});
    ggBoxEl.append(imgEl);
}
```

## Technologies Used
- HTML
- CSS
- JavaScript
- jQuery
- Tailwind CSS framework
- Daisy UI
- Store.js library
- Grid-Gallery.js library
- Server Side API - Google Books, New York Times

## Credits
[Google Books API](https://developers.google.com/books/docs/overview)\
[NY Times Books API](https://developer.nytimes.com/docs/books-product/1/overview)\
[NY Times API to get Best Sellers](https://developer.nytimes.com/docs/books-product/1/routes/lists/overview.json/get)\
[store.js library](https://github.com/marcuswestin/store.js)\
[Tailwind CSS](https://tailwindcss.com/)
[DaisyUI](https://daisyui.com/)

## Author Links
### LinkedIn: [Peter](https://www.linkedin.com/in/peter-kim89/) - [Mehmet](https://www.linkedin.com/in/mehmet-musabeyo%C4%9Flu-788758a8/) - [Priya](https://www.linkedin.com/in/sripriya-bhikshesvaran-8520992/)
### Github: [Peter](https://github.com/PeterKim89) - [Mehmet](https://github.com/MehmetMusabeyoglu) - [Priya](https://github.com/sbhikshe)

 ## License 
 This project is licensed under the MIT License 
 <br>
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)