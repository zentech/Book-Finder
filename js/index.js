$(document).ready(function() {
  var item, tile, author, publisher, bookLink, bookImg;
  var outputList = document.getElementById("list-output");
  var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  var apiKey = ":keyes&key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw"
  var searchData;
  //flowers+inauthor:keyes&key=yourAPIKey";

  //listener for search button
  $("#search").click(function() {
     searchData = $("#search-box").val();
     //handling empty search input field
     if(searchData === "" || searchData === null) {
       displayError();
     }
    else {
       // console.log(searchData);
       // $.get("https://www.googleapis.com/books/v1/volumes?q="+searchData, getBookData()});
       $.ajax({
          url: bookUrl + searchData,
          dataType: "json",
          success: function(response) {
            console.log(response)
            if (response.totalItems === 0) {
              alert("no result!.. try again")
            }
            else {
              $("#title").animate({'margin-top': '5px'}, 1000); //search box animation
              $(".book-list").css("visibility", "visible");
              displayResults(response);
            }
          },
          error: function () {
            alert("Something went wrong.. <br>"+"Try again!");
          }

        });
      }
   });

   /*
   * function to display result in index.html
   * @param response
   */
   function displayResults(response) {
      for (var i = 0; i < response.items.length; i+=2) {
        item = response.items[i];
        title1 = item.volumeInfo.title;
        author1 = item.volumeInfo.authors;
        publisher1 = item.volumeInfo.publisher;
        bookLink1 = item.volumeInfo.previewLink;
        bookImg1 = item.volumeInfo.imageLinks.smallThumbnail;

        item2 = response.items[i+1];
        title2 = item2.volumeInfo.title;
        author2 = item2.volumeInfo.authors;
        publisher2 = item2.volumeInfo.publisher;
        bookLink2 = item2.volumeInfo.previewLink;
        bookImg2 = item2.volumeInfo.imageLinks.smallThumbnail;

        // in production code, item.text should have the HTML entities escaped.
        outputList.innerHTML += '<div class="row">' +
                                formatOutput(bookImg1, title1, author1, publisher1, bookLink1) +
                                formatOutput(bookImg2, title2, author2, publisher2, bookLink2) +
                                '</div>';

        console.log(outputList);
      }
   }

});



/*
* card element formatter using es6 backticks and templates (indivial card)
* @param bookImg title author publisher bookLink
* @return htmlCard
*/
function formatOutput(bookImg, title, author, publisher, bookLink) {
  // console.log(title + ""+ author +" "+ publisher +" "+ bookLink+" "+ bookImg)
  var htmlCard = `<div class="col-lg-6">
    <div class="card" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${bookImg}" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">Author: ${author}</p>
            <p class="card-text"><small class="text-muted">Publisher: ${publisher}</small></p>
            <a href="${bookLink}" class="btn btn-secondary">More Info</a>
          </div>
        </div>
      </div>
    </div>
  </div>`
  return htmlCard;
}

//handling error for empty search box
function displayError() {
  alert("search term can not be empty!")
}
