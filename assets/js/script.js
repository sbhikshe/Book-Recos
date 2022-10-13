//var bestSellersUlEl = $('bestSellers');

//var bookCoverEls = [$("#bookcover1"), $("#bookcover2"), $("#bookcover3"), $("#bookcover4"), $("#bookcover5")];
//var bookLiEls = [$("#book1"), $("#book2"), $("#book3"), $("#book4"), $("#book5")];

var book1 = {
  titleEl: $document.querySelector("#book-title-1"),
  authorEl: $document.querySelector("#book-author-1"),
  summaryEl: $document.querySelector("#book-desc-1"),
  imgEl: $document.querySelector("#book-cover-1"),
  saveBtnEl: $document.querySelector("#book-save-1"),
  moreBtnEl: $document.querySelector("#book-see-more-1")
};

var book2 = {
  titleEl: $document.querySelector("#book-title-2"),
  authorEl: $document.querySelector("#book-author-2"),
  summaryEl: $document.querySelector("#book-desc-2"),
  imgEl: $document.querySelector("#book-cover-2"),
  saveBtnEl: $document.querySelector("#book-save-2"),
  moreBtnEl: $document.querySelector("#book-see-more-2")
};

var book3 = {
  titleEl: $document.querySelector("#book-title-3"),
  authorEl: $document.querySelector("#book-author-3"),
  summaryEl: $document.querySelector("#book-desc-3"),
  imgEl: $document.querySelector("#book-cover-3"),
  saveBtnEl: $document.querySelector("#book-save-3"),
  moreBtnEl: $document.querySelector("#book-see-more-3")
};

var book4 = {
  titleEl: $document.querySelector("#book-title-4"),
  authorEl: $document.querySelector("#book-author-4"),
  summaryEl: $document.querySelector("#book-desc-4"),
  imgEl: $document.querySelector("#book-cover-4"),
  saveBtnEl: $document.querySelector("#book-save-4"),
  moreBtnEl: $document.querySelector("#book-see-more-4")
};

var book5 = {
  titleEl: $document.querySelector("#book-title-5"),
  authorEl: $document.querySelector("#book-author-5"),
  summaryEl: $document.querySelector("#book-desc-5"),
  imgEl: $document.querySelector("#book-cover-5"),
  saveBtnEl: $document.querySelector("#book-save-5"),
  moreBtnEl: $document.querySelector("#book-see-more-5")
};

var bookContainerEls = [book1, book2, book3, book4, book5];

function getBestSellers() {

  //var requestUrl = "https://api.nytimes.com/svc/books/v3/reviews.json?author=barack+obama&api-key=mbr0cIYuEknkV8twRd7HKM3gDlmmsYSA";
  //var requestUrl = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?age_group=8&api-key=mbr0cIYuEknkV8twRd7HKM3gDlmmsYSA";
  var requestUrl = "https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=2022-10-01&api-key=mbr0cIYuEknkV8twRd7HKM3gDlmmsYSA";

  fetch(requestUrl)
  .then(function(response){
    response.json(). then(function(data){
      console.log(data);

      /* for best-seller request, use this */
      //searchResultsTitleEl.textContent = data.results[0].author;
      //searchResultsAuthorEl.textContent = data.results[0].title;
      //searchResultsDescriptionEl.textContent = data.results[0].description;

      createDisplayForBestSellers();
      displayBestSellers(data);
      /* for best seller lists request with published_date */
      //var bookList = data.results.lists[0].books;

    })
  });
  
}

function createDisplayForBestSellers() {
  // Do this in HTML/CSS
}

function displayBestSellers(data) {
  var numLists = data.results.lists.length;
  var listChoice;
  var bookList;
  var bookChoice;

  /* get 5 books from various lists */
  for (var i = 0; i < 5; i++) {

    // randomize from among the lists returned
    listChoice = Math.floor(Math.random() * numLists); 
    bookList = data.results.lists[listChoice].books;
    bookChoice = Math.floor(Math.random() * bookList.length);

    /* get info for bookList[bookChoice] */
    console.log("Book " + i + ":");
    console.log(bookList[bookChoice].author);
    console.log(bookList[bookChoice].title);
    console.log(bookList[bookChoice].description);
    console.log(bookList[bookChoice].book_image);

    /*
    console.log("bestSellersUlEl: " + bestSellersUlEl);
    var liEl = bestSellersUlEl.children().eq(i);
    console.log("li: " + $(liEl));
    var pEl = liEl.children().eq(0);
    
    var imgEl = liEl.children().eq(1);
    pEl.text(bookList[bookChoice].title);
    imgEl.attr("src", bookList[bookChoice].book_image);
    */
 
   //bookCoverEls[i].attr("src", bookList[bookChoice].book_image);
   /* Using Priya's html
   var titleEl = bookLiEls[i].children().eq(0);
   var authorEl = bookLiEls[i].children().eq(1);
   var coverStr = "#bookcover" + i;
   var imgEl = bookLiEls[i].children().eq(2);
   var summaryEl = bookLiEls[i].children().eq(3);
   
   titleEl.text(bookList[bookChoice].title);
   authorEl.text(bookList[bookChoice].author);
   imgEl.attr("src", bookList[bookChoice].book_image);
   summaryEl.text(bookList[bookChoice].description);
   */

   bookContainerEls[i].imgEl.attr("src", bookList[bookChoice].book_image);

   bookContainerEls[i].titleEl.text(bookList[bookChoice].title);
   bookList[bookChoice].authorEl .text(bookList[bookChoice].author);
   bookList[bookChoice].summaryEl.text(bookList[bookChoice].description);

  
  }

}

$('document').ready(getBestSellers);
