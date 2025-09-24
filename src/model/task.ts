import mongoose, { Model, Schema } from 'mongoose';

interface ITask {
    id: number;
    userId: string;
    name: string;
    addedAt: Date;

    finished?: boolean;
    finishedAt?: Date;
}

const TaskSchema = new Schema<ITask>({
    id: { type: Number },
    userId: { type: String },
    name: { type: String },
    addedAt: { type: Date, default: () => new Date() },

    finished: { type: Boolean, default: false },
    finishedAt: { type: Date },
});

const Task: Model<ITask> = mongoose.model<ITask>('Task', TaskSchema, 'task');

export { Task };
export type { ITask };
