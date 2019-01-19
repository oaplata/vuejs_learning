const app = new Vue({
  el: "#app",
  data() {
    return {
      todos: [],
      todo: {
        name: '',
        description: '',
        notes: '',
        responsable: '',
        done: false
      },
      notes: null
    }
  },
  mounted() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || []
  },
  computed: {
    todoIsValid: function todoIsValid() {
      return this.todo.name && this.todo.description
    },

    undone: function undone() {
      return this.todos.filter(todo => !todo.done)
    },
    done: function done() {
      return this.todos.filter(todo => todo.done)
    }
  },
  methods: {
    addTodo: function addTodo() {
      if (!this.todo.name || !this.todo.description) {
        return null
      }
      this.todo.id = this.todos.length
      this.todos.push(this.todo)
      this.resetTodo()
      localStorage.setItem("todos", JSON.stringify(this.todos))
    }, 

    resetTodo: function resetTodo() {
      this.todo = {
        name: '',
        description: '',
        notes: '',
        responsable: '',
        done: false
      }
    },

    removeTodo: function removeTodo(todo) {
      this.todos.splice(todo, 1)
      localStorage.setItem("todos", JSON.stringify(this.todos))
    },

    setNotes: function setNote(index) {
      if (this.notes === index) {
        return this.notes = null
      }
      this.notes = index
    },

    doneTodo: function doneTodo(todo, index) {
      if (todo.done) {
        todo.done = false
      } else {
        todo.done = true
      }
      this.todos[index] = todo
      localStorage.setItem("todos", JSON.stringify(this.todos))
    }
  }
})