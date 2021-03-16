document.addEventListener("DOMContentLoaded", fillTable);
const item = document.getElementById('item'),
price = document.getElementById('price'),
reward = document.getElementById('reward'),
pointsPer = document.getElementById('pointsPer'),
filter = document.getElementById('filter'),
resetBtn = document.getElementById('resetBtn');
item.addEventListener("click", function() {
  console.log('hello');
  clickSort(1)
});
price.addEventListener("click", function() {
  console.log('hello');
  clickSort(1)
});
reward.addEventListener("click", function() {
  console.log('hello');
  clickSort(2)
});
pointsPer.addEventListener("click", function() {
  console.log('hello');
  clickSort(3)
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

function fillTable() {
  downloadItems()
  .then((downloadData) => {
    downloadData.forEach(jsonReader);
  })
  // .then(sortTable);
  // .then(paintTable);
}

function jsonReader(item, index) {
  let category;
  if(item.dayPart==="Breakfast"){
    category = item.dayPart;
  } else {
    category = item.itemType;
  };
  document.getElementById("cfaTable").innerHTML += `
    <tr class ="${category}">
        <td class="align-middle">${item.name}</td>
        <td class="align-middle">${item.price}</td>
        <td class="align-middle">${item.points}</td>
        <td class="align-middle">${(item.points/item.price).toFixed(2)}</td>
      </tr>`;
}

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("cfaTable");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[3];
      y = rows[i + 1].getElementsByTagName("TD")[3];
      // Check if the two rows should switch place:
      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function clickSort(n) {
  console.log("hello");
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("cfaTable");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc" && (n=0)) {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc" && (n=0)) {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir =='asc') {
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir =='desc') {
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
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
  sortTable();
}