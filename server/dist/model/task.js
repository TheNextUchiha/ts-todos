import mongoose, { Model, Schema } from 'mongoose';
const TaskSchema = new Schema({
    id: { type: Number },
    userId: { type: String },
    name: { type: String },
    addedAt: { type: Date, default: () => new Date() },
    finished: { type: Boolean, default: false },
    finishedAt: { type: Date },
});
const Task = mongoose.model('Task', TaskSchema, 'task');
export { Task };
