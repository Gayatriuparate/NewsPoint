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

let insertStatement = (data,callback) => {
    var sql = `INSERT INTO user_info values(null, '${data.username}','${data.password}','${data.email_id}','${data.mobileNo}','${data.education}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        callback(result);
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

let insertBlog = () => {
    var sql = `INSERT INTO blog_posts values(null, '${userNm}','${title}','${blogDesc}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Blog Posted !!");
    });
};
module.exports = { insertStatement, selectStatement, insertBlog };
