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
    switch (request.url) {
        case '/user_info':
            console.log("in case 1");
            response.writeHead(200, { 'Content-type': 'application/json' });
            let resultset = mysql.selectStatement('piya@gmail.com', function (result) {
                console.log("hhhhhhhhhhhh" + result);
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
        default: getResponse(response, 'text/html', './login.html');
    }
}).listen(8080);