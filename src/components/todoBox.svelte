<script lang="ts">
  import TodoElement from "../components/todoElement.svelte";

  export let todos: Todo[];
  export let filter: filter;

  $: todoDone = todos.filter((todo) => todo.done);
  $: todoNotDone = todos.filter((todo) => !todo.done);

  const toggleIsDone = (event: any) => {
    const { id } = event.detail;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        todos[i].done = !todos[i].done;
        break;
      }
    }
  };

  const removeTodo = (event: any) => {
    const { id } = event.detail;
    todos = todos.filter((todo) => todo.id != id);
  };
</script>

{#if todos.length !== 0}
  {#if filter === "all"}
    {#each todos as todo (todo.id)}
      <TodoElement
        on:remove={removeTodo}
        on:toggleDone={toggleIsDone}
        {...todo}
      />
    {/each}
  {:else if filter === "todo"}
    {#each todoNotDone as todo (todo.id)}
      <TodoElement
        on:remove={removeTodo}
        on:toggleDone={toggleIsDone}
        {...todo}
      />
    {/each}
  {:else if filter === "completed"}
    {#each todoDone as todo (todo.id)}
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
