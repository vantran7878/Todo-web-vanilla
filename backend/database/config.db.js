// config/database.js
import { initDB } from "./db.js";

let db;

export const getDB = async () => {
  if (!db) {
    db = await initDB();
  }
  return db;
};