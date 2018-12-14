var http = require('http');
var fs = require('fs');
<<<<<<< HEAD
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
=======
var url = require('url');
const db=require('./DBConnection');


http.createServer(function (request, response) {
    let queryData = "";
    let stringUrl = request.url.toString();
    if (stringUrl.includes('?')) {
        queryData = url.parse(request.url, true).query;
        stringUrl = '/?'
    }
    // console.log(queryData.username);
    switch (stringUrl) {
        case '/?': response.writeHead(200, { 'Content-type': 'text/javascript' });
            db.selectStatement(queryData.username,(result)=>{
                if(queryData.password==result){
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
        default: response.writeHead(200, { 'Content-type': 'text/html' });
            fs.readFile('./login.html', (err, html) => {
                if (err) {
                    throw err;
                }
                response.write(html);
                response.end();
            });
    }
>>>>>>> 6d6ee4f06963769cca6663d9e2c9f2447b7dfe57
}).listen(8080);