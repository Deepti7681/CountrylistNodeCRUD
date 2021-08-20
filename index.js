const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// parse application/json
app.use(bodyParser.json());
var corsOptions = {
	origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

//Create Database Connection
const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "new",
	charset: 'utf8mb4'
});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});


// creat a new country

app.post("/api/create", (req, res) => {
	let data = { cid: req.body.cid, countryname: req.body.countryname };
	let sql = "INSERT INTO countries SET ?";
	//let sql = "INSERT INTO countries(cid,countryname)VALUES(?,?)";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
		console.log(res.cid);
		console.log(res.countryname);
	});
});
// update the country
app.put("/api/update/", (req, res) => {
	let sql = "UPDATE countries SET countryname='" + req.body.countryname + "' WHERE cid=" + req.body.cid;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});
// show a single record
app.get("/api/view/:cid", (req, res) => {
	let sql = "SELECT * FROM countries WHERE cid=" + req.params.cid;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});
// fgshow all countries
app.get("/api/view", (req, res) => {
	let sql = "SELECT * FROM countries";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ response: result }));
	});
});
// delete the country
app.delete("/api/delete/:cid", (req, res) => {
	let sql = "DELETE FROM countries WHERE cid=" + req.params.cid + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	});
});
/*
// fgshow all records
app.get("/api/viewstate", (req, res) => {
	let sql = "SELECT * FROM state";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ response: result }));
	});
});

app.put("/api/updatestate", (req, res) => {
	let sql = "UPDATE state SET statename='" + req.body.statename + "' WHERE sid=" + req.body.sid;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ response: result }));
	});
});
app.get("/api/vieweditstate/:sid", (req, res) => {
	let sql = "SELECT * FROM state where sid="+req.params.sid;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ response: result }));
	});
});
app.delete("/api/deletestate/:sid", (req, res) => {
	let sql = "SELECT * FROM state WHERE sid=" + req.params.sid  ;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ response: result }));
	});
});
app.get("/api/view/:cid", (req, res) => {
	var sql = "SELECT state.statename AS statename FROM state JOIN countries ON countries.cid = state.ssid where cid="+req.params.cid;
	//let sql = "SELECT * FROM state WHERE ssid=" + req.params.ssid;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});
//creat a new Record
app.post("/api/create", (req, res) => {
	let data = { statename: req.body.statename, zipcode: req.body.zipcode};
	let sql = "INSERT INTO India SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});

// creat a new country
app.post("/api/create", (req, res) => {
	let data = { countryname: req.body.statename};
	let sql = "INSERT INTO countries SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});

*/
/*
app.put("/api/update/", (req, res) => {
	//let sql = "UPDATE userregister SET countryname='" + req.body.countryname +  "' WHERE cid=" + req.body.cid;
	let sql = "UPDATE userregister SET name='" + req.body.name + "', age='" + req.body.age + "', address='" + req.body.address + "' WHERE id=" + req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});

app.get("/api/view/:id", (req, res) => {
	let sql = "SELECT * FROM userregister WHERE id=" + req.params.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

app.get("/api/view", (req, res) => {
	let sql = "SELECT * FROM userregister";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ response: result }));
	});
});

app.delete("/api/delete/:id", (req, res) => {
	let sql = "DELETE FROM userregister WHERE id=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	});
});
*/
app.listen(8010, () => {
	console.log("server started on port 8010...");
});