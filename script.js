const inputItem = document.getElementById("item-input");
const add = document.querySelector(".add");
const list_items = document.querySelector(".list-items ul");

let items = JSON.parse(localStorage.getItem("items") || "[]");
let celebrationShown = false; 

inputItem.focus();

add.addEventListener("click", () => {
  if (inputItem.value.trim() === "") return;

  const newItem = {
    text: inputItem.value,
    checked: false,
    id: Date.now(),
    starred: false,
  };

  items.push(newItem);
  localStorage.setItem("items", JSON.stringify(items));

  inputItem.value = "";
  renderItems();
  inputItem.focus();
});
inputItem.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    add.click();
  }
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
      <i class="bi ${
        item.starred ? "bi-star-fill fill" : "bi-star"
      }" data-id="${item.id}"></i>
    `;
    list.appendChild(icons);
    list_items.appendChild(list);

    const checkbox = itemDiv.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      item.checked = checkbox.checked;
      localStorage.setItem("items", JSON.stringify(items));
      checkAllCompleted();
    });
  });
}
function checkAllCompleted() {
  if (items.length > 0 && items.every((item) => item.checked)) {
    if (!celebrationShown) {
      celebrationShown = true; 
      setTimeout(() => {
        celebrate();
      }, 10);
    }
  } else {
    celebrationShown = false; 
  }
}

//trash
list_items.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-trash3")) {
    const id = e.target.dataset.id;
    items = items.filter((item) => item.id != id);
    localStorage.setItem("items", JSON.stringify(items));
    renderItems();
    checkAllCompleted();
  }
});
//edit
list_items.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-pencil-square")) {
    const id = e.target.dataset.id;
    const itemIndex = items.findIndex((item) => item.id == id);
    if (itemIndex !== -1) {
      const item = items[itemIndex];
      items.splice(itemIndex, 1);
      localStorage.setItem("items", JSON.stringify(items));
      renderItems();
      inputItem.value = item.text;
      inputItem.focus();
    }
  }
});
//star
list_items.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("bi-star") ||
    e.target.classList.contains("bi-star-fill")
  ) {
    const id = e.target.dataset.id;
    const itemIndex = items.findIndex((item) => item.id == id);
    if (itemIndex !== -1) {
      const item = items[itemIndex];
      item.starred = !item.starred;
      localStorage.setItem("items", JSON.stringify(items));
      renderItems();
    }
  }
});
window.addEventListener("load", renderItems);
