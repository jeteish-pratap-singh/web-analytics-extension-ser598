var img = document.querySelector("img.vert");
img.src =
  "https://news.asu.edu/sites/g/files/litvpz161/files/styles/asu_news_gallery_image/public/sparky-2013.jpeg?itok=PyVwqVxB";

var navlist = document.getElementsByClassName("nav-list")[0];
var element = document.createElement("li");
element.innerHTML = '<a href="https://canvas.asu.edu">Open Canvas</a>';
navlist.appendChild(element);
