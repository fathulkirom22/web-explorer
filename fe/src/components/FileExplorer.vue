<template>
    <div class="file-explorer">
        <ul>
            <FolderItem
                v-for="item in useExplolerStore().rootFiles"
                :key="item.id"
                :item="item"
                @select="onSelect"
            />
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { useExplolerStore } from '../stores/explorer';
import { onMounted } from 'vue';
import FolderItem from './FolderItem.vue';
import type { FileSystemItem } from '../interfaces/FileSystemItem'

const onSelect = (item: FileSystemItem) => {
    useExplolerStore().setActiveFolder(item);
}

onMounted(() => {
    useExplolerStore().getRootFiles();
});
</script>

<style scoped>
.file-explorer {
    font-family: Arial, sans-serif;
    font-size: 14px;
}
ul {
    padding: 0;
}
</style>
