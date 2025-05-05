let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Open and close modal
function openModal() {
  document.getElementById("task-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("task-modal").style.display = "none";
  document.getElementById("task-name").value = "";
  document.getElementById("task-desc").value = "";
}

// Add new task
function addTask() {
  const name = document.getElementById("task-name").value.trim();
  const desc = document.getElementById("task-desc").value.trim();

  if (!name) {
    alert("Task title is required");
    return;
  }

  tasks.push({ name, desc, status: "undone" });
  saveTasks();
  closeModal();
  renderTasks();
}

// Set filter and re-render
function setFilter(type) {
  currentFilter = type;
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const index = ["all", "done", "undone"].indexOf(type);
  document.querySelectorAll(".filter-btn")[index].classList.add("active");
  renderTasks();
}

// Render tasks based on filter
function renderTasks() {
  const container = document.getElementById("task-list");
  container.innerHTML = "";

  const filteredTasks = tasks.filter(
    (task) => currentFilter === "all" || task.status === currentFilter
  );

  if (filteredTasks.length === 0) {
    container.innerHTML = "<p class='empty'>No tasks to show</p>";
    return;
  }

  filteredTasks.forEach((task, i) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";

    taskEl.innerHTML = `
      <div class="text">
        <h4>${task.name}</h4>
        <p>${task.desc}</p>
      </div>
      <div class="actions">
        <button class="btn-check" onclick="markDone(${i})"><i class="fa fa-check"></i></button>
        <button class="btn-edit" onclick="editTask(${i})"><i class="fa fa-edit"></i></button>
        <button class="btn-undo" onclick="markUndone(${i})"><i class="fa fa-rotate-left"></i></button>
        <button class="btn-delete" onclick="deleteTask(${i})"><i class="fa fa-trash"></i></button>
      </div>
    `;
    container.appendChild(taskEl);
  });
}

// Task actions
function markDone(index) {
  tasks[index].status = "done";
  saveTasks();
  renderTasks();
}

function markUndone(index) {
  tasks[index].status = "undone";
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newName = prompt("Edit task title:", tasks[index].name);
  const newDesc = prompt("Edit task description:", tasks[index].desc);

  if (newName !== null) tasks[index].name = newName.trim();
  if (newDesc !== null) tasks[index].desc = newDesc.trim();

  saveTasks();
  renderTasks();
}

// Initialize on page load
renderTasks();

// let todos = [];
// // localStorage
// if (localStorage.getItem("todos")) {
//   todos = JSON.parse(localStorage.getItem("todos"));

// }
// function saveTodos() {
//   localStorage.setItem("todos", JSON.stringify(todos));
// }

// //for modal
// function openModal() {
//     document.getElementById("modal").style.display = "flex";
// }
// function closeModal() {
// document.getElementById("modal").style.display = "none";
// document.getElementById("task-name").value = "";
// document.getElementById("task-desc").value = "";
// }
// //Add To_Dos
// function addTodo() {
//     const name = document.getElementById("task-name").value.trim();
//     const desc = document.getElementById("task-desc").value.trim();
//     if (!name) return alert("Pleas enter the name");

//     todos.push({ name, desc, status: 'undone' });
//     saveTodos();
//     renderTodos();
//     closeModal();
// }
// function renderTodos(filter = 'all') {
//     const list = document.getElementById("tasks");
//     list.innerHTML = "";
//     todos.forEach((todo, i) => {
//         if (filter !== 'all' && todo.status !== filter) return;

//         const div = document.createElement("div");
//         div.className = "task";

//         div.innerHTML = `
//                 <div class="text">
//                     <h4>${todo.name}</h4>
//                     <p>${todo.desc}</p>
//                 </div>
//                 <div class="btn">
//                     <button onclick="markDone(${i})" class="success"><i class="fa-solid fa-check"></i></button>
//                     <button onclick="editTodo(${i})" class="Inconceivable" style="background-color:green !important;"><i class="fa-solid fa-edit"></i></button>
//                     <button onclick="markUndone(${i})" class="btn btn-blue"><i class="fa-solid fa-x"></i></button>
//                     <button onclick="deleteTodo(${i})" class="Inconceivable" style="background-color:red !important;"><i class="fa-solid fa-trash"></i></button>
//                 </div>
//         `;
//         list.appendChild(div);
//     });
// }
// function markDone(index) {
//   todos[index].status = 'done';
//   saveTodos();
//   renderTodos();
// }

// function markUndone(index) {
//   todos[index].status = 'undone';
//   saveTodos();
//   renderTodos();
// }

// function deleteTodo(index) {
//   todos.splice(index, 1);
//   saveTodos();
//   renderTodos();
// }

// function editTodo(index) {
//   const newName = prompt("Edit Name Task:", todos[index].name);
//   const newDesc = prompt("Edit Desc Task:", todos[index].desc);
//   if (newName !== null) todos[index].name = newName.trim();
//   if (newDesc !== null) todos[index].desc = newDesc.trim();
//   saveTodos();
//   renderTodos();
// }
// function filterTodos(type) {
//   document.querySelectorAll(".filter-btn").forEach((btn) => {
//     btn.classList.remove("active");
//   });
//   if(type == "all"){
//     let btn = document.querySelector(".all");
//     btn.classList.add("active");
//     renderTodos(type);
//   }
//   else if(type == "done"){
//     let btn = document.querySelector(".success");
//     btn.classList.add("active");
//     renderTodos(type);
//   }
//   else if(type == "undone"){
//     let btn = document.querySelector(".Inconceivable");
//     btn.classList.add("active");
//     renderTodos(type);
//   }
// }
// renderTodos();
