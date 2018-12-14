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
    let filetype = 'text/html'
    if (request.url.includes(".html")) {
        fileName = `.${request.url}`;
    } else if (request.url.includes(".css")) {
        fileName = `.${request.url}`;
        filetype = 'text/css';
    } else if (request.url.includes(".js")) {
        fileName = `.${request.url}`;
        filetype = 'text/javascript';
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

        case '/blogReq':
            console.log("in case timeline HTML.");
            response.writeHead(200, { 'Content-type': 'application/html' });
            request.on('data', (data) => {
                let registerData = JSON.parse(data)
                let resultset = db.insertBlog(registerData, function (result) {
                    console.log("inserted!!!!!" + result);
                });
            });
            response.end();
            break;


        case '/valReq': response.writeHead(200, { 'Content-type': 'text/javascript' });
            console.log(request.url);
            request.on('data', (data) => {
                let queryData = JSON.parse(data);
                db.selectStatement(queryData.username, (result) => {
                    let res = "Failed";
                    if (result[0] != undefined) {
                        let pass = result[0].password;
                        if (queryData.password.toString() == pass) {
                            res = "success";
                        }
                    }
                    response.write(res);
                    response.end();

                });
            });
            break;
        default:
            console.log(fileName);
            getResponse(response, filetype, fileName);
    }
}).listen(8080);