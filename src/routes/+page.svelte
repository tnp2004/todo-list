<script lang="ts">
  import "../app.css";
  import TodoBox from "../components/todoBox.svelte";
  import TodoInput from "../components/todoInput.svelte";

  let filter: filter = "all";
  let todos: Todo[] = [
    {
      id: 1,
      todo: "feed a cat",
      done: false,
    },
    {
      id: 2,
      todo: "coding",
      done: true,
    },
  ];

  const addTodo = (event: any) => {
    const { todo } = event.detail;
    const data = {
      id: todos.length + 1,
      todo,
      done: false,
    };
    todos = [data, ...todos];
  };

</script>

<header>
  <title>ToDoList</title>
</header>

<div  class="h-screen bg-slate-800 flex items-center justify-center">
  <div class="w-full h-screen sm:w-96 sm:h-auto sm:rounded-xl pt-5 drop-shadow-2xl bg-slate-900 bg-opacity-95">
    <h1 class="text-2xl text-center text-white font-bold">ToDoList</h1>
    <div class="text-center my-4 mx-auto px-5">
      <TodoInput on:add={addTodo} />
      <div
        class="flex bg-slate-800 text-slate-600 bg-opacity-70 h-10 rounded-t-xl overflow-hidden font-bold mt-3">
        <button
          class:filterTodo={filter == "all"}
          class="w-1/4"
          on:click={() => (filter = "all")}>all</button
        >
        <button
          class:filterTodo={filter == "todo"}
          class="w-1/4"
          on:click={() => (filter = "todo")}>todo</button
        >
        <button
          class:filterTodo={filter == "completed"}
          class="w-1/4"
          on:click={() => (filter = "completed")}>completed</button
        >
        <button class="w-1/4" on:click={() => (todos = [])}>clear</button>
      </div>
      <div class="bg-slate-700 bg-opacity-20 rounded-b h-96 p-1 overflow-y-auto">
        <TodoBox todos={todos} filter={filter} />
      </div>
    </div>
  </div>
</div>
