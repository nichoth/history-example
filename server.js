var ecstatic = require('ecstatic')({root: __dirname + '/public'});
var http = require('http');
var router = require('routes')();

var vToHtml = require('vdom-to-html');

var hyperstream = require('hyperstream');
var path = require('path');
var fs = require('fs');

var renderPage = require('./render/content.js');

function db(name) {
  return {
    charName: name,
    description: 'this is the description for ' + name
  };
}

router.addRoute('/', function(req, res, params) {
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(path.join(__dirname, 'public/index.html'))
    .pipe( hyperstream({
      '#bootstrap': "window.bootstrap = {charName: '', description: ''}",
      '#content': vToHtml( renderPage( {charName: '', description: ''} ) )
    }))
    .pipe(res);
});

router.addRoute('/api/:name', function(req, res, params) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(db(params.name)));
});

router.addRoute('/character/:name', function(req, res, params) {
  var content = db(params.name);
  var tree = renderPage(content);
  var html = vToHtml(tree);
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(path.join(__dirname, 'public/index.html'))
    .pipe( hyperstream({
      '#content': html,
      '#bootstrap': 'window.bootstrap = ' + JSON.stringify(db(params.name))
    }))
    .pipe(res);
});

http.createServer(function(req, res) {

  var m = router.match(req.url);
  if (m) {
    m.fn(req, res, m.params);
  }
  else {
    ecstatic(req, res);
  }

}).listen(8000);

console.log("listening on :8000");
