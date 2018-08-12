var fetch = function () {
    $.ajax({
      method: "GET",
      url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:0439023521',
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

var handleThis = function (jsonData) {
    let bookData = createBook(jsonData);
    var source = $('#book-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(bookData);
    $('.bookInfo').append(newHTML);
}

$('.search').click(fetch)