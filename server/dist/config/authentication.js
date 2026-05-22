import i18next from 'i18next';
import jwt from 'jsonwebtoken';
const { JWT_EXPIRY_WINDOW, TOKEN_SECRET } = process.env;
const expiresIn = JWT_EXPIRY_WINDOW
    ? JWT_EXPIRY_WINDOW.split(' * ').reduce((acc, val) => acc * Number(val), 1)
    : 5 * 60 * 1000; // 5 mins
const generateToken = async (user) => {
    if (!TOKEN_SECRET)
        throw i18next.t('error.unavailable.tokenSecret');
    const payload = { userId: user.id };
    const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn });
    return token;
};
export { generateToken };
