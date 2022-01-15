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
    let wUnitPrice = req.body.wPrice * 100;
    let rUnitPrice = req.body.rPrice * 100;
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
    res.redirect("/");
    // res.render("index");
  } catch (err) {
    console.error("POST user: ", err);
    res.status(500).end();
  }
}

// delete item
function deleteItem(req, res) {
  const { itemID } = req.body;
  const query = "DELETE FROM inventory WHERE item_id = $1";
  model
    .query(query, [itemID])
    .then((resolve) => {
      // res.render("index");
      res.redirect("/");
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

//Edit item
function editItem(req, res) {
  const itemID = req.body.itemID;
  const itemName = req.body.itemName;
  const category = req.body.category;
  const supplierID = req.body.supplierID;
  const wPrice = req.body.wPrice * 100;
  const rPrice = req.body.rPrice * 100;
  const warehouse = req.body.warehouse;
  const query =
    "UPDATE public.inventory SET item_name = $2, category = $3, supplier_id = $4, w_unit_price = $5, r_unit_price = $6, warehouse = $7 WHERE item_id = $1";

  model
    .query(query, [
      itemID,
      itemName,
      category,
      supplierID,
      wPrice,
      rPrice,
      warehouse,
    ])
    .then((resolve) => {
      res.redirect("/");
      // res.render("index");
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

module.exports = {
  getAllItems,
  addItem,
  deleteItem,
  editItem,
};
