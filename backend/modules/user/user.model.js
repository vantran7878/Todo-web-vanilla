import {getDB} from "../../database/config.db.js"


export const findAllUser = async () => {
    const db = await getDB();
    return db.all("SELECT * FROM users");
};

export const findUserByID = async(id) => {
    const db = await getDB();
    return db.get("SELECT * FROM users WHERE id = ?", [id]);
}

export const findUserByEmail= async(email) => {
    const db = await getDB();
    return db.get("SELECT * FROM users WHERE email = ?", [email]);
}

export const createUser = async ({email, password, displayName}) => {
    const db = await getDB();

    const result = await db.run(
        `INSERT INTO users (email, password, displayName)
         VALUES (?, ?, ?)`, 
         [email, password, displayName]
    );

    return JSON.stringify({ id: result.lastID, email, displayName });
};

export const updateUser = async (id, data) => {
    const db = await getDB();

    await db.run(
        `UPDATE users
         SET email = ?, displayName = ?, updatedAt = CURRENT_TIMESTAMP
         WHERE id = ?`,
         [data.email, data.displayName, id]
    );
    return findUserByID(id);
}

export const deleteUser = async (id) => {
    const db = await getDB();
    await db.run(
        `
            update users
            set is_deleted = 1
            where id = ?
        `
        , [id])

    const result = findUserByID(id);

    return result;
}
