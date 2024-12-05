import Tasks from '../models/todoListModel.js';

export const list_all_tasks = async (req, res) => {
    try {
        const tasks = await Tasks.find({});
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const create_a_task = async (req, res) => {
    const new_task = new Tasks(req.body);
    try {
        const task = await new_task.save();
        res.json(task);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const read_a_task = async (req, res) => {
    try {
        const task = await Tasks.findById(req.params.taskId);
        res.json(task);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const update_a_task = async (req, res) => {
    try {
        const task = await Tasks.findOneAndUpdate(
            { _id: req.params.taskId },
            req.body,
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const delete_a_task = async (req, res) => {
    try {
        await Tasks.deleteOne({ _id: req.params.taskId });
        res.json({ message: 'Task successfully deleted' });
    } catch (err) {
        res.status(500).send(err);
    }
};
