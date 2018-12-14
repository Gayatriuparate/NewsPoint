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
<<<<<<< HEAD
        case '/register':
            console.log("in register case");
            response.writeHead(200, { 'Content-type': 'application/json' });
            request.on('data', (data) => {
                let registerData = JSON.parse(data)
                let resultset = db.insertStatement(registerData, function (result) {
                    response.write("Registration Successful!!!");
                    response.end();
                });

            });
            break;
=======
  
>>>>>>> a966fd89e3a3bb54b4d10d2b8408d4e8b893bb79

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
<<<<<<< HEAD
            console.log(request.url);
=======
>>>>>>> a966fd89e3a3bb54b4d10d2b8408d4e8b893bb79
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

            case '/profile': response.writeHead(200, { 'Content-type': 'text/javascript' });
            console.log(request.url);
            request.on('data', (data) => {
                db.selectStatement(queryData.username, (result) => {
                    let results=JSON.stringify(result);
                    response.write(results);
                    response.end();

                });
            });
            break;

        case '/postReq': response.writeHead(200, { 'Content-type': 'text/plain' });
            request.on('data', (data) => {
                let resultset1 = db.selectBlog(function (result) {
                    let results = JSON.stringify(result);
                   response.write(results);
                   response.end();
                });
            });

            break;
        default:
            getResponse(response, filetype, fileName);
    }
}).listen(8080);