const todoInput = document.getElementById("todoInput");
const btnSubmit = document.getElementById("btnSubmit");
const listContainer = document.querySelector(".list-group");
const totalItemsContainer = document.querySelector(".totalItemsContainer");

const todoItems = [];

//------------------------------------------------ Events

btnSubmit.addEventListener("click", () => {
  addTodo(todoInput.value);
  countItems();
});

todoInput.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    addTodo(todoInput.value);
    countItems();
  }
});

//------------------------------------------------ Services
function addTodo(todoName) {
  console.log("PANJANG KATA", todoName.length);

  if (todoName.length < 4 || todoName.length == 25) {
    alert("Todo name minimal character is 4 and maximal character is 25");
    return;
  }

  let data = {
    id: todoItems.length + 1,
    todoName: todoName,
    completed: "false",
  };

  todoItems.push(data);

  load();
}

function load() {
  listContainer.innerHTML = "";
  todoItems.forEach((val) => {
    console.log(val);

    //---------------------------------------------- TO DO li
    const li = document.createElement("li");
    li.className = "list-group-item shadow-sm d-flex align-items-center justify-content-between";

    //---------------------------------------------- DIV BUTTON
    const divBtnContainer = document.createElement("div");
    divBtnContainer.className = "d-flex gap-2";

    //----------------------------------------------- Button
    const completeBtn = createBtn("success");
    const editBtn = createBtn("warning");
    const deleteBtn = createBtn("danger");

    //------------------------------------------------ Icon
    const completedIcon = createIcon("bi-check2-all");
    const editIcon = createIcon("bi-pencil");
    const deleteIcon = createIcon("bi-journal-x");

    completeTask(completeBtn, val);
    editTask(editBtn, val);

    //----------------------------------------------- Pasangkan button dan icon
    //--------------- completed
    completeBtn.appendChild(completedIcon);
    //--------------- edit
    editBtn.appendChild(editIcon);
    //---------------- delete
    deleteBtn.appendChild(deleteIcon);

    divBtnContainer.appendChild(completeBtn);
    divBtnContainer.appendChild(editBtn);
    divBtnContainer.appendChild(deleteBtn);

    li.innerHTML = val.todoName;

    li.appendChild(divBtnContainer);
    listContainer.appendChild(li);
  });

  todoInput.value = null;
}

function completeTask(button, value) {
  button.addEventListener("click", () => {
    value.completed = "true";
    if (value.completed) {
      const name = value.todoName;
      value.todoName = `<del>${name}</del>`;
      load();
    }
  });
}

function editTask(button, value) {
  button.addEventListener("click", () => {
    const editedName = prompt("Input New Todo Name: ");
    value.todoName = editedName;

    load();
  });
}

function countItems() {
  const count = todoItems.length;

  let totalItems = document.querySelector("#totalItems");

  if (!totalItems) {
    totalItems = document.createElement("p");
    totalItems.id = "totalItems";
    totalItems.className = "mb-0";

    const spanItems = document.createElement("span");
    spanItems.id = "spanItems";
    spanItems.className = "badge bg-primary fw-bold";
    spanItems.innerText = count;

    totalItems.innerHTML = "Total item: ";
    totalItems.appendChild(spanItems);

    totalItemsContainer.appendChild(totalItems);
  } else {
    document.querySelector("#spanItems").innerText = count;
  }
}

//------------------------------------------------ Utils
function createBtn(btnType) {
  //success || warning || danger
  const btn = document.createElement("button");
  btn.className = `btn btn-outline-${btnType} btn-sm`;
  return btn;
}

function createIcon(iconName) {
  const icon = document.createElement("i");
  icon.className = `bi ${iconName}`;
  return icon;
}

//1. implementasikan menggunakan Array sebuah penampung datanya
//2. lengkapi untuk feature completedm delete todo
//  - completed : todo name menjadi strike
//  - deleted : todo terhapus dan tambahan konfirmasi bisa menggunakan confirmation
// pakai confirm temennya alert
//3. validasi todo name minimal 4 karakter maksimal 25 karakter
