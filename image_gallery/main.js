var gallery = document.querySelector('.gallery');
var mainPic = document.querySelector('.main-pic');

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


// INITIALIZE

for (var i = 1; i <= 5; i++) {
    loadImage(i);
}
