var http = require('http');
var fs = require('fs');
const db = require('./DBConnection');

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
    let fileName = './login.html'
    if (request.url.includes(".html")) {
        fileName = `.${request.url}`;
    }
    switch (request.url) {
        case '/register':
            response.writeHead(200, { 'Content-type': 'application/json' });
            request.on('data', (data) => {
                let registerData = JSON.parse(data)
                let resultset = db.insertStatement(registerData, function (result) {
                    console.log("hhhhhhhhhhhh" + result);
                    response.end();
                });

            });
            break;
        case '/valReq': response.writeHead(200, { 'Content-type': 'text/javascript' });
            console.log(request.url);
            request.on('data', (data) => {
                let queryData = JSON.parse(data);
                db.selectStatement(queryData.username, (result) => {
                    let pass = result[0].password;
                    let res = "";
                    if (queryData.password.toString() == pass) {
                        res = "success";
                    } else {
                        res = "Failed";
                    }
                    response.write(res);
                    response.end();

                });
            });
            break;
        default:
            console.log(fileName);
            getResponse(response, 'text/html', fileName);
    }
}).listen(8080);