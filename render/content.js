var fs = require('fs');
var h = require('virtual-dom/h');
var titleCase = require('title-case');

var characters = ['peter', 'ray', 'egon', 'winston'];

module.exports = function renderContent(data) {

  function characterEl(name) {
    var classes = name;
    classes += (data.charName === name) ? ' current' : '';
    return (
      h('a', {
        href: '/character/'+name,

        },[
        h('img', {
          className: classes,
          src: '/image/'+name+'.png',
          alt: name,
          attributes: {
            'data-name': name
          }
        })
      ])
    );
  }

  return (
    h('div.page-wrap', [
      h('div.gallery', characters.map(function(ch) {
        return characterEl(ch);
      })),

      h('p.selected', [ 'Ghostbusters' ]),
      h('p.highlight', [ data.charName ]),
      h('div.content', [ h('p', [data.description]) ])
    ])
  );

};
