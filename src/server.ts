import express from 'express';
import instrutorRoutes from './routes/instrutorRoutes';
import cursoRoutes from './routes/cursoRoutes';
 
const app = express();
app.use(express.json());
 
 
app.use('/instrutores', instrutorRoutes);
app.use('/cursos', cursoRoutes);
 
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));