import { v4 as uuidV4 } from 'uuid';

import { Task } from '../model/task.js';

import type { AuthRequest } from '../config/authentication.js';
import type { Response } from 'express';

const listTasks = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: req.t('error.authentication.loginToContinue') });
    }

    let tasks;

    try {
        tasks = await Task.find({ userId: req.user.userId });
    } catch (err) {
        return res.status(500).json({ error: err, message: req.t('error.retrieving.task.multiple') });
    }

    return res.json(tasks);
};

const addTask = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'error.authentication.loginToContinue' });
    }

    const { name } = req.body;

    const task = new Task({
        id: uuidV4(),
        name,
        userId: req.user.userId,
        addedAt: new Date(),
        finished: false,
    });

    try {
        await task.save();
    } catch (err) {
        return res.status(500).json({ error: err, message: req.t('error.creating.task') });
    }

    return res.json(task);
};

const completeTask = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'error.authentication.loginToContinue' });
    }

    const { id } = req.params;

    let task;

    try {
        task = await Task.findOne({ id, userId: req.user.userId });
    } catch (err) {
        return res.status(500).json({ message: req.t('error.retrieving.task.single') });
    }

    if (!task) {
        return res.status(404).json({ message: req.t('error.unavailable.task.single') });
    }

    task.finished = true;
    task.finishedAt = new Date();

    try {
        await task.save();
    } catch (err) {
        return res.status(500).json({ message: req.t('error.saving.task') });
    }

    return res.json(task);
};

const removeTask = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'error.authentication.loginToContinue' });
    }

    const { id } = req.params;

    let task;

    try {
        task = await Task.deleteOne({ id, userId: req.user.userId });
    } catch (err) {
        return res.status(500).json({ message: req.t('error.deleting.tasks.single') });
    }

    if (task.deletedCount <= 0) {
        return res.status(404).json({ message: req.t('error.unavailable.task.single') });
    }

    return res.json({ message: req.t('success.task.deleted.single') });
};

export { listTasks, addTask, completeTask, removeTask };
