<template>
  <div>
    <h1>Todo List</h1>
    <input class="typeBar" v-model="newTodo" placeholder="Add a new list" />
    <button class="add" @click="addTodo">Add</button>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <input type="checkbox" v-model="todo.done" />

        <!-- Show todo content or input for editing -->
        <span v-if="!todo.editMode" :class="{ active: todo.done }">{{
          todo.content
        }}</span>
        <input
          class="content"
          v-else
          v-model="editedTodo"
          @keyup.enter="updateTodo(index)"
          @blur="updateTodo(index)"
        />

        <!-- Toggle edit mode button -->
        <button class="toggleEditbtn" @click="toggleEditMode(index)">
          {{ todo.editMode ? "Save" : "Edit" }}
        </button>

        <button class="remove" @click="removeTodo(index)">移除</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import axios from "axios";

const newTodo = ref("");
const todos = ref([
  {
    content: "看書",
    done: true,
    editMode: false,
    swipe: false,
  },
  {
    content: "畫畫",
    done: false,
    editMode: false,
    swipe: false,
  },
]);
const editedTodo = ref("");

const addTodo = () => {
  if (newTodo.value.trim() !== "") {
    todos.value.push({
      content: newTodo.value,
      done: false,
      editMode: false,
    });
    newTodo.value = "";
  }
};

const removeTodo = (index) => {
  todos.value.splice(index, 1);
};

const toggleEditMode = (index) => {
  todos.value[index].editMode = !todos.value[index].editMode;
  if (todos.value[index].editMode) {
    editedTodo.value = todos.value[index].content;
  }
};

const editMode = (index) => {
  todos.value[index].editMode = !todos.value[index].editMode;
};

const updateTodo = (index) => {
  if (editedTodo.value.trim() !== "") {
    todos.value[index].content = editedTodo.value;
    todos.value[index].editMode = false;
    editedTodo.value = "";
  }
};
</script>

<style scoped lang="scss">
.typeBar {
  padding: 0.5rem;
  outline: gray 1px solid;
}

.add {
  margin-left: 1rem;
  padding: 0.5rem;
  border-radius: var(--round);
  background-color: var(--error-yellow);
}
li {
  font-size: 1rem;
  margin-top: 1rem;
  span {
    display: inline-block;
    width: 10rem;
    margin: 0 0.5rem;
  }
  input {
    margin: 0;
    font-size: 1rem;
    padding: 0;
    border: none;
    outline: none;
  }

  button {
    width: 2rem;
  }
  .content {
    width: 10rem;
    margin: 0 0.5rem;
  }
  .active {
    text-decoration: line-through;
    opacity: 0.3;
  }

  .toggleEditbtn {
    color: var(--primary-blue);
  }

  .remove {
    margin-left: 1rem;
    color: var(--error-red);
    background-color: #fff;
  }
}
</style>
