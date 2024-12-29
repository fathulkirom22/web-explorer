<template>
    <ModalNewItem ref="modalRef" />
    <div class="toolbar">
        <button @click="goHome">Home</button>
        <button @click="createFile">New File</button>
        <button @click="createFolder">New Folder</button>
        <Breadcrumb />
    </div>
</template>

<script lang="ts" setup>
import Breadcrumb from './Breadcrumb.vue';
import ModalNewItem from './ModalNewItem.vue';
import { useExplolerStore } from '../stores/explorer';
import { ref } from 'vue';

const modalRef = ref<any>(null);
const goHome = () => {
    useExplolerStore().setActiveFolder({id: 0, name: 'Home', type: 'folder'});
};
const createFile = () => modalRef.value.onShow({
    title: 'New File',
    type: 'file'
});
const createFolder = () => modalRef.value.onShow({
    title: 'New Folder',
    type: 'folder'
});
</script>

<style scoped>
.toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #f0f0f0;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    cursor: pointer;
}
</style>
