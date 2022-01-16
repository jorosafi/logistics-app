// const { Client } = require("pg");

// const dbAuth = require("../dbAuth");

// const client = new Client({
//   user: dbAuth.dbUserName,
//   host: dbAuth.host,
//   database: "logistics-app",
//   password: dbAuth.dbPW,
//   port: "5432",
// });

// client.connect((err) => {
//   if (err) {
//     console.error("connection error", err.stack);
//   } else {
//     console.log("db connected");
//   }
// });

// module.exports = client;

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

client.query(
  "SELECT table_schema,table_name FROM information_schema.tables;",
  (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  }
);
