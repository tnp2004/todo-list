<script>
  import { createEventDispatcher } from "svelte";
  let inputValue = "";

  const dispatch = createEventDispatcher();

  const addTodo = () => {
    dispatch("add", {
      todo: inputValue,
    });
    inputValue = "";
  };
</script>

<div class="flex my-2">
  <input
    bind:value={inputValue}
    class="w-5/6 rounded-l-sm p-1 focus:outline-none text-center bg-white text-slate-800 font-bold"
    placeholder="todo . . ."
    type="text"
  />
  <button
    disabled={inputValue === ""}
    on:click={addTodo}
    class="bg-slate-700 text-white w-1/6 font-bold disabled:opacity-70 rounded-r-sm">ADD</button
  >
</div>
