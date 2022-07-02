const todoBox = document.querySelector(".todo-space");
let allTasks = [];

const addToDoList = () => {
    let boxsColor = document.querySelector(".color-input").value;
    let tasks = document.querySelector(".input-task").value;

   if (tasks) {
        const todoElement = document.createElement("div");
        todoElement.classList.add("border", "border-1", "p-3", "w-100", "d-flex", "justify-content-between");
        todoElement.style.backgroundColor = boxsColor;

        const taskElement = document.createElement("div");
        taskElement.classList.add("my-auto");
        taskElement.innerHTML = tasks;

        const deleteBtnElement = document.createElement("div");
        deleteBtnElement.classList.add("delete", "fw-bold", "fs-5")
        deleteBtnElement.innerHTML = "X";

        todoElement.append(taskElement, deleteBtnElement);
        todoBox.prepend(todoElement);

        totalTasks(tasks)
        clearInput();
   }
}

const totalTasks = (task) => {
   if (task) {
        allTasks.push(task);
   }
   let tasksCounter = allTasks.length;
   document.querySelector(".todo-total").innerHTML = tasksCounter + " tasks left";
}

const clearInput = () => {
    let tasks = document.querySelector(".input-task")
    tasks.value = '';
}

document.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        addToDoList();
    } 
})