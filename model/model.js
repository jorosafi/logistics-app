const { Client } = require("pg");
// const { host } = require("pg/lib/defaults");
const dbAuth = require("../dbAuth");

const client = new Client({
  user: dbAuth.dbUserName,
  host: dbAuth.host,
  database: "logistics-app",
  password: dbAuth.dbPW,
  port: "5432",
});

// const client = (module.exports = new Client({
//   user: dbAuth.dbUserName,
//   host: dbAuth.host,
//   database: "logistics-app",
//   password: dbAuth.dbPW,
//   port: "5432",
// }));

client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("db connected");
  }
});

module.exports = client;
