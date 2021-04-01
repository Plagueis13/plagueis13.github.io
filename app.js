const locale = new Locale(),
item = document.getElementById('item'),
price = document.getElementById('price'),
reward = document.getElementById('reward'),
pointsPer = document.getElementById('pointsPer'),
table = document.getElementById('cfaTable'),
filter = document.getElementById('filterMenu'),
changeBtn = document.getElementById('changeBtn'),
resetBtn = document.getElementById('resetBtn');
document.addEventListener("DOMContentLoaded", fillTable);
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

changeForm.addEventListener("submit", (e) => {
  const uiLocale = document.querySelector('input:checked'),
  localeValue = uiLocale.value;
  localeCity = uiLocale.dataset.city;
  localStorage.setItem('locale', localeValue);
  localStorage.setItem('city', localeCity);
  $("#locModal").modal("hide");
  fillTable();
  e.preventDefault();
});

// resetBtn.addEventListener("click", () => {
//   let newRows = document.querySelectorAll(`#cfaTable>tr`);
//   newRows.forEach(row => {
//     row.classList.remove('d-none');
//   })
//   sortTable(3);

// });
filter.addEventListener('click', (e) => {
  filterType(e);
  });

async function fillTable() {
  locale.getLocationData();
  changeBtn.innerText = locale.city;
  const downloadData = await locale.downloadItems();
  table.innerHTML='';
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
  table.appendChild(tr);
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
  if(e.target.id === "breakfast") {
    let newRows = document.querySelectorAll(`.Breakfast`);
    newRows.forEach(row => {
      row.classList.remove('d-none');
    })
  } else if(e.target.id === "entrees") {
    let newRows = document.querySelectorAll(`.ENTREES_GROUP`);
    newRows.forEach(row => {
      row.classList.remove('d-none');
    })
  } else if(e.target.id === "sides") {
    let newRows = document.querySelectorAll(`.SIDES_GROUP`);
    newRows.forEach(row => {
      row.classList.remove('d-none');
    })
  } else if(e.target.id === "treats") {
    let newRows = document.querySelectorAll(`.DESSERTS_GROUP`);
    newRows.forEach(row => {
      row.classList.remove('d-none');
    })
  } else if(e.target.id === "beverages") {
    let newRows = document.querySelectorAll(`.BEVERAGES_GROUP`);
    newRows.forEach(row => {
      row.classList.remove('d-none');
    })
  } else if(e.target.id === "all") {
    let newRows = document.querySelectorAll(`#cfaTable>tr`);
    newRows.forEach(row => {
      row.classList.remove('d-none');
    })
  }
  sortTable(3);
}