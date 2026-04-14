import {getDB} from "../../database/config.db.js"

export const countTasks = async (user_id) => {
    const db = await getDB();
    const result = await db.get(
        `
            select count(*) as count from tasks
            where user_id = ?
        `,
        [user_id]
    );

    return result.count;
}

export const countImmediateTasks = async (user_id) => {
    const db = await getDB();
    const result = db.get(
        `
            select count(*) as count from tasks 
            where user_id = ? and critical_id = 5
        `,
        [user_id]
    );

    return result.count;

}

export const countCompletedTasks = async (user_id) => {
    const db = await getDB();
    const result = await db.get(
        `
            select count(*) as count from tasks
            where user_id = ? and status_id = 2
        `,
        [user_id]
    )

    return result.count;
}

export const getNearestDeadline = async (user_id) => {
    const db = await getDB();
    const result = await db.get(
        `
            select deadline from tasks
            where user_id = ? and deadline is not null
            order by deadline ASC
            limit 1
        `,
        [user_id]
    )

    return result?.deadline || null;
}

export const findAllTasks = async(user_id) => {
    const db = await getDB();

    const result = await db.all(
        `
            select t.name, t.description, t.deadline, t.date_created, t.reminder_time, t.updatedAt 
            from tasks as t
            join criticalTypes as c on c.id = t.critical_id
            join statusTypes as s on s.id = t.status_id
            where t.user_id = ? AND t.is_deleted != 0
        `,
        [user_id]
    )
    return result;
}

export const findTask = async(task_id) => {
    const db = await getDB();

    const result = await db.get(
        `
            select t.name, t.description, t.deadline, t.date_created, t.reminder_time, t.updatedAt, 
            from tasks as t
            join criticalTypes as c on c.id = t.critical_id
            join statusType as s on s.id = t.status_id
            where t.id = ?
        `,
        [task_id]
    )

    return result;
}

export const findTaskByName = async(name) => {
    const db = await getDB();

    const result = await db.get(
        `
            select t.name, t.description, t.deadline, t.date_created, t.reminder_time, t.updatedAt, 
            from tasks as t
            join criticalTypes as c on c.id = t.critical_id
            join statusType as s on s.id = t.status_id
            where t.name = ?
        `,
        [name]
    )

    return result;
}

export const insertTask = async({user_id, name, description, deadline, reminder_time}) => {
    const db = await getDB();

    await db.run(
        `
            insert into tasks (user_id, name, description, deadline, reminder_time)
            values ?, ?, ?, ?, ?
        `,[user_id, name, description, deadline, reminder_time]
    )

    const result = findTaskByName(name);
    return result;
}

export const updateTask = async(task_id, {user_id, name, description, deadline, reminder_time}) => {
    const db = await getDB();
    await db.run(
        `
            update tasks
            set user_id = ?, name = ?, description = ?, deadline = ?, reminder_time = ? 
            where tasks.id = ?
        `
        [user_id, name, description, deadline, reminder_time, task_id]
    )

    const result = findTaskByName(name);
    return result;
}

export const deleteTask = async(task_id) => {
    const db = await getDB();

    await db.run(
        `
            update tasks
            set is_deleted = 1
            where id = ?
        `
        [task_id]
    )

    const result = findTask(task_id);
    return result;
}