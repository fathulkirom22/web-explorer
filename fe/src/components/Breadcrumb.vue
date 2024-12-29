<template>
  <nav class="breadcrumb">
    <ul>
        <li>/</li>
        <li v-for="(item, index) in breadcrumbs" :key="index">
            <span v-if="index < breadcrumbs.length - 1">
                <span>{{ item.name }}</span>
                <span class="separator">/</span>
            </span>
            <span v-else>{{ item.name }}</span>
        </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { getFilesAncestors } from '../api/files';
import { useExplolerStore } from '../stores/explorer';
import { ref, watch } from 'vue';
import type { FileSystemItem } from '../interfaces/FileSystemItem'

const breadcrumbs = ref<FileSystemItem[]>([]);

const fetchData = async () => {
    try {
        breadcrumbs.value = await getFilesAncestors(useExplolerStore().activeFolder);
    } catch (err) {
        console.error(err);
    }
};

watch(() => useExplolerStore().activeFolder, fetchData, { immediate: true });
fetchData();
</script>

<style scoped>
.breadcrumb {
  padding: 10px 0;
}

.breadcrumb ul {
  list-style: none;
  display: flex;
  gap: 5px;
  padding: 5px;
  margin: 0;
  background-color: antiquewhite;
}

.breadcrumb li {
  font-size: 14px;
}

.breadcrumb a {
  text-decoration: none;
  color: #007bff;
}

.breadcrumb .separator {
  margin: 0 5px;
}
</style>
