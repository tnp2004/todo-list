const todoBox = document.querySelector(".todo-space");
const clearAllTasksBtn = document.querySelector(".clearAllTasks");
let allTasks = [];
let completedTasksArr = [];

const addTaskToArr = () => {
    let boxsColor = document.querySelector(".color-input").value;
    let tasks = document.querySelector(".input-task").value;
    totalTasks(tasks, boxsColor)
    clearInput();
    if (tasks) addToDoList();
}

const addToDoList = () => {
    todoBox.innerHTML = '';
    for (task of allTasks) {
        console.log(allTasks)
        const todoElement = document.createElement("div");
        todoElement.classList.add("parent-box", "border", "border-1", "p-3", "w-100", "d-flex", "justify-content-between");
        todoElement.style.backgroundColor = task[1]; // color

        const taskElement = document.createElement("div");
        taskElement.classList.add("task-name", "my-auto");
        taskElement.innerHTML = task[0]; // task name

        const deleteBtnElement = document.createElement("div");
        deleteBtnElement.classList.add("delete", "fw-bold", "fs-5")
        deleteBtnElement.innerHTML = "X";

        todoElement.append(taskElement, deleteBtnElement);
        todoBox.prepend(todoElement);

        doDelete(deleteBtnElement, task);
        completedTasks(taskElement)
    }
}

const completedTasks = (task) => {
    task.addEventListener("click", () => {
        task.classList.toggle("completed");
    })
}

const doDelete = (deleteBtnElement, tasks) => {
    deleteBtnElement.addEventListener("click", () => {
        deleteBtnElement.parentNode.remove();

        // delete data in array
        allTasks.findIndex(task => {
            if (task === tasks) {
                allTasks.splice(allTasks.indexOf(task), 1);
                totalTasks();
            }
        });
    })
}

const clearAllTasks = () => {
    allTasks = []
    totalTasks();
    addToDoList();
}

const totalTasks = (task, color) => {
   if (task && color) {
        const taskObj = [task, color];
        allTasks.push(taskObj);
   }
   
   // tasks counter
   let tasksCounter = allTasks.length;
   document.querySelector(".todo-total").innerHTML = tasksCounter + " tasks left";
}

const clearInput = () => {
    let tasks = document.querySelector(".input-task")
    tasks.value = '';
}

document.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        addTaskToArr();
    } 
})

clearAllTasksBtn.addEventListener("click", clearAllTasks)