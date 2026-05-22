import bcrypt from 'bcryptjs';
const validatePasswords = (inputPassword, hashedPassword) => {
    return bcrypt.compareSync(inputPassword, hashedPassword);
};
export { validatePasswords };
