<script lang="ts">
  import { fly } from "svelte/transition";
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

  const removeTodo = (id: number) => {
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
            {#each todos as { id, todo, done }, i (id)}
              <button
                on:click={() => todos[i].done = !todos[i].done}
                transition:fly
                class="bg-slate-700 bg-opacity-80 px-2 my-1 w-full flex items-center justify-center align-middle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" zoomAndPan="magnify" viewBox="0 0 30 30.000001" height="30" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="id1"><path d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#id1)"><path fill={done ? "#0ea5e9" : "#1e293b"} d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 " fill-opacity="1" fill-rule="nonzero"/></g></svg>
                <h2 class="text-xl text-white font-bold w-full">{todo}</h2>
                <button
                  on:click={() => removeTodo(id)}
                  class="text-slate-800 hover:text-sky-400 font-bold px-1"
                  >X</button
                >
              </button>
            {/each}
          {:else if filter === "todo"}
            {#each todoNotDone as { id, todo, done }, i (id)}
            <button
            on:click={() => todos[i].done = !todos[i].done}
            transition:fly
            class="bg-slate-700 bg-opacity-80 px-2 my-1 w-full flex items-center justify-center align-middle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" zoomAndPan="magnify" viewBox="0 0 30 30.000001" height="30" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="id1"><path d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#id1)"><path fill={done ? "#0ea5e9" : "#1e293b"} d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 " fill-opacity="1" fill-rule="nonzero"/></g></svg>
            <h2 class="text-xl text-white font-bold w-full">{todo}</h2>
            <button
              on:click={() => removeTodo(id)}
              class="text-slate-800 hover:text-sky-400 font-bold px-1"
              >X</button
            >
          </button>
            {/each}
          {:else if filter === "completed"}
            {#each todoDone as { id, todo, done }, i (id)}
            <button
            on:click={() => todos[i].done = !todos[i].done}
            transition:fly
            class="bg-slate-700 bg-opacity-80 px-2 my-1 w-full flex items-center justify-center align-middle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" zoomAndPan="magnify" viewBox="0 0 30 30.000001" height="30" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="id1"><path d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#id1)"><path fill={done ? "#0ea5e9" : "#1e293b"} d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 " fill-opacity="1" fill-rule="nonzero"/></g></svg>
            <h2 class="text-xl text-white font-bold w-full">{todo}</h2>
            <button
              on:click={() => removeTodo(id)}
              class="text-slate-800 hover:text-sky-400 font-bold px-1"
              >X</button
            >
          </button>
            {/each}
          {/if}
        {:else}
          <h2 class="font-bold text-slate-600">no todo</h2>
        {/if}
      </div>
    </div>
  </div>
</div>
