<template>
    <div class="explorer-layout">
        <Toolbar />
        <div class="content">
            <Sidebar />
            <FileGrid />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from './Sidebar.vue';
import Toolbar from './Toolbar.vue';
import FileGrid from './FileGrid.vue';

export default defineComponent({
    name: 'ExplorerLayout',
    components: {
        Sidebar,
        Toolbar,
        FileGrid,
    },
});
</script>

<style scoped>
.explorer-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.content {
    display: flex;
    flex: 1;
}

</style>
