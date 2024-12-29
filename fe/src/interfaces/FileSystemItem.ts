export interface FileSystemItem {
    id: number;
    name: string;
    type: 'folder' | 'file';
    childrens?: FileSystemItem[];
}