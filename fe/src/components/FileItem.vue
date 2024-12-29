<template>
  <li @click="$emit('select', item)">
    📄 {{ item.name }}
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { FileSystemItem } from '../interfaces/FileSystemItem'

export default defineComponent({
  name: 'FileItem',
  props: {
    item: {
      type: Object as () => FileSystemItem,
      required: true,
    },
  },
});
</script>

<style scoped>
li {
  list-style-type: none;
  cursor: pointer;
}
</style>
