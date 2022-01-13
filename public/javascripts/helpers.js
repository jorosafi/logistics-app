const viewItemsBtn = document.querySelector("#view-inventory");
const itemsTableWrapper = document.querySelector("#items-table-wrapper");
const itemsTable = document.querySelector("#items-table-body");
const addItemBtn = document.querySelector("#add-item");
const addItemForm = document.querySelector("#add-item-form");
// const usersHeaders = ["username", "password", "is_gas_buyer", "is_owner", "is_admin"]
const itemsEndpoint = "http://localhost:3000/view-items";

async function handleClick() {
  // clear table if currently populated
  itemsTable.innerHTML = "";

  // get list of users
  const response = await fetch(itemsEndpoint);
  const items = await response.json();

  // generate row for each item
  items.forEach((item) => {
    const row = document.createElement("tr");
    for (const [key, value] of Object.entries(item)) {
      const cell = document.createElement("td");
      cell.innerText = value;
      row.appendChild(cell);
    }
    itemsTable.appendChild(row);
  });

  itemsTableWrapper.classList.remove("d-none");
}

async function init() {
  viewItemsBtn.addEventListener("click", handleClick);
}

init();
