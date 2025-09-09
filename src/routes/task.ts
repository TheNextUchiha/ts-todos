import { Router } from 'express';
import { addTask, completeTask, listTasks, removeTask } from '../controllers/task.js';

const router = Router();

router.get('/', listTasks);

router.post('/', addTask);

router.put('/:id', completeTask);

router.delete('/:id', removeTask);

export default router;
