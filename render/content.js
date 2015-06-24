var fs = require('fs');
var h = require('virtual-dom/h');

module.exports = function renderContent(data) {
  return h('p', data);
};
