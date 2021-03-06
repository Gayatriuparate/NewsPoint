var db = require('mysql');

var con = db.createConnection({
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
    var sql = `INSERT INTO user_info values(null, '${data.username}','${data.password}','${data.email_id}','${data.mob_no}','${data.edu}')`;
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

let insertBlog = (data) => {
    var sql = `INSERT INTO blog_posts values(null, '${data.userNm}','${data.title}','${data.blogDesc}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Blog Posted !!");
    });
};


let selectBlog = (cb) => {
    var sql = `select title,blogDesc from blog_posts order by id DESC`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        cb(result);
    });
};
let selectProfile = (username) => {
    var sql = `select username,email_id,mobileNo,education from user_info order by id DESC`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        username(result);
    });
};


module.exports = { insertStatement, selectStatement, insertBlog,selectBlog, selectProfile};

