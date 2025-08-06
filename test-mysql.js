// test-mysql.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "MSAyomiposi24!",
  database: "fullstackdb",
});

connection.connect((err) => {
  if (err) {
    console.error("Connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL successfully!");
  connection.end();
});
