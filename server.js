var ecstatic = require('ecstatic')({root: __dirname + '/public'});
var http = require('http');
var router = require('routes')();

router.addRoute('/api/character/:name', function(req, res, params) {
  res.setHeader("Content-Type", "text/html");
  res.end('<p>Character description for ' + params.name + '</p>');
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
