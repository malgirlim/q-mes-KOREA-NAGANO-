<template>
  <div class="container">
    <pagination-component
      class="pagination-component"
      v-model="currentPage"
      :numberOfPages="numberOfPages"
    />
    <table class="table-fill">
      <thead>
        <tr>
          <th>Id</th>
          <th class="text-left">Title</th>
        </tr>
      </thead>
      <tbody class="table-hover">
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td class="text-left">{{ todo.title }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import PaginationComponent from "../components/Pagination/PaginationComponent.vue";
import { useTodosApi } from "../composables/useTodosApi";

const currentPage = ref(1);
const rowsPerPage = ref(30);

const { todos, todosAreLoading, loadTodos, numberOfPages } = useTodosApi(
  currentPage,
  rowsPerPage
);

onMounted(async () => loadTodos());
</script>

<style lang="scss"></style>
