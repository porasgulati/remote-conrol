var	http = require('http'),
	net = require('net'),
	url = require('url'),
	exec = require('child_process').exec,
	fs = require('fs'),
	querystring = require('querystring');

var server = http.createServer(function(req, res) {
	console.log(req.method + ' ' + req.url);
	
	if (req.method == 'GET') {
		var file = '.' + url.parse(req.url).pathname +".txt";
		fs.stat(file, function(err, stats) {
			if (err != null) {
				if (err.errno == 2) {
					res.writeHead(404);
					res.end();
				}
			}
			else if (stats.isFile()) {
				res.writeHead(200);
				fs.createReadStream(file).pipe(res);
			}
		});
	}
	else if (req.method == 'PUT') {
		var parsed = url.parse(req.url);
		if (parsed.pathname == '/move') {
			var query = querystring.parse(parsed.query);
			exec('xte \'mousermove ' + query.x + ' ' + query.y + '\'');
			res.writeHead(200);
			res.end();
		}
		else if (parsed.pathname == '/click') {
			exec('xte \'mouseclick 1\'');
			res.writeHead(200);
			res.end();
		}
		else {
			res.writeHead(400);
			res.end();
		}
	}
}).listen(8080);
