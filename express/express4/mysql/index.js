const express = require("express");
const app = express();
app.listen(3011, () => console.log("http://localhost:3011"));
const mysql = require("mysql");


const conn = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  port: 3306,
  database: "class",
});

conn.connect(function (err) {
  console.log(err?err:'DB連線成功');
});

app.get("/", function (req, res) {
  conn.query("select * from students", [], function (err, data) {
    res.send(JSON.stringify(data));
  });
});

app.get("/list/:min/:max", function (req, res) {
  conn.query(
    "select * from students where cid >= ? and cid <= ?",
    [req.params.min, req.params.max],
    function (err, data) {
      console.log(err);
      res.send(JSON.stringify(data));
    }
  );
});
app.get("/page/:pageNo", function (req, res) {
  //

  conn.query("select count(cid) from students;", "", function (err, count) {
    console.log(err);
    //算出總筆數 count
    let rowsPerPage = 1;
    let pageNo = req.params.pageNo;
    let skip = (pageNo - 1) * rowsPerPage;
    let totalRow = count[0]["count(cid)"];
    let lastPage = Math.ceil(totalRow / rowsPerPage);
    conn.query(
      "SELECT * FROM students LIMIT ? OFFSET ?;",
      [rowsPerPage, skip],
      (err, data) => {
        res.send(JSON.stringify({ data, totalRow, lastPage }));
      }
    );
  });
});
