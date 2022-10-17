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
### 2. Handle the "See More" button
#### When the "See More" button is clicked on one of the books shown, open a new window with a page that has more information about the book.
```
     for (var i = 0; i < 5; i++) {
        if (bookContainerEls[i].moreBtnEl == event.target) {
            /* open in a new tab */
            window.open(bookContainerEls[i].infoUrl, '_blank');
        }
    }
```
### 3. Individual container for book information
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

## Technologies Used
- HTML
- CSS
- JavaScript
- jQuery
- Tailwind CSS framework
- Daisy UI
- store.js library
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