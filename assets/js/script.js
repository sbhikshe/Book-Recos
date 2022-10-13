// var genreSearch = $("#searchBox");

// $('#submit').on('click', function (event) {
//     event.preventDefault();

//     genreEntry = genreSearch.val().toUpperCase().trim();


//     var requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:' + genreEntry + '&maxResults=40&key=AIzaSyAAo4826hqGYvowcixZb8ZXQ3hpqBGqD2Q';



//     function getApi(requestUrl) {
//         fetch(requestUrl)
//             .then(function (response) {
//                 console.log(response);
//                 if (response.status === 200) {
//                 }
//                 return response.json();


//             }).then(function (data) {
//                 // console.log(data);

//                 var yourBooks = [];

//                 for (var i = 0; i < 5; i++) {
//                     yourBooks = data.items[Math.floor(Math.random() * data.items.length)];
//                     console.log(yourBooks);
//                 }

//             });
//     }

//     getApi(requestUrl);
// });