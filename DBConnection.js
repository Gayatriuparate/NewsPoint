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

let insertStatement = () => {
    var sql = `INSERT INTO user_info values(null, '${username}','${password}','${email_id}','${mobileNo}','${education}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("data added");
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
