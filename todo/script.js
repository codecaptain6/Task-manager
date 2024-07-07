const historyBox = document.querySelector(".history-box");
const inputname = document.querySelector("#inputname");
const inputdate = document.querySelector("#inputdate");
const history = document.querySelector(".history");
const add = document.querySelector(".add");
const table = document.querySelector(".table table");
const cancel = document.querySelector("#cancel");

history.addEventListener("click", () => {
  historyBox.style.transform = "scale(1)";
});

cancel.addEventListener("click", () => {
  historyBox.style.transform = "scale(0)";
});

add.addEventListener("click", () => {
  const name = inputname.value;
  const date = inputdate.value;
  
  if (name && date) {
    const newtr = document.createElement("tr");
    newtr.innerHTML = `
      <td class="cross">${name}</td>
      <td class="cross">${date}</td>
      <td><button class="delete">remove</button></td>
      <td><button class="complete">complete</button></td>
    `;
    table.appendChild(newtr);
    inputname.value = "";
    inputdate.value = "";
  }
});

let list = []
table.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const row = e.target.closest('tr');
    const name = row.cells[0].textContent;
    const date = row.cells[1].textContent;
    
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.innerHTML = `
      <span>${name}</span>
      <span>${date}</span>
    `;
    historyBox.appendChild(historyItem);
    
    list.push({ name, date });
    row.remove();
    console.log(list);
    console.log("helloo");
  }
  else if(e.target.classList.contains('complete')) {
    const row = e.target.closest('tr');
    const cells = row.querySelectorAll('td:not(:last-child)');
    cells.forEach(cell => {
      cell.style.textDecoration = 'line-through';
    });
  }
});
historyBox.addEventListener('click', (e) => {
  if (e.target.classList.contains('restore')) {
    const historyItem = e.target.closest('.history-item');
    const name = historyItem.querySelector('span:first-child').textContent;
    const date = historyItem.querySelector('span:last-child').textContent;
    
    const newtr = document.createElement("tr");
    newtr.innerHTML = `
      <td class="cross">${name}</td>
      <td class="cross">${date}</td>
      <td><button class="delete">remove</button></td>
      <td><button class="complete">complete</button></td>
    `;
    table.appendChild(newtr);
    historyItem.remove();
  }
});