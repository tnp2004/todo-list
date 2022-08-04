const listsBox = document.getElementById("todolistsBox")
const btnAddList = document.getElementById("btnAddList")
const inputAddList = document.getElementById("inputAddList")

const TODOLISTS = [{title:"title 1", describe:"describe 1", created:"04/08/2022", isDone: false}]

const createElementTodoList = (title = "no title", describe = "no description") => {

    const wrapperTodo = document.createElement("a")
    wrapperTodo.classList.add("list-group-item", "list-group-item-action", "p-3")
    wrapperTodo.setAttribute("aria-current", true)
    wrapperTodo.addEventListener("click", () => {
        wrapperTodo.classList.toggle("active")
    })

    const titleTodo = document.createElement("div")
    titleTodo.classList.add("d-flex", "w-100", "justify-content-between")

    const heading = document.createElement("h5")
    heading.classList.add("mb-1")
    heading.innerHTML = title

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm")
    deleteBtn.innerHTML = "Delete"
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        // do some function to delete the list
    })

    const date = document.createElement("small")
    const getNowDate = `Created: ${new Date().getDate()}/${(new Date().getMonth() + 1)}/${new Date().getFullYear()}`
    date.innerHTML = getNowDate

    const description = document.createElement("p")
    description.classList.add("mb-1")
    description.innerHTML = describe

    titleTodo.append(heading, deleteBtn)
    wrapperTodo.append(titleTodo, description, date)
    listsBox.append (wrapperTodo)
}

createElementTodoList()