var gallery = document.querySelector('.gallery');
var mainPic = document.querySelector('.main-pic');
var filter = document.querySelector('.filter');
var filterBtn = document.querySelector('button');

function loadImage(num) {
    // add image thumbnail to gallery
    var img = document.createElement('img');
    img.setAttribute('class', 'thumb-pic');
    img.setAttribute('src', 'img/pic' + num + '.jpg');
    img.onclick = zoomIn;
    gallery.appendChild(img);
}

function zoomIn(e) {
    // zoom image in
    var src = e.target.getAttribute('src');
    mainPic.setAttribute('src', src);
}


// LISTENERS

filterBtn.onclick = function() {
    var darkened = !filter.classList.toggle('hidden');
    filterBtn.textContent = (darkened)? 'Lighten' : 'Darken';
};


// INITIALIZE

for (var i = 1; i <= 5; i++) {
    loadImage(i);
}
