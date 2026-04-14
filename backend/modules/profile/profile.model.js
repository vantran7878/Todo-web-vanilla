import {getDB} from "../../database/config.db.js"

export const findProfileByID = async (user_id) => {
    const db = await getDB(); 
    return db.get(
        `
            select displayName, email, createdAt 
            from users where id = ?
        `, 
            [user_id]
    );
}

