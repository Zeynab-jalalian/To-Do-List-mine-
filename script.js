const inputItem = document.getElementById("item-input");
const add = document.querySelector(".add");
const list_items = document.querySelector(".list-items ul");

let items = JSON.parse(localStorage.getItem("items") || "[]");

add.addEventListener("click", () => {
  if (inputItem.value.trim() === "") return;

  const newItem = {
    text: inputItem.value,
    checked: false,
    id: Date.now(),
  };

  items.push(newItem);
  localStorage.setItem("items", JSON.stringify(items));

  inputItem.value = "";
  renderItems();
});

function renderItems() {
  list_items.innerHTML = "";
  items.forEach((item) => {
    const list = document.createElement("li");
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    const checkboxId = "checkbox-" + item.id;

    itemDiv.innerHTML = `
      <input type="checkbox" id="${checkboxId}" ${
      item.checked ? "checked" : ""
    }/>
      <label for="${checkboxId}">${item.text}</label>
    `;

    list.appendChild(itemDiv);

    const icons = document.createElement("div");
    icons.className = "icons";
    icons.innerHTML = `
      <i class="bi bi-trash3" data-id="${item.id}"></i>
      <i class="bi bi-pencil-square" data-id="${item.id}"></i>
      <i class="bi bi-star" data-id="${item.id}"></i>
    `;
    list.appendChild(icons);
    list_items.appendChild(list);

    const checkbox = itemDiv.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      item.checked = checkbox.checked;
      localStorage.setItem("items", JSON.stringify(items));
    });
  });
}

window.addEventListener("load", renderItems); 
