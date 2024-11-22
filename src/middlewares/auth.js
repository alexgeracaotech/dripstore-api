import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ messege: 'Acesso negado!' });
    }
    
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.id = decoded.id;
        
    } catch (err) {
        return res.status(401).json({ messege: 'Token inválido!' });
    }
    
    next();
}

export default auth;