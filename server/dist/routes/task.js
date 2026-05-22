import { Router } from 'express';
import { addTask, completeTask, listTasks, removeTask } from '../controllers/task.js';
import { validateToken } from '../middleware/authenticate.js';
const router = Router();
router.get('/', validateToken, listTasks);
router.post('/', validateToken, addTask);
router.put('/:id', validateToken, completeTask);
router.delete('/:id', validateToken, removeTask);
export default router;
