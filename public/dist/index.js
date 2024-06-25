const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterSelect = document.getElementById("filterSelect");
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
var filteredTasks;
const renderTasks = () => {
    taskList.innerHTML = "";
    const filter = filterSelect.value;
    if (filter === "all") {
        filteredTasks = tasks;
    }
    else if (filter === "complete") {
        filteredTasks = tasks.filter((task) => task.completed);
    }
    else {
        filteredTasks = tasks.filter((task) => !task.completed);
    }
    filteredTasks.forEach((task, index) => {
        taskList.appendChild(createListElement(task, index));
    });
};
function createListElement(task, index) {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.classList.add("task");
    if (task.completed)
        li.classList.add("completed");
    const statusContainer = document.createElement("div");
    statusContainer.classList.add("status-container");
    const completedBtn = document.createElement("button");
    completedBtn.textContent = task.completed ? "Ulangi" : "Selesai";
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    completedBtn.addEventListener("click", () => toggleCompleted(index));
    deleteBtn.addEventListener("click", () => deleteTask(index));
    editBtn.addEventListener("click", () => editTask(index));
    statusContainer.appendChild(completedBtn);
    statusContainer.appendChild(deleteBtn);
    statusContainer.appendChild(editBtn);
    li.appendChild(statusContainer);
    return li;
}
const toggleCompleted = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
};
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    }
};
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}
function editTask(index) {
    const newText = prompt("Edit task", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
addTaskButton.addEventListener("click", addTask);
filterSelect.addEventListener("change", renderTasks);
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter")
        addTask();
});
renderTasks();
export {};
//# sourceMappingURL=index.js.map