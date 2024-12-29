<template>
  <li>
    <div @click="toggle">
      <span v-if="item.type === 'folder'">📁</span>
      <span v-else>📄</span>
      {{ item.name }}
    </div>
    <ul v-show="isOpen" v-if="item.childrens">
      <FolderItem
        v-for="child in item.childrens"
        :key="child.id"
        :item="child"
        @select="emit('select', $event)"
      />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { defineProps, ref, defineEmits } from 'vue';
import FolderItem from "./FolderItem.vue";
import type { FileSystemItem } from '../interfaces/FileSystemItem'

const props = defineProps<{ item: FileSystemItem }>();
const emit = defineEmits(['select']);

const isOpen = ref(false);
const toggle = () => {
  isOpen.value = !isOpen.value;
  emit('select', props.item);
};
</script>

<style scoped>
li {
  list-style-type: none;
  margin: 5px 0;
}

div {
  cursor: pointer;
}
</style>
