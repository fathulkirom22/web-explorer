<template>
    <div class="sidebar">
        <FileExplorer />
    </div>
</template>

<script lang="ts" setup>
import FileExplorer from './FileExplorer.vue';

</script>

<style scoped>
.sidebar {
    width: 200px;
    background: #f7f7f7;
    padding: 10px;
    border-right: 1px solid #ccc;
    overflow-y: auto;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 5px 10px;
    cursor: pointer;
    transition: background 0.2s;
}

li:hover {
    background: #e0e0e0;
}
</style>
