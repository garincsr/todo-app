const todoInput = document.getElementById("todoInput");
const btnSubmit = document.getElementById("btnSubmit");
const listContainer = document.querySelector(".list-group");
const totalItemsContainer = document.querySelector(".totalItemsContainer");
const filterAllButton = document.getElementById("filterAll");
const filterUncompletedButton = document.getElementById("filterUncompleted");
const filterCompletedButton = document.getElementById("filterCompleted");

let todoItems = [];
let filteredItems = [...todoItems];

//------------------------------------------------ Events

btnSubmit.addEventListener("click", () => {
  addTodo(todoInput.value);
});

todoInput.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    addTodo(todoInput.value);
  }
});

filterCompletedButton.addEventListener("click", () => {
  filterCompleted();
});

filterUncompletedButton.addEventListener("click", () => {
  filterUncompleted();
});

filterAllButton.addEventListener("click", () => {
  getAll();
});

//------------------------------------------------ Services
function addTodo(todoName) {
  if (todoName.length < 4 || todoName.length == 25) {
    alert("Todo name minimal character is 4 and maximal character is 25");
    return;
  }

  let data = {
    id: todoItems.length + 1,
    todoName: todoName,
    completed: false,
  };

  todoItems.push(data);

  countItems(todoItems);
  load(todoItems);
}

function load(data) {
  listContainer.innerHTML = "";
  data.forEach((val) => {
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
    deleteTask(deleteBtn, val);

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
    value.completed = true;
    if (value.completed) {
      const name = value.todoName;
      value.todoName = `<del>${name}</del>`;
      load(todoItems);
    }
  });
}

function editTask(button, value) {
  button.addEventListener("click", () => {
    const editedName = prompt("Input New Todo Name: ");
    value.todoName = editedName;
    value.completed = false;
    load(todoItems);
  });
}

function deleteTask(button, value) {
  button.addEventListener("click", () => {
    const index = todoItems.findIndex((item) => item.id === value.id);

    if (index !== -1) {
      todoItems.splice(index, 1);
    }

    countItems(todoItems);
    load(todoItems);
  });
}

function countItems(data) {
  const count = data.length;

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

function filterCompleted() {
  if (todoItems === null) {
    alert("No Todo Task");
    return;
  }
  console.log(todoItems);

  filteredItems = todoItems.filter((item) => item.completed === true);

  countItems(filteredItems);
  load(filteredItems);
}

function filterUncompleted() {
  if (todoItems === null) {
    alert("No Todo Task");
    return;
  }
  console.log(todoItems);

  filteredItems = todoItems.filter((item) => item.completed === false);

  countItems(filteredItems);
  load(filteredItems);
}

function getAll() {
  if (todoItems === null) {
    alert("No Todo Task");
    return;
  }
  console.log(todoItems);

  countItems(filteredItems);
  load(todoItems);
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
