import express from 'express';
import taskRoute from './routes/task.js';

const app = express();

app.use(express.json({}));

app.use(taskRoute);

app.listen(3000, () => console.log(`Server started at \n${new Date().toLocaleString()} \nand is up at port 3000`));
