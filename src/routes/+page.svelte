<script lang="ts">
  import TodoElement from "../components/todoElement.svelte";
  import "../app.css";

  let inputValue = "";
  let filter = "all";
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
  $: todoDone = todos.filter((todo) => todo.done);
  $: todoNotDone = todos.filter((todo) => !todo.done);

  const addTodo = () => {
    const data = {
      id: todos.length + 1,
      todo: inputValue,
      done: false,
    };
    todos = [data, ...todos];
    inputValue = "";
  };

  const toggleIsDone = (event: any) => {
    const { id } = event.detail;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        todos[i].done = !todos[i].done
        break
      }
    }
  };

  const removeTodo = (event: { detail: { id: any } }) => {
    const { id } = event.detail;
    todos = todos.filter((todo) => todo.id != id);
  };
</script>

<div class="h-screen bg-slate-800 flex items-center justify-center">
  
  <div class="w-96 pt-5 drop-shadow-2xl bg-slate-900 bg-opacity-40">
    <h1 class="text-2xl text-center text-white font-bold">Todo list</h1>
    <div class="text-center my-4 mx-auto px-5">
      <div class="flex my-2">
        <input
          bind:value={inputValue}
          class="w-full rounded-l-sm p-1"
          placeholder="what you need to do ..."
          type="text"
        />
        <button
          on:click={() => (inputValue === "" ? "" : addTodo())}
          class="bg-slate-700 text-white font-bold p-1 rounded-r-sm">ADD</button
        >
      </div>

      <div
        class="flex bg-slate-800 text-slate-600 bg-opacity-70 h-10 rounded-t-xl overflow-hidden font-bold"
      >
        <button
          class={`w-1/4 ${filter == "all" ? "bg-sky-500 text-white" : ""}`}
          on:click={() => (filter = "all")}>all</button
        >
        <button
          class={`w-1/4 ${filter == "todo" ? "bg-sky-500 text-white" : ""}`}
          on:click={() => (filter = "todo")}>todo</button
        >
        <button
          class={`w-1/4 ${
            filter == "completed" ? "bg-sky-500 text-white" : ""
          }`}
          on:click={() => (filter = "completed")}>completed</button
        >
        <button class="w-1/4" on:click={() => (todos = [])}>clear</button>
      </div>
      <div class="bg-slate-700 bg-opacity-20 rounded-b h-96 p-1">
        {#if todos.length !== 0}
          {#if filter === "all"}
            {#each todos as todo, i (todo.id)}
              <TodoElement
                on:remove={removeTodo}
                on:toggleDone={toggleIsDone}
                {...todo}
              />
            {/each}
          {:else if filter === "todo"}
            {#each todoNotDone as todo, i (todo.id)}
              <TodoElement
                on:remove={removeTodo}
                on:toggleDone={toggleIsDone}
                {...todo}
              />
            {/each}
          {:else if filter === "completed"}
            {#each todoDone as todo, i (todo.id)}
              <TodoElement
                on:remove={removeTodo}
                on:toggleDone={toggleIsDone}
                {...todo}
              />
            {/each}
          {/if}
        {:else}
          <h2 class="font-bold text-slate-600">no todo</h2>
        {/if}
      </div>
    </div>
  </div>
</div>
