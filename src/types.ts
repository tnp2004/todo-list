interface Todo {
    id: number
    todo: string
    done: boolean
}

type filter = "all" | "todo" | "completed"