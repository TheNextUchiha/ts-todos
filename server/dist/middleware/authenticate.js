import jwt from 'jsonwebtoken';
const { TOKEN_SECRET } = process.env;
const validateToken = async (req, res, next) => {
    if (!TOKEN_SECRET)
        throw req.t('error.unavailable.tokenSecret');
    if (!req.headers['authorization']) {
        return res.status(401).json({ message: req.t('Your JWT is missing') });
    }
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: req.t('Your JWT is missing') });
    }
    let decoded;
    try {
        decoded = jwt.verify(token, TOKEN_SECRET);
    }
    catch (err) {
        return res.status(401).json({ message: 'An error occurred while decoding your JWT.' });
    }
    req.user = decoded;
    return next();
};
export { validateToken };
