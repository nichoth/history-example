(function(){

  "use strict";

  var container = document.querySelector('.gallery'),
    imgs = document.querySelectorAll('img'),
    textWrapper = document.querySelector('.highlight'),
    content = document.querySelector('.content'),
    defaultTitle = "Select your Ghostbuster!",
    urlPrefix = '/character/';

  function updateText(content){
    textWrapper.innerHTML = content;
  }

  function requestContent(path){
    $('.content').load(path);
  }

  function removeCurrentClass(){
    for(var i = 0; i < imgs.length; i++){
      imgs[i].classList.remove('current');
    }
  }

  function addCurrentClass(elem){
    removeCurrentClass();
    var element = document.querySelector("." + elem);
    element.classList.add('current');
  }

  // intercept url changes
  container.addEventListener('click', function(e){
    if(e.target != e.currentTarget){
      e.preventDefault();
      var name = e.target.getAttribute('data-name');
      var data = e.target.getAttribute('data-name'),
        url = urlPrefix + data;
      addCurrentClass(data);
      history.pushState(data, null, url);
      updateText(data);
      requestContent('/api/character/'+name);
      document.title = "Ghostbuster | " + data;
    }
    e.stopPropagation();
  }, false);

  // intercept back button
  window.addEventListener('popstate', function(e){
    var character = e.state;

    if (character === null) {
      removeCurrentClass();
      textWrapper.innerHTML = " ";
      content.innerHTML = " ";
      document.title = defaultTitle;
    } else {
      updateText(character);
      requestContent('/api/character/' + character);
      addCurrentClass(character);
      document.title = "Ghostbuster | " + character;
    }
  });
})();
