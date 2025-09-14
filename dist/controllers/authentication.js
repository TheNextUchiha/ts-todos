import bcrypt from 'bcryptjs';
import { v4 as uuidV4, validate } from 'uuid';
import { User } from '../model/user.js';
import { validatePasswords } from '../utilities/validators.js';
import { generateToken } from '../config/authentication.js';
const signUp = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: req.t('error.general.requiredDataMissing') });
    }
    let existingUser;
    try {
        existingUser = await User.findOne({ username });
    }
    catch (err) {
        return res.status(500).json({ error: err, message: req.t('error.retrieving.userDetails.single') });
    }
    if (existingUser) {
        return res.status(404).json({ message: req.t('error.inUse.username') });
    }
    let user = new User({ id: uuidV4(), username });
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
    }
    catch (err) {
        return res.status(500).json({ error: err, message: req.t('error.saving.user') });
    }
    let token;
    try {
        token = await generateToken(user);
    }
    catch (err) {
        return res.status(500).json({ error: err, message: req.t('error.generating.token') });
    }
    return res.json({ token });
};
const logIn = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: req.t('error.general.requiredDataMissing') });
    }
    let user;
    try {
        user = await User.findOne({ username });
    }
    catch (err) {
        return res.status(500).json({ message: req.t('error.retrieving.userDetails.single') });
    }
    if (!user) {
        return res.status(404).json({ message: req.t('error.unavailable.user') });
    }
    if (!validatePasswords(password, user.password)) {
        return res.status(401).json({ message: req.t('error.invalid.credentials') });
    }
    let token;
    try {
        token = await generateToken(user);
    }
    catch (err) {
        return res.status(500).json({ message: req.t('error.generating.token') });
    }
    return res.json({ token });
};
export { signUp, logIn };
