var formElement = document.querySelector('form');
var urlInput = document.querySelector('[name=link]');
var notesInput = document.querySelector('[name=notes]');
var bookmarksList = document.querySelector('.bookmarks');


var storage = [];
if (localStorage.bookmarks) {
  storage = JSON.parse(localStorage.bookmarks);
}

formElement.addEventListener('submit', function(event) {
  event.preventDefault();

  var info = {
    url: urlInput.value,
    notes: notesInput.value
  };

  saveBookmark(info);

  bookmarksList.appendChild(renderBookmark(info));

  urlInput.value = '';
  notesInput.value = '';
});


function saveBookmark(info) {
  storage.push(info);
  localStorage.bookmarks = JSON.stringify(storage);
}


function removeBookmark(url) {
  var index = storage.findIndex(function(info) {
    return info.url === url;
  });

  storage.splice(index, 1);
  localStorage.bookmarks = JSON.stringify(storage);
}


function renderBookmark(info) {
  var bookmarkElement = document.createElement('li');
  bookmarkElement.innerHTML = '<li class="bookmark">'+
    '<div>'+
      '<a href="'+ info.url + '">' + info.url + '</a>'+
      '<p>' + info.notes + '</p>'+
    '</div>'+
    '<button class="remove">X</button>'+
  '</li>';

  var removeButton = bookmarkElement.querySelector('.remove');
  removeButton.addEventListener('click', function(event) {
    removeBookmark(info.url);
    bookmarkElement.parentNode.removeChild(bookmarkElement);
  });

  return bookmarkElement;
}

storage.forEach(function(info) {
  bookmarksList.appendChild(renderBookmark(info));
});