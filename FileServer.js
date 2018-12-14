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

    switch (request.url) {
        case '/?': response.writeHead(200, { 'Content-type': 'text/javascript' });
            db.selectStatement(queryData.username, (result) => {
                if (queryData.password == result) {
                    response.redirect('www.google.com');
                }
            });
            break;
        case '/new.css': response.writeHead(200, { 'Content-type': 'text/css' });
            fs.readFile('./new.css', (err, html) => {
                if (err) {
                    throw err;
                }
                response.write(html);
                response.end();
            });
            break;
        case '/event_data': request.on('data', (data) => {
            const dataObj = JSON.parse(data);
            mysql.insert(dataObj);

        });
            break;
        case '/user_info':
            console.log("in case 1");
            response.writeHead(200, { 'Content-type': 'application/json' });
            let resultset = mysql.selectStatement('piya@gmail.com', function (result) {
                console.log("hhhhhhhhhhhh" + result);
            });
            response.end();
            break;
        default: response.writeHead(200, { 'Content-type': 'text/html' });
            fs.readFile('./login.html', (err, html) => {
                if (err) {
                    throw err;
                }
                response.write(html);
                response.end();
            });
    }
}).listen(8080);