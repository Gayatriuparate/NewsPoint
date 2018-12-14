var http = require('http');
var fs = require('fs');
var mysql = require('./DBConnection');

const getResponse = (response, contentType, fileURL) => {
    response.writeHead(200, { 'Content-type': contentType });
    fs.readFile(fileURL, (err, html) => {
        if (err) {
            throw err;
        }
        response.write(html);
        response.end();
    });
}

http.createServer(function (request, response) {
    console.log(request.url);
 switch(request.url){
    case '/user_info':
    console.log("in case 1");
    response.writeHead(200, { 'Content-type': 'application/json' });
     let resultset = mysql.selectStatement('piya@gmail.com', function (result) {
        console.log("hhhhhhhhhhhh" + result);
    });
    response.end();
    break;
    default:
    console.log("in default case");
    getResponse(response, 'text/html', './register.html')
}
}).listen(8080);