import bcrypt from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';
import { User } from '../model/user.js';
import { validatePasswords } from '../utilities/validators.js';
import { generateToken } from '../config/authentication.js';
const signUp = async (req, res) => {
    const { username, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ username });
    }
    catch (err) {
        return res.status(500).json({ error: err, message: 'An error occurred while fetching user details.' });
    }
    if (existingUser) {
        return res.status(404).json({ message: 'User already exists.' });
    }
    let user = new User({ id: uuidV4(), username });
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
    }
    catch (err) {
        return res.status(500).json({ error: err, message: 'Error signing up the user' });
    }
    let token;
    try {
        token = await generateToken(user);
    }
    catch (err) {
        return res.status(500).json({ error: err, message: 'Error generating token.' });
    }
    return res.json({ token });
};
const logIn = async (req, res) => { };
export { signUp, logIn };
