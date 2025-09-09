import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const UserSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    password: { type: String },
    createdAt: { type: Date, default: () => new Date() },
    lastModified: { type: Date, default: () => new Date() },
});
UserSchema.methods.comparePasswords = (input, savedPassword) => {
    return bcrypt.compareSync(input, savedPassword);
};
const User = mongoose.model('User', UserSchema, 'user');
export { User };
