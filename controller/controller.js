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

async function addItem(req, res) {
  try {
    //Get values from form field
    let itemName = req.body.itemName;
    let category = req.body.category;
    let supplierName = req.body.supplier;
    let wUnitPrice = req.body.wPrice;
    let rUnitPrice = req.body.rPrice;
    let warehouse = req.body.warehouse;
    let item_id =
      category.substring(0, 2).toLowerCase() +
      "-" +
      Math.floor(Math.random() * (999 - 100 + 1) + 1);

    let supplierIdQuery = await model.query(
      {
        rowMode: "array",
        text: "SELECT supplier_id FROM suppliers WHERE name  = $1",
      },
      [supplierName]
    );
    let supplierID = supplierIdQuery.rows[0][0];

    // console.log(supplierID);
    // res.json({
    //   name: itemName,
    //   category: category,
    //   supplier: supplierName,
    //   supplierQuery: supplierIdQuery,
    //   supplierId: supplierID,
    //   wprice: wUnitPrice,
    //   rprice: rUnitPrice,
    //   warehouse: warehouse,
    //   id: item_id,
    // });
    let sql = "INSERT INTO inventory VALUES ($1, $2, $3, $4, $5, $6, $7);";
    let values = [
      item_id,
      itemName,
      category,
      supplierID,
      wUnitPrice,
      rUnitPrice,
      warehouse,
    ];
    const response = await model.query(sql, values);
    res.render("index");
  } catch (err) {
    console.error("POST user: ", err);
    res.status(500).end();
  }
}

module.exports = {
  getAllItems,
  addItem,
};
