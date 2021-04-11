const http = require('http');
const url = require('url');

// const hostname = '127.0.0.1';
// const port = 3000;
//
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });
//
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

function start(route, handle) {
    function onRequest(request, response) {
        var postDate = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        request.setEncoding("utf8");

        request.addListener("data", function (postDataChunk) {
            postDate += postDataChunk;
            console.log("Receievd POST data chunk '" +
            postDataChunk + "'");
        })

        request.addListener("end", function () {
            route(handle, pathname, response, postDate);
        });
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;
