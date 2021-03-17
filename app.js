document.addEventListener("DOMContentLoaded", fillTable);
const item = document.getElementById('item'),
price = document.getElementById('price'),
reward = document.getElementById('reward'),
pointsPer = document.getElementById('pointsPer'),
table = document.getElementById('cfaTable'),
filter = document.getElementById('filter'),
resetBtn = document.getElementById('resetBtn');
item.addEventListener("click", function() {
  sortTable(0)
});
price.addEventListener("click", function() {
  sortTable(1)
});
reward.addEventListener("click", function() {
  sortTable(2)
});
pointsPer.addEventListener("click", function() {
  sortTable(3)
});

resetBtn.addEventListener("click", () => {
  window.location.reload();
});
filter.addEventListener('change', (e) => {
  filterType(e);
  });

async function downloadItems() {
  const response = await fetch ('cfa_rewards.json');
  const responseData = await response.json();
  return responseData;
};

async function fillTable() {
  const downloadData = await downloadItems();
  downloadData.forEach(jsonReader);
  sortTable(3);
}

function jsonReader(item) {
  let category;
  if(item.dayPart==="Breakfast"){
    category = item.dayPart;
  } else {
    category = item.itemType;
  };
  let tr = document.createElement("TR");
  tr.classList.add(category,"table-light");
  tr.innerHTML = `
      <td class="align-middle">${item.name}</td>
      <td class="align-middle">${item.price}</td>
      <td class="align-middle">${item.points}</td>
      <td class="align-middle">${(item.points/item.price).toFixed(2)}</td>`
  document.getElementById("cfaTable").appendChild(tr);
}

function sortTable(n) {
  const sortedListOfRows = [...table.rows]
    .sort((a,b) => {
      let aValue,
      bValue;
      if(n===0) {
        aValue = a.children.item(n).innerHTML,
        bValue = b.children.item(n).innerHTML;
      } else {
        aValue = Number(a.children.item(n).innerHTML),
        bValue = Number(b.children.item(n).innerHTML);
      }
      return aValue > bValue ? 1 : -1
    })
    .forEach(tr => {
      table.appendChild(tr);
    });
}

function filterType(e) {
  let rows = document.querySelectorAll(`#cfaTable>tr`);
  rows.forEach(function(row){
    row.classList.add('d-none');
  })
  if(e.target.value === "Breakfast") {
    let newRows = document.querySelectorAll(`.${e.target.value}`);
    newRows.forEach(row => {
      row.classList.remove('d-none');
    })
  } else if(e.target.value === "entrees") {
    let newRows = document.querySelectorAll(`.ENTREES_GROUP`);
    newRows.forEach(row => {
      row.classList.remove('d-none');
    })
  } else if(e.target.value === "sides") {
    let newRows = document.querySelectorAll(`.SIDES_GROUP`);
    newRows.forEach(row => {
      row.classList.remove('d-none');
    })
  } else if(e.target.value === "treats") {
    let newRows = document.querySelectorAll(`.DESSERTS_GROUP`);
    newRows.forEach(row => {
      row.classList.remove('d-none');
    })
  } else if(e.target.value === "beverages") {
    let newRows = document.querySelectorAll(`.BEVERAGES_GROUP`);
    newRows.forEach(row => {
      row.classList.remove('d-none');
    })
  }
  sortTable(3);
}