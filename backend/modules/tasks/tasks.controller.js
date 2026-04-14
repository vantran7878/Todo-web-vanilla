import * as tasksService from "./tasks.service.js"


export const getAllTasks = async (req, res) => {
    try {
        const tasks = tasksService.getAllTasks();
        res.status(200).json({
            success: true,
            tasks: tasks
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        })
    }

}

export const getTask = async (req, res) => {
    try {
        const task = tasksService.getTask(req.params.id);
        res.status(200).json({
            success: true,
            task: task
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        })
    }

}

export const addTask = async (req, res) => {
    try {
        const added_task = tasksService.createTask(req.body) 
        if (!added_task) 
            res.status(500).json({
                success: false,
                message: "Internal server error: cannot add task"
            })
        res.status(200).json({
            success: true,
            added_task: added_task
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        })
    }

}

export const updateTask = async (req, res) => {
    try {
        const updated_task = tasksService.updateTask()
        if (!updated_task) 
            res.status(500).json({
                success: false,
                message: "Internal server error: cannot update task"
            })
        res.status(200).json({
            success: true,
            updated_task: updated_task 
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        })
    }

}

export const deleteTask = async (req, res) => {
    try {
        const deleted_task = tasksService.deleteTask()
        if (!deleted_task) 
            res.status(500).json({
                success: false,
                message: "Internal server error: cannot delete task"
            })
        res.status(200).json({
            success: true,
            deleted_task: deleted_task 
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        })
    }

}