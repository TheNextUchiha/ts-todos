import bcrypt from 'bcryptjs';

const validatePasswords = (inputPassword: string, hashedPassword: string) => {
    return bcrypt.compareSync(inputPassword, hashedPassword);
};

export { validatePasswords };
