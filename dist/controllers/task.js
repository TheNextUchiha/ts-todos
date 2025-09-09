let count = 0;
const tasks = [];
const listTasks = async (req, res) => {
    return res.json(tasks);
};
const addTask = async (req, res) => {
    const { name } = req.body;
    const task = {
        id: ++count,
        name,
        addedAt: new Date(),
        finished: false,
    };
    tasks.push(task);
    return res.json(tasks);
};
const completeTask = async (req, res) => {
    const { id } = req.params;
    let task = tasks.filter(t => t.id === Number(id))[0];
    if (!task) {
        return res.status(404).json({ message: 'No such task found.' });
    }
    task.finished = true;
    task.finishedAt = new Date();
    return res.json(tasks);
};
const removeTask = async (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(t => t.id === Number(id));
    if (index < 0) {
        return res.status(404).json({ message: 'No such task found.' });
    }
    tasks.splice(index, 1);
    return res.json(tasks);
};
export { listTasks, addTask, completeTask, removeTask };
