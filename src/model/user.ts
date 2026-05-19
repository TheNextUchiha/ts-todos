import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interfaces are the blueprint that the devs make for using TypeScript.
// This restricts the dev to put unwanted data and types in mongoose. Also helps with the auto-complete.
interface IUser {
    id: string;
    username: string;
    name: string;
    password: string;

    createdAt: Date;
    lastModified: Date;
}

// Schemas are DB level interfaces.
const UserSchema = new Schema<IUser>({
    id: { type: String },
    username: { type: String, required: true },
    name: { type: String },
    password: { type: String, required: true },

    createdAt: { type: Date, default: () => new Date() },
    lastModified: { type: Date, default: () => new Date() },
});

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema, 'user');

/* 
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema, 'user');
      ▲         ▲                                  ▲         ▲          ▲
      │         │                                  │         │          │
[For Your Code Editor]                        [For Mongoose]     [For MongoDB]
"Hey, this is a Model                      "Register a model    "Look specifically
that spits out IUser data."                 called 'User' using   for the 'user'
                                            this schema."        collection."
*/

export { User };
export type { IUser };
