var http = require('http');
var fs = require('fs');
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
}).listen(8080);