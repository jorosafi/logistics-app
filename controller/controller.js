const model = require("../model/model");
const app = require("../app");

// SELECT all users
async function getAllItems(req, res) {
  try {
    const sql = "SELECT * FROM inventory ORDER BY category ASC ";
    const response = await model.query(sql);
    res.json(response.rows).status(200);
  } catch (err) {
    console.error("GET item: ", err);
    res.status(500).end();
  }
}

module.exports = {
  getAllItems,
};
