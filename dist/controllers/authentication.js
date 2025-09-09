import { User } from '../model/user.js';
const signUp = async (req, res) => {
    const { id, password } = req.body;
    let user;
    try {
        user = await User.findOne({ id });
    }
    catch (err) {
        return res.status(500).json({ error: err, message: 'An error occurred while fetching user details.' });
    }
    if (!user) {
        return res.status(404).json({ message: 'No suck user exists.' });
    }
    if (user.comparePasswords(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};
