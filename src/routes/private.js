import express, { json } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/listar-usuarios', async (req, res) => {
    try {
        const user = await prisma.user.findMany();
        res.status(200).json({ messege: 'Usuários listados com sucesso!', user });

    } catch (err) { 
        res.status(500).json({messege: 'Falha no servidor. Tente novamente mais tarde.'});
    }
    
})

export default router;