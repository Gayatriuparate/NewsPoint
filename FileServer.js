var http = require('http');
var fs = require('fs');
//var url = require('url');
const db = require('./DBConnection');


http.createServer(function (request, response) {
    switch (request.url) {
        case '/valReq': response.writeHead(200, { 'Content-type': 'text/javascript' });
            console.log(request.url);
            request.on('data', (data) => {
                let queryData = JSON.parse(data);

                db.selectStatement(queryData.username, (result) => {
                    let pass=result[0].password;
                    let res="";
                    if (queryData.password.toString() == pass) {
                        res="success";
                    } else {
                        res="Failed";
                    }
                    response.write(res);
                    response.end();

                });
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