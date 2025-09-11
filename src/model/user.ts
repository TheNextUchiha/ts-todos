import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
    id: string;
    username: string;
    name: string;
    password: string;

    createdAt: Date;
    lastModified: Date;
}

const UserSchema = new Schema<IUser>({
    id: { type: String },
    username: { type: String },
    name: { type: String },
    password: { type: String },

    createdAt: { type: Date, default: () => new Date() },
    lastModified: { type: Date, default: () => new Date() },
});

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema, 'user');

export { User };
export type { IUser };
