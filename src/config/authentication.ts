import i18next from 'i18next';
import jwt from 'jsonwebtoken';

import type { IUser } from '../model/user.js';
import type { Request } from 'express';

const { JWT_EXPIRY_WINDOW, TOKEN_SECRET } = process.env;

interface JWTPayload {
    userId: string;
}

const expiresIn: number = JWT_EXPIRY_WINDOW
    ? JWT_EXPIRY_WINDOW.split(' * ').reduce<number>((acc, val) => acc * Number(val), 1)
    : 5 * 60 * 1000; // 5 mins

const generateToken = async (user: IUser) => {
    if (!TOKEN_SECRET) throw i18next.t('error.unavailable.tokenSecret');

    const payload: JWTPayload = { userId: user.id };

    const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn });

    return token;
};

export { generateToken };
export type { JWTPayload };
export interface AuthRequest extends Request {
    user?: JWTPayload;
}
