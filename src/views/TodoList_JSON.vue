<template>
  <div>
    <h1>Todo List</h1>
    <input
      class="typeBar"
      v-model="newTodo"
      placeholder="Add a new todo"
      @keyup.enter="addTodo"
    />
    <button class="add" @click="addTodo">Add</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" />
        <input
          type="text"
          v-if="editingTodoId === todo.id"
          v-model="todo.title"
          @blur="updateTodo(todo)"
          @keyup.enter="updateTodo(todo)"
        />
        <span
          v-else
          :class="{ active: todo.completed }"
          @click="editTodo(todo)"
          >{{ todo.title }}</span
        >
        <!-- <button class="editBtn" @click="editTodo(todo)">Edit</button> -->
        <button
          v-if="editingTodoId === todo.id"
          class="removeBtn"
          @click="deleteTodo(todo.id)"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newTodo: "",
      todos: [],
      editingTodoId: null,
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    fetchTodos() {
      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((response) => {
          this.todos = response.data;
        });
    },
    addTodo() {
      if (this.newTodo.trim() === "") return;

      axios
        .post("https://jsonplaceholder.typicode.com/todos", {
          userId: 1,
          title: this.newTodo,
          completed: false,
        })
        .then((response) => {
          this.todos.push(response.data);
          this.newTodo = "";
        });
    },
    editTodo(todo) {
      this.editingTodoId = todo.id;
    },
    updateTodo(todo) {
      axios
        .put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
          title: todo.title,
          completed: todo.completed,
        })
        .then(() => {
          this.editingTodoId = null;
        });
    },
    deleteTodo(id) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(() => {
          this.todos = this.todos.filter((todo) => todo.id !== id);
        });
    },
  },
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
  margin: 0.5rem 0;
  input {
    margin: 0;
    font-size: 1rem;
    padding: 0;
    border: none;
    outline: none;
  }
  input[type="checkbox"] {
    margin: 0 0.5rem;
  }
  input[type="text"] {
    width: 20rem;
    font-size: 1rem;
    color: green;
  }

  button {
    width: 3rem;
    &.editBtn {
      color: var(--primary-blue);
    }
    &.removeBtn {
      color: var(--error-red);
    }
  }

  .active {
    text-decoration: line-through;
    opacity: 0.3;
  }
}
</style>
