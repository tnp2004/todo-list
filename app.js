const listsBox = document.getElementById("todolistsBox")
const btnAddList = document.getElementById("btnAddList")
const inputAddList = document.getElementById("inputAddList")
const menu = document.getElementById("menu")
const clearAll = document.getElementById("clearAll")
const done = document.getElementById("done")
const allTasks = document.getElementById("allTasks")

let TODOLISTS = []
let currentMenu = TODOLISTS

// constructor function
function createTodoObject (title) {
    this.title = title
    this.created = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
    this.isDone = false
}

const createElementTodoList = (todo) => {

    const wrapperTodo = document.createElement("a")
    wrapperTodo.classList.add("wrap-todo", "list-group-item", "list-group-item-action", "list-group-item-info", "p-3", "border", "col-12")
    wrapperTodo.setAttribute("aria-current", true)
    wrapperTodo.addEventListener("click", () => {
        wrapperTodo.classList.toggle("active")
        todo.isDone = !todo.isDone
    })
    if (todo.isDone) {
        wrapperTodo.classList.add("active")
    }

    const titleTodo = document.createElement("div")
    titleTodo.classList.add("d-flex", "w-100", "justify-content-between")

    const heading = document.createElement("h5")
    heading.classList.add("mb-1")
    heading.innerHTML = todo.title

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete-btn", "btn", "btn-danger", "btn-sm")
    deleteBtn.innerHTML = "Delete"
    deleteBtn.addEventListener("click", deleteTodo)

    const date = document.createElement("small")
    date.innerHTML = `Created ${todo.created}`

   
    titleTodo.append(heading, deleteBtn)
    wrapperTodo.append(titleTodo, date)
    listsBox.append (wrapperTodo)
}

const doneTasks = () => {
    const doneTasks = TODOLISTS.filter(todo => todo.isDone)
    return doneTasks
}

const deleteTodo = (e) => {
    e.stopPropagation()
    const targetToDelete = e.target.parentElement.children[0].innerHTML
    TODOLISTS.forEach(todo => {
        if (todo.title === targetToDelete) {
            TODOLISTS.splice(TODOLISTS.indexOf(todo), 1)
        }
    })
    loopCreateTodoList(TODOLISTS)
}

const loopCreateTodoList = (tasksStorage) => {
    clear()
    tasksStorage.forEach(todo => {
        createElementTodoList(todo)
    })
    if (tasksStorage.length === 0) {
        noTodo()
    }
}

const clear = () => {
    inputAddList.value = ""
    listsBox.innerHTML = ""
}

const noTodo = () => {
    const noTodo = document.createElement("div")
    noTodo.classList.add("no-todo", "text-center", "fs-2", "mt-5", "text-muted")
    noTodo.innerHTML = "No tasks"
    listsBox.append(noTodo)
}
noTodo()

allTasks.addEventListener("click", () => {
    currentMenu = TODOLISTS
    loopCreateTodoList(currentMenu)
})

done.addEventListener("click", () => {
    currentMenu = doneTasks()
    loopCreateTodoList(currentMenu)
})

clearAll.addEventListener("click", () => {
    TODOLISTS = []
    loopCreateTodoList(TODOLISTS)
})
btnAddList.addEventListener("click", () => {
  if (inputAddList.value) {
    const title = inputAddList.value
    const todoObj = new createTodoObject(title)
    TODOLISTS.push(todoObj)
    loopCreateTodoList(currentMenu)
  }
})