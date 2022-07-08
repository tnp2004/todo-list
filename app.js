const todoBox = document.querySelector(".todo-space");
const clearAllTasksBtn = document.querySelector(".clearAllTasks");
const completedBtn = document.querySelector(".completedTasks");
const allTasksBtn = document.querySelector(".allTasks");

let allTasks = [];
let completedTasksArr = [];

const addTaskToArr = () => {
    let boxsColor = document.querySelector(".color-input").value;
    let tasks = document.querySelector(".input-task").value;
    let isCompleted = false
    totalTasks(tasks, boxsColor, isCompleted)
    clearInput();
    if (tasks) addToDoList();
}

const addToDoList = () => {
    console.log(allTasks)
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

        console.log(task[2])
        if (task[2]) {
            task.classList.add("completed")
        }
        todoElement.append(taskElement, deleteBtnElement);
        todoBox.prepend(todoElement);

        doDelete(deleteBtnElement, task);
        completedTasks(taskElement)
    }
}

const completedTasks = (task) => {
    task.addEventListener("click", () => {
        task.classList.toggle("completed");
        let completedtask = [task.innerHTML, task.parentNode.style.backgroundColor, false];
        completedTasksArr.push(completedtask);
        console.log(completedTasksArr)
    })
}

const showCompletedTasks = () => {
    todoBox.innerHTML = '';
    let tasksCounter = completedTasksArr.length;
    document.querySelector(".todo-total").innerHTML = tasksCounter + " tasks left";
    completedTasksArr.forEach(task => {
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
    completedTasksArr = []
    totalTasks();
    addToDoList();
}

const showAllTasks = () => {
    addToDoList();
    let tasksCounter = allTasks.length;
    document.querySelector(".todo-total").innerHTML = tasksCounter + " tasks left";
}

const totalTasks = (task, color, isCompleted) => {
   if (task && color) {
        const taskObj = [task, color, isCompleted];
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

completedBtn.addEventListener("click", showCompletedTasks)
clearAllTasksBtn.addEventListener("click", clearAllTasks)
allTasksBtn.addEventListener("click", showAllTasks)