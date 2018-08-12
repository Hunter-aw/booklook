let booksObj = {
    books: []
}
let books = booksObj.books

var fetch = function () {
    let isbn = $('#isbnInput').val()
    $.ajax({
      method: "GET",
      url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbn,
      success: handleThis,
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    }); 
  };

function createBook(jsonData) {
    var data = jsonData.items[0].volumeInfo;
    return {
    title: data.title,
    description: data.description,
    author: data.authors[0],
    image: data.imageLinks.thumbnail
    };
}

function appendBooks(jsonData) {
    let bookData = createBook(jsonData)
    books.push(bookData)
}
var handleThis = function (jsonData) {
    $('.bookInfo').empty()
    appendBooks(jsonData);
    var source = $('#book-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(booksObj);
    $('.bookInfo').append(newHTML);
}

$('.search').click(fetch);