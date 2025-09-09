import type { Request, Response } from 'express';

interface Task {
    id: number;
    name: string;
    addedAt: Date;

    finished: boolean;
    finishedAt?: Date;
}

let count: number = 0;

const tasks: Task[] = [];

const listTasks = async (req: Request, res: Response) => {
    return res.json(tasks);
};

const addTask = async (req: Request, res: Response) => {
    const { name } = req.body;

    const task: Task = {
        id: ++count,
        name,
        addedAt: new Date(),
        finished: false,
    };

    tasks.push(task);

    return res.json(tasks);
};

const completeTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    let task = tasks.filter(t => t.id === Number(id))[0];

    if (!task) {
        return res.status(404).json({ message: 'No such task found.' });
    }

    task.finished = true;
    task.finishedAt = new Date();

    return res.json(tasks);
};

const removeTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    const index: number = tasks.findIndex(t => t.id === Number(id));

    if (index < 0) {
        return res.status(404).json({ message: 'No such task found.' });
    }

    tasks.splice(index, 1);

    return res.json(tasks);
};

export { listTasks, addTask, completeTask, removeTask };
