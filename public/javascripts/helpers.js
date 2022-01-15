// const { disabled } = require("express/lib/application");

//Varaibles for View Items button
let isTableOpen = false;
const viewItemsBtn = document.querySelector("#view-inventory");
const itemsTableWrapper = document.querySelector("#items-table-wrapper");
const itemsTable = document.querySelector("#items-table-body");
const itemsEndpoint = "http://localhost:3000/view-items";

//Variables for add item form
const addItemBtn = document.querySelector("#add-item");
const addItemFormWrapper = document.querySelector("#add-item-form-wrapper");
const addItemForm = document.querySelector("#add-item-form");

//Displays items table on screen
async function showInventoryOnClick() {
  //If table is already visible, hide table and rename button.
  if (isTableOpen) {
    //add d-none class to display table
    itemsTableWrapper.classList.add("d-none");
    viewItemsBtn.innerHTML = "View Inventory";
    isTableOpen = false;
  } else {
    // clear table if currently populated
    itemsTable.innerHTML = "";

    // get list of users
    const response = await fetch(itemsEndpoint);
    const items = await response.json();

    //convert prices from cents to dollars
    items.forEach((item) => {
      let wPriceCentValue = item.w_unit_price;
      item.w_unit_price = (wPriceCentValue / 100).toFixed(2);

      let rPriceCentValue = item.r_unit_price;
      item.r_unit_price = (rPriceCentValue / 100).toFixed(2);
    });

    // generate row for each item
    items.forEach((item) => {
      const row = document.createElement("tr");
      for (const [key, value] of Object.entries(item)) {
        const cell = document.createElement("td");
        cell.innerText = value;
        row.appendChild(cell);
      }
      row.addEventListener("click", highlightRow);
      itemsTable.appendChild(row);
    });

    //Remove d-none class to display table
    itemsTableWrapper.classList.remove("d-none");

    //Change view item button name
    viewItemsBtn.innerHTML = "Hide Inventory";
    isTableOpen = true;
  }
}

//Toggles the display for the add-items form
function showAddItemsForm() {
  //make add items form visible
  addItemFormWrapper.classList.remove("d-none");
}

//Highlight table row on click and mark it as selected for the edit and delete buttons
function highlightRow() {
  //Remove "table-primary" class from all rows
  let tableRows = document.querySelectorAll("#items-table-body tr");
  tableRows.forEach((e) => e.classList.remove("table-primary"));

  //Add "table-primary" class to selected row
  this.classList.add("table-primary");

  //get data in cells
  let itemID = this.cells[0].innerHTML;
  let itemName = this.cells[1].innerHTML;
  let productCat = this.cells[2].innerHTML;
  let supplierID = this.cells[3].innerHTML;
  let wPrice = this.cells[4].innerHTML;
  let rPrice = this.cells[5].innerHTML;
  let warehouse = this.cells[6].innerHTML;

  //Add value of selected items to edit and delete forms
  let itemIDInputs = document.querySelectorAll(".item-id-input");
  itemIDInputs.forEach((i) => (i.value = itemID));
  document.querySelector("#edit-sel-name").value = itemName;
  document.querySelector("#edit-sel-cat").value = productCat;
  document.querySelector("#edit-sel-sup").value = supplierID;
  document.querySelector("#edit-sel-wp").value = wPrice;
  document.querySelector("#edit-sel-rp").value = rPrice;
  document.querySelector("#edit-sel-wa").value = warehouse;
}

//Opens Add Warehouse form when 'other' selected in warehouse dropdown of Add Item form
function checkOtherSelected(elValue) {
  if (elValue == "other") {
    document
      .querySelector("#add-warehouse-form-wrapper")
      .classList.remove("d-none");
    alert("Please add the new warehouse before adding a new item");
  }
}

//Populate dropdown options for warehouses select in Add Items form
async function populateWarehousesSelect() {
  let warehousesDropdown = document.querySelector("#warehouse-dropdown");

  // clear existing options
  warehousesDropdown.innerHTML = "";

  // get list of warehouses
  const response = await fetch("http://localhost:3000/get-warehouses");
  const warehouses = await response.json();

  // generate placeholder option
  let placeholder = document.createElement("option");
  placeholder.setAttribute("value", "");
  placeholder.setAttribute("disabled", "");
  placeholder.setAttribute("selected", "");
  placeholder.setAttribute("hidden", "");
  placeholder.innerHTML = "Select a Warehouse";
  warehousesDropdown.appendChild(placeholder);

  // generate row for each item
  warehouses.forEach((w) => {
    let option = document.createElement("option");
    option.setAttribute("value", w.name);
    option.innerHTML = w.name;
    warehousesDropdown.appendChild(option);
  });

  // generate 'other' option
  let other = document.createElement("option");
  other.setAttribute("value", "other");
  other.innerHTML = "Other";
  warehousesDropdown.appendChild(other);
}

async function init() {
  viewItemsBtn.addEventListener("click", showInventoryOnClick);
  addItemBtn.addEventListener("click", showAddItemsForm);
  populateWarehousesSelect();
}

init();
