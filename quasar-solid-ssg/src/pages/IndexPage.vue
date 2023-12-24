<template>
  <q-page class="row items-center justify-evenly">
    <example-component title="Example component" active :todos="todos" :meta="meta"></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { ref } from 'vue';

import { useSessionStore } from 'solid-helper-vue';  // Uncomment this line results in SSG build failure due to circular object (if missing dependency), or Pinia undefined
// import { useSessionStore } from '../stores/session';  // Uncomment this line it works correctly. This store is the exact copy from the library.

const sessionStore = useSessionStore();

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1'
  },
  {
    id: 2,
    content: 'ct2'
  },
  {
    id: 3,
    content: 'ct3'
  },
  {
    id: 4,
    content: 'ct4'
  },
  {
    id: 5,
    content: 'ct5'
  }
]);
const meta = ref<Meta>({
  totalCount: 1200
});
</script>
