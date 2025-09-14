import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const UserSchema = new Schema({
    id: { type: String },
    username: { type: String, required: true },
    name: { type: String },
    password: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
    lastModified: { type: Date, default: () => new Date() },
});
const User = mongoose.model('User', UserSchema, 'user');
export { User };
