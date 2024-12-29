import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { FileSystem } from '../entity/FileSystem';

async function seedDatabase() {
    try {
        const dataSource = await AppDataSource.initialize();
        const fileRepo = dataSource.getRepository(FileSystem);

        console.log('Seeding database...');

        // Create root folders
        const rootFolder1 = fileRepo.create({ name: 'Root Folder 1', type: 'folder' });
        const rootFolder2 = fileRepo.create({ name: 'Root Folder 2', type: 'folder' });
        await fileRepo.save([rootFolder1, rootFolder2]);

        // Add files to Root Folder 1
        const file1 = fileRepo.create({ name: 'File 1.txt', type: 'file', parent: rootFolder1 });
        const file2 = fileRepo.create({ name: 'File 2.txt', type: 'file', parent: rootFolder1 });
        await fileRepo.save([file1, file2]);

        // Add a subfolder to Root Folder 1
        const subFolder = fileRepo.create({ name: 'Sub Folder 1', type: 'folder', parent: rootFolder1 });
        await fileRepo.save(subFolder);

        // Add a file to Sub Folder 1
        const file3 = fileRepo.create({ name: 'Sub File 1.txt', type: 'file', parent: subFolder });
        await fileRepo.save(file3);

        console.log('Database seeding completed!');
        await dataSource.destroy();
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase();
