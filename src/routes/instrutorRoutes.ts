import { Router, Request, Response } from 'express';
import prisma from '../prismaClient';
 
const router = Router();
 
 
router.post('/', async (req: Request, res: Response) => {
    try {
        const { nome, email } = req.body;
        if (!nome || !email) {
            return res.status(400).json({ error: "Nome e email são obrigatórios" });
        }
 
        const instrutor = await prisma.instrutor.create({
            data: { nome, email }
        });
 
        res.status(201).json(instrutor);
    } catch (error) {
        console.error("Erro ao cadastrar instrutor", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
 
 
router.get('/', async (req: Request, res: Response) => {
    try {
        const instrutores = await prisma.instrutor.findMany();
        res.status(200).json(instrutores);
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
 
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const instrutor = await prisma.instrutor.findUnique({
            where: { id: Number(id) }
        });
 
        if (!instrutor) return res.status(404).json({ error: "Instrutor não encontrado" });
        res.status(200).json(instrutor);
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
 
 
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nome, email } = req.body;
 
        const instrutor = await prisma.instrutor.update({
            where: { id: Number(id) },
            data: { nome, email }
        });
 
        res.status(200).json(instrutor);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar instrutor" });
    }
});
 
 
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.instrutor.delete({
            where: { id: Number(id) }
        });
 
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover instrutor" });
    }
});
 
export default router;