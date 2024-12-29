<template>
  <div id="app">
    <ExplorerLayout />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExplorerLayout from './components/ExplorerLayout.vue';

export default defineComponent({
  name: 'App',
  components: { 
    ExplorerLayout
  },
});
</script>
