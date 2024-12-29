<template>
    <div class="file-grid">
        <div
            v-for="file in useExplolerStore().files"
            :key="file.id"
            class="file-item"
            @click="selectFile(file)"
        >
            <div class="icon">{{ file.type === 'folder' ? '📁' : '📄' }}</div>
            <div class="name">{{ file.name }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useExplolerStore } from '../stores/explorer';
import { onMounted } from 'vue';
import type { FileSystemItem } from '../interfaces/FileSystemItem'

const selectFile = (item: FileSystemItem) => {
    useExplolerStore().setActiveFolder(item);
};

onMounted(()=> {
    useExplolerStore().getFiles();
})

</script>

<style scoped>
.file-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
    padding: 10px;
    background: #fff;
}

.file-item {
    display: flex;
    height: 100px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    transition: transform 0.2s, background 0.2s;
}

.file-item:hover {
    background: #f0f0f0;
    transform: scale(1.05);
}

.icon {
    font-size: 24px;
    margin-bottom: 5px;
}

.name {
    font-size: 14px;
    word-wrap: break-word;
}
</style>
