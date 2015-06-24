var ecstatic = require('ecstatic')({root: __dirname + '/public'});
var http = require('http');
var router = require('routes')();

var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var vToHtml = require('vdom-to-html');

var hyperstream = require('hyperstream');
var path = require('path');
var fs = require('fs');

function db(name) {
  return {content: 'this is the description for ' + name};
}

function renderPage(data) {
  var html = '<p>'+ data.content + '</p>';
  return hyperstream({'.content': html});
}

router.addRoute('/api/:name', function(req, res, params) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify( db(params.name) ));
});

router.addRoute('/character/:name', function(req, res, params) {
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(path.join(__dirname, 'public/index.html'))
    .pipe( renderPage(db(params.name)) )
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
