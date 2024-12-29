import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors';
import { IsNull } from 'typeorm';
import { AppDataSource } from './data-source.js';
import { FileSystem } from './entity/FileSystem';

AppDataSource.initialize().then(() => {
  console.log('Data Source Initialized 1');
});

const app = new Elysia()
  .get('/api', async () => {
    return { message: 'Hello, Elysia! api' };
  })
  .get('/api/files', async () => {
    const repo = AppDataSource.getTreeRepository(FileSystem);
    return await repo.findTrees();
  })
  .get('/api/files/:id', async ({ params }) => {
    const id = params.id ? parseInt(params.id) : IsNull();
    const repo = AppDataSource.getTreeRepository(FileSystem);
    return await repo.find({ where: { parent: { id } }, relations: ['childrens'] });
  })
  .get('/api/files/:id/ancestors', async ({ params }) => {
    const id = params.id ? parseInt(params.id) : IsNull();
    const repo = AppDataSource.getTreeRepository(FileSystem);
    const file = await repo.findOneBy({ id });
    if (!file) {
      return [];
    }
    return await repo.findAncestors(file);
  })
  .post('/api/files', async ({ body }: { body: { name: string, type: string, parentId?: number } }) => {
    const { name, type, parentId } = body;
    const repo = AppDataSource.getRepository(FileSystem);
    const parent = parentId ? await repo.findOneBy({ id: parentId }) : null;
    const newFile = repo.create({ name, type, parent: parent || undefined });
    return await repo.save(newFile);
  })
  .put('/api/files/:id', async ({ params, body }: { params: { id: string }, body: { name: string }}) => {
    const id = parseInt(params.id);
    const { name } = body;
    const repo = AppDataSource.getRepository(FileSystem);
    await repo.update(id, { name });
    return { success: true };
  })
  .delete('/api/files/:id', async ({ params }) => {
    const id = parseInt(params.id);
    const repo = AppDataSource.getRepository(FileSystem);
    await repo.delete(id);
    return { success: true };
  });

app.use(cors()).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
