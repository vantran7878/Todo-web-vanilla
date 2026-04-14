import * as tasksModel from "./tasks.model.js"

// passthrough -> no async/await
export const getAllTasks = (user_id) => {
    return tasksModel.findAllTasks(user_id);
}

export const getTask = (id) => {
    const task = tasksModel.findTask(id);

    if (!task) {
        throw new Error("Task not found");
    }

    return task;
}

export const createTask = async(data) => { 
    const existing_task = tasksModel.findTaskByName(data.name);
    if (existing_task) {
        throw new Error("Task name existed")
    }
    const new_task = tasksModel.insertTask(data.user_id, data);
    return new_task;
}

export const updateTask = async(id, data) => {
    const existing_task = tasksModel.findTaskByName(data.name);
    if (!existing_task) {
        throw new Error("Task not found");
    }

    const updated_task = tasksModel.updateTask(id, data);
    return updated_task;
}

export const deleteTask = async(id) => {
    const existing_task = tasksModel.findTaskByName(data.name);
    if (!existing_task) {
        throw new Error("Task not found");
    }

    const deleted_task = tasksModel.deleteTask(id);
    return deleted_task;
}