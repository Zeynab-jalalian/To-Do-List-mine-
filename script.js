const inputItem = document.getElementById("item-input");
const add = document.querySelector(".add");
const list_items = document.querySelector(".list-items ul");

add.addEventListener("click", () => {
  if (inputItem.value.trim() === "") return;
  const list = document.createElement("li");
  const itemDiv = document.createElement("div");
  itemDiv.className = "item";
  const checkboxId = "checkbox-" + new Date().getTime();
  itemDiv.innerHTML = `
    <input type="checkbox" id="${checkboxId}"/>
    <label for="${checkboxId}">${inputItem.value}</label>
    `;
  list.appendChild(itemDiv);
  const icons = document.createElement("div");
  icons.className = "icons";
  icons.innerHTML = `
      <i class="bi bi-trash3"></i>
      <i class="bi bi-pencil-square"></i>
      <i class="bi bi-star"></i>
    `;
  list.appendChild(icons);
  list_items.appendChild(list);
});
