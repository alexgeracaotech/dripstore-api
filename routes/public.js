import express, { json } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()
const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET

// Create
router.post('/cadastro', async (req, res) => {
    try {
        const user = req.body

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)
    
        const userDB = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              password: hashPassword
            },
          })
    
        res.status(201).json(userDB)

    } catch (err) {
        res.status(500),json({messege: 'Erro no servidor. Tente novamente mais tarde.'})
    }
})

// Login
router.post('/login', async (req, res) => {
    try {
        const userInfo = req.body

        // Busca o usuário no banco de dados
        const user = await prisma.user.findUnique({where: {email: userInfo.email}})
        // Verifica de o usuário existe no banco de dados
        if (!user) {
            return res.status(404).json({messege: 'Usuário não encontrado!'})
        }

        // Compara a senha digitada com a do banco de dados
        const isMatch = await bcrypt.compare(userInfo.password, user.password)
        // Verifica se a senha está igual a do banco de dados
        if (!isMatch) {
            return res.status(400).json({messege: 'Senha inválida!'})
        }

        // Gera o token JWT
        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1min'})

        res.status(200).json(token)

    } catch (err) {
        res.status(500).json({messege: 'Erro no servidor. Tente novamente mais tarde.'})
    }
})

export default router