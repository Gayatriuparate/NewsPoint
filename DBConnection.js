<<<<<<< HEAD
=======

>>>>>>> 6d6ee4f06963769cca6663d9e2c9f2447b7dfe57
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
<<<<<<< HEAD
    password: "synerzip",
=======
    password: "root",
>>>>>>> 6d6ee4f06963769cca6663d9e2c9f2447b7dfe57
    database: "blog_db"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

<<<<<<< HEAD
})

let insertStatement = () => {
    var sql = `INSERT INTO user_info values(null, '${username}','${password}','${email_id}','${mobileNo}','${education}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("data added");
    });
};

module.exports = { insertStatement };
=======
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
>>>>>>> 6d6ee4f06963769cca6663d9e2c9f2447b7dfe57
