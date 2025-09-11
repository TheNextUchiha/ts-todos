import jwt from 'jsonwebtoken';
const { TOKEN_SECRET } = process.env;
const generateToken = async (user) => {
    if (!TOKEN_SECRET)
        throw 'No Token secret has been set!';
    const payload = { userId: user.id };
    const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn: 7 * 24 * 60 * 60 * 1000 });
    return token;
};
export { generateToken };
