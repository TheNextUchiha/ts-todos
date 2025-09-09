import jwt from 'jsonwebtoken';
import { User } from '../model/user.js';

const { TOKEN_SECRET } = process.env;

const generateToken = async (user: User) => {
    if (!TOKEN_SECRET) throw 'No Token secret has been set!';

    const payload = { userId: user.id };

    const token = jwt.sign(payload, TOKEN_SECRET);

    return token;
};

export { generateToken };
