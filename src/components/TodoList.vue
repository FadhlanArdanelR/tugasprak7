<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold text-center mb-4">Todo List</h1>
    <div class="flex justify-center mb-4">
      <input v-model="newTask" @keyup.enter="addTask" placeholder="Add a new task" 
             class="w-1/2 p-2 border rounded-l-md focus:outline-none" />
      <button @click="addTask" class="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
        Add
      </button>
    </div>
    <div class="flex justify-center mb-4">
      <button @click="setFilter('all')" 
              :class="['p-2', filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200']">All</button>
      <button @click="setFilter('unfinished')" 
              :class="['p-2 ml-2', filter === 'unfinished' ? 'bg-blue-500 text-white' : 'bg-gray-200']">Unfinished</button>
      <button @click="setFilter('finished')" 
              :class="['p-2 ml-2', filter === 'finished' ? 'bg-blue-500 text-white' : 'bg-gray-200']">Finished</button>
    </div>
    <transition-group name="list" tag="ul" class="space-y-2">
      <li v-for="(task, index) in filteredTasks" :key="task.id" 
          class="flex items-center justify-between p-2 border rounded-md">
        <div class="flex items-center">
          <input type="checkbox" v-model="task.completed" @change="toggleTask(task.id)" class="mr-2" />
          <span :class="{ 'line-through': task.completed, 'text-gray-500': task.completed }">{{ task.text }}</span>
        </div>
        <button @click="removeTask(task.id)" class="bg-red-500 text-white p-1 rounded hover:bg-red-600">
          Delete
        </button>
      </li>
    </transition-group>
    <p class="text-center mt-4">Unfinished Tasks: {{ unfinishedTasks }}</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useTodoStore } from '../stores/todoStore';

export default {
  setup() {
    const newTask = ref('');
    const todoStore = useTodoStore();
    const filter = ref('all');

    const addTask = () => {
      if (newTask.value.trim()) {
        todoStore.addTask(newTask.value.trim());
        newTask.value = '';
      }
    };

    const removeTask = (id) => {
      todoStore.removeTask(id);
    };

    const toggleTask = (id) => {
      todoStore.toggleTask(id);
    };

    const setFilter = (newFilter) => {
      filter.value = newFilter;
    };

    const filteredTasks = computed(() => {
      if (filter.value === 'unfinished') {
        return todoStore.tasks.filter(task => !task.completed);
      } else if (filter.value === 'finished') {
        return todoStore.tasks.filter(task => task.completed);
      } else {
        return todoStore.tasks;
      }
    });

    return {
      newTask,
      tasks: todoStore.tasks,
      unfinishedTasks: todoStore.unfinishedTasks,
      addTask,
      removeTask,
      toggleTask,
      filter,
      setFilter,
      filteredTasks
    };
  }
};
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>