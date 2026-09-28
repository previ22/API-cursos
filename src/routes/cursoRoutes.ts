import { Router, Request, Response } from 'express';
import prisma from '../prismaClient';
 
const router = Router();
 
 
router.post('/', async (req: Request, res: Response) => {
    try {
        const { titulo, descricao, instrutorId } = req.body;
        if (!titulo || !descricao || !instrutorId) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }
 
        const curso = await prisma.curso.create({
            data: { titulo, descricao, instrutorId }
        });
 
        res.status(201).json(curso);
    } catch (error) {
        console.error("Erro ao cadastrar curso", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
 
 
router.get('/', async (req: Request, res: Response) => {
    try {
        const cursos = await prisma.curso.findMany({
            include: { instrutor: true }
        });
        res.status(200).json(cursos);
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
 
 
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const curso = await prisma.curso.findUnique({
            where: { id: Number(id) },
            include: { instrutor: true }
        });
 
        if (!curso) return res.status(404).json({ error: "Curso não encontrado" });
        res.status(200).json(curso);
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
 
 
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, instrutorId } = req.body;
 
        const curso = await prisma.curso.update({
            where: { id: Number(id) },
            data: { titulo, descricao, instrutorId }
        });
 
        res.status(200).json(curso);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar curso" });
    }
});
 
 
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.curso.delete({
            where: { id: Number(id) }
        });
 
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover curso" });
    }
});
 
export default router;