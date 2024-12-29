import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeParent, TreeChildren } from 'typeorm';

@Entity({ name: 'file_system' })
@Tree('closure-table')
export class FileSystem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 255 })
    type!: string; // 'file' or 'folder'

    @TreeChildren()
    childrens!: FileSystem[];

    @TreeParent()
    parent!: FileSystem;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}
