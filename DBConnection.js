
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "blog_db"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

});
let insertStatement = (data) => {
    var sql = `INSERT INTO event_data values(null, '${data.textualStuff}','2018-12-${data.dayOfMon}','55:55:00',1)`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Event added");
    });
};
let selectStatement = (email, cb) => {
    var sql = `select password from user_info where email_id='${email}'`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        cb(result);
    });
};
module.exports = { insertStatement, selectStatement };