import jwt from 'jsonwebtoken';
import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../config/authentication.js';
import type { JWTPayload } from '../config/authentication.js';

const { TOKEN_SECRET } = process.env;

const validateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!TOKEN_SECRET) throw req.t('error.unavailable.tokenSecret');

    if (!req.headers['authorization']) {
        return res.status(401).json({ message: req.t('Your JWT is missing') });
    }

    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: req.t('Your JWT is missing') });
    }

    let decoded: JWTPayload;

    try {
        decoded = jwt.verify(token, TOKEN_SECRET) as JWTPayload;
    } catch (err) {
        return res.status(401).json({ message: 'An error occurred while decoding your JWT.' });
    }

    req.user = decoded;

    return next();
};

export { validateToken };
