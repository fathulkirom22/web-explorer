<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <header class="modal-header">
        <h3>{{ newItem?.title }}</h3>
        <button class="close-button" @click="closeModal">×</button>
      </header>
      <div class="modal-body">
        <input v-model="name" placeholder="name" />
      </div>
      <footer class="modal-footer">
        <button @click="onCancel" :disabled="isLoading" class="cancel-button">Cancel</button>
        <button @click="onSubmit" :disabled="isLoading" class="submit-button">Create</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue';
import { useExplolerStore } from '../stores/explorer';
import { postFile } from '../api/files';

const visible = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const newItem = ref<{title: string, type: string}>()
const name = ref<string>('')

const closeModal = () => visible.value = false;
const onCancel = () => visible.value = false;
const onShow = (item: {title: string, type: string}) => {
  newItem.value = item
  visible.value = true
};
const onSubmit = async () => {
  try {
    isLoading.value = true
    const payload = {
      name: name.value,
      type: newItem.value?.type || '',
      parentId: useExplolerStore().activeFolder 
    }
    await postFile(payload)
    useExplolerStore().getFiles()
    useExplolerStore().getRootFiles();
    closeModal()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
};

defineExpose({
  onShow
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-header h3 {
  margin: 0;
}

.close-button {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  width: 100%;
  margin-bottom: 20px;
}

.modal-body input {
  box-sizing: border-box;
  width: 100%;
  height: 2rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-button,
.submit-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button {
  background: #f0f0f0;
  color: #333;
}

.submit-button {
  background: #007bff;
  color: white;
}
</style>
