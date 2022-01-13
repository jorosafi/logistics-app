const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const indexRouter = require("./routes/index");
// app.use("/api", indexRouter); Taken from 304 project -- may not need

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// app.get("/", (req, res) => {
//   console.log("Hello World!");
// });

app.listen(port, () => {
  console.log(`app is listening at http:localhost:${port}`);
});

// from original express-generator template
// module.exports = app;
