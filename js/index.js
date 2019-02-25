$(document).ready(function() {
  var item, tile, author, publisher, bookLink, bookImg;
  var outputList = document.getElementById("list-output");

  //template
  var htmlCard = `
      <div class="col-lg-6">
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
              </div>
            </div>
          </div>
        </div>
      </div>
  `;

  //listener for search button
  $("#search").click(function() {
     $("#title").animate({'margin-top': '5px'}, 1000);
     // $(".book-list").css("visibility", "visible");
     var searchData = $("#search-box").val();
     if(searchData === "") {
       // dsiplayErr();
     } else {
       console.log(searchData);
       $.get("https://www.googleapis.com/books/v1/volumes?q="+searchData, function(response) {
          for (var i = 0; i < response.items.length; i++) {
            item = response.items[i];
            title = item.volumeInfo.title;
            author = item.volumeInfo.authors;
            publisher = item.volumeInfo.publisher;
            bookLink = item.selfLink;
            bookImg = item.volumeInfo.imageLinks.thumbnail;
            // in production code, item.text should have the HTML entities escaped.

            if( (i+2) % 2 != 0) {
              console.log("odd")
              outputList.innerHTML += `<div class="row">`;
            }
            outputList.innerHTML += formatOutput(title, author, bookLink, bookImg);
            if((i+2) % 2 == 0) {
              console.log("even")
              outputList.innerHTML += `</div>`;
            }
            console.log(outputList.innerHTML);
          }
        });
      }
   });

});



function formatOutput(title, author, publisher, bookLink, bookImg) {
  // console.log(title + ""+ author +" "+ publisher +" "+ bookLink+" "+ bookImg)
  var htmlCard1 = `<div class="col-lg-6">
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
          </div>
        </div>
      </div>
    </div>
  </div>`
  return htmlCard1;
}
