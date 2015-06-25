var render = require('../render/content.js');
var initState = window.bootstrap;
var loop = require('main-loop')(initState, render, {
  create: require('virtual-dom/create-element'),
  diff: require('virtual-dom/diff'),
  patch: require('virtual-dom/patch')
});
var $ = window.$;

var root = document.getElementById('content');
root.innerHTML = '';
root.appendChild(loop.target);


var container = document.querySelector('.gallery'),
  defaultTitle = "Select your Ghostbuster!";

function requestContent(path){
  $.get(path, function(resp) {
    loop.update(resp);
  });
}

// intercept url changes
container.addEventListener('click', function(e){
  if(e.target != e.currentTarget){
    e.preventDefault();
    var name = e.target.getAttribute('data-name'),
      url = '/character/'+name;
    console.log(name);
    history.pushState(name, null, url);
    requestContent('/api/'+name);
    document.title = "Ghostbuster | " + name;
  }
  e.stopPropagation();
}, false);

// intercept back button
window.addEventListener('popstate', function(e){
  var character = e.state;
  console.log(character);
  if (character === null) {
    document.title = defaultTitle;
    loop.update(initState);
  } else {
    requestContent('/api/' + character);
    document.title = "Ghostbuster | " + character;
  }
});
