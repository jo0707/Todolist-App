const taskInput = document.getElementById("taskInput") as HTMLInputElement
const addTaskButton = document.getElementById("addTaskBtn") as HTMLButtonElement
const taskList = document.getElementById("taskList") as HTMLUListElement
const filterSelect = document.getElementById("filterSelect") as HTMLSelectElement

// {text: "task1", completed: false}
// {text: "task2", completed: true}
interface Task {
    text: string
    completed: boolean
}

let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]")
var filteredTasks: Task[]

const renderTasks = (): void => {
    taskList.innerHTML = ""
    const filter: string = filterSelect.value

    if (filter === "all") {
        filteredTasks = tasks
    } else if (filter === "complete") {
        filteredTasks = tasks.filter((task) => task.completed)
    } else {
        filteredTasks = tasks.filter((task) => !task.completed)
    }

    filteredTasks.forEach((task, index) => {
        taskList.appendChild(createListElement(task, index))
    })
}

function createListElement(task: Task, index: number): HTMLLIElement {
    const li: HTMLLIElement = document.createElement("li")
    li.textContent = task.text
    li.classList.add("task")

    if (task.completed) li.classList.add("completed")

    const statusContainer: HTMLDivElement = document.createElement("div")
    statusContainer.classList.add("status-container")

    const completedBtn: HTMLButtonElement = document.createElement("button")
    completedBtn.textContent = task.completed ? "Ulangi" : "Selesai"

    const deleteBtn: HTMLButtonElement = document.createElement("button")
    deleteBtn.textContent = "Hapus"

    const editBtn: HTMLButtonElement = document.createElement("button")
    editBtn.textContent = "Edit"

    completedBtn.addEventListener("click", () => toggleCompleted(index))
    deleteBtn.addEventListener("click", () => deleteTask(index))
    editBtn.addEventListener("click", () => editTask(index))

    statusContainer.appendChild(completedBtn)
    statusContainer.appendChild(deleteBtn)
    statusContainer.appendChild(editBtn)

    li.appendChild(statusContainer)
    return li
}

const toggleCompleted = (index: number) => {
    tasks[index].completed = !tasks[index].completed
    saveTasks()
    renderTasks()
}

const addTask = (): void => {
    const taskText: string = taskInput.value.trim()
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false })
        taskInput.value = ""
        saveTasks()
        renderTasks()
    }
}

function deleteTask(index: number) {
    tasks.splice(index, 1)
    saveTasks()
    renderTasks()
}

function editTask(index: number) {
    const newText: string | null = prompt("Edit task", tasks[index].text)
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim()
        saveTasks()
        renderTasks()
    }
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

addTaskButton.addEventListener("click", addTask)
filterSelect.addEventListener("change", renderTasks)
taskInput.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key === "Enter") addTask()
})

renderTasks()
