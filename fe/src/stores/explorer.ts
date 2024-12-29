import { defineStore } from 'pinia';
import type { FileSystemItem } from '../interfaces/FileSystemItem'
import { getFiles } from '../api/files';

export const useExplolerStore = defineStore('counter', {
    state: (): { activeFolder: number, files: FileSystemItem[], rootFiles: FileSystemItem[] } => ({
        activeFolder: 0,
        files: [],
        rootFiles: [],
    }),
    actions: {
        getRootFiles() {
            getFiles().then((res) => {
                this.rootFiles = res;
            });
        },
        getFiles() {
            getFiles(this.activeFolder).then((res) => {
                this.files = res;
            });
        },
        setActiveFolder(active: FileSystemItem) {
            if (active.type === 'folder') {
                this.activeFolder = active.id;
                this.getFiles();
            }
        },
    },
});
