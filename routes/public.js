import express, { json } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const router = express.Router()

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

export default router