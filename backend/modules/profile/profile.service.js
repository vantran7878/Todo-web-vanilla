import * as profileModel from "./profile.model.js"
import * as tasksModel from "../tasks/tasks.model.js"

export const getProfileByID = async(id) => {
    const profile = profileModel.findProfileByID(id);

    if (!profile) throw new Error("No profile info");

    return profile;
}

export const getProfileTasksSummary = async(id) => {
    const total = tasksModel.countTasks(id);
    const immediate = tasksModel.countImmediateTasks(id);
    const completed = tasksModel.countCompletedTasks(id);
    const deadline = tasksModel.getNearestDeadline(id);

    return {
        total,
        immediate,
        completed,
        deadline
    };
}