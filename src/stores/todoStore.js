import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    tasks: []
  }),
  getters: {
    unfinishedTasks(state) {
      return state.tasks.filter(task => !task.completed).length;
    }
  },
  actions: {
    addTask(task) {
      this.tasks.push({ id: Date.now(), text: task, completed: false });
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
    toggleTask(id) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    }
  }
});