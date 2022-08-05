const listsBox = document.getElementById("todolistsBox")
const btnAddList = document.getElementById("btnAddList")
const inputAddList = document.getElementById("inputAddList")

const TODOLISTS = []

// constructor function
function createTodoObject (title) {
    this.title = title
    this.created = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
    this.isDone = false
}

const createElementTodoList = (todo) => {

    const wrapperTodo = document.createElement("a")
    wrapperTodo.classList.add("list-group-item", "list-group-item-action", "list-group-item-info", "p-3", "border")
    wrapperTodo.setAttribute("aria-current", true)
    wrapperTodo.addEventListener("click", () => {
        wrapperTodo.classList.toggle("active")
    })

    const titleTodo = document.createElement("div")
    titleTodo.classList.add("d-flex", "w-100", "justify-content-between")

    const heading = document.createElement("h5")
    heading.classList.add("mb-1")
    heading.innerHTML = todo.title

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm")
    deleteBtn.innerHTML = "Delete"
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        // do some function to delete the list
    })

    const date = document.createElement("small")
    date.innerHTML = `Created ${todo.created}`

   
    titleTodo.append(heading, deleteBtn)
    wrapperTodo.append(titleTodo, date)
    listsBox.append (wrapperTodo)
}

const loopCreateTodoList = () => {
    TODOLISTS.forEach(todo => {
        createElementTodoList(todo)
    })
}

const clear = () => {
    inputAddList.value = ""
    listsBox.innerHTML = ""
}

btnAddList.addEventListener("click", () => {
  if (inputAddList.value) {
    const title = inputAddList.value
    const todoObj = new createTodoObject(title)
    TODOLISTS.push(todoObj)
    clear()
    loopCreateTodoList()
  }
})