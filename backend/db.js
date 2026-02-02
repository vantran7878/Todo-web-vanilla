// backend/db.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDB() {
  const db = await open({
    filename: "./database/users.db",
    driver: sqlite3.Database,
  });

  // ------------------- CREATED --------------------//
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      displayName TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    create table if not exists statusTypes(
      id integer primary key,
      name_en text not null,
      name_vi text not null 
    );

    create table if not exists criticalTypes(
      id integer primary key,
      name_en text not null,
      name_vi text not null
    );

    create table if not exists tasks (
      id integer primary key autoincrement,
      user_id integer not null,
      name text[100] not null,
      description text,
      status_id integer default 1,
      critical_id integer default 1,
      deadline datetime ,
      date_created datetime datetime default current_timestamp,

      foreign key (user_id) references users(id) on delete cascade,
      foreign key (status_id) references statusType(id),
      foreign key (critical_id) references criticalTypes(id)
    );

  `);
  console.log("Database created");

    // ------------------- SEEDING --------------------//
    await db.exec(`
      INSERT OR IGNORE INTO statusTypes (id, name_en, name_vi) VALUES
      (1, 'On-going', 'Đang thực hiện'),
      (2, 'Finished', 'Hoàn thành'),
      (3, 'Missed', 'Bỏ lỡ'),
      (4, 'Removed', 'Đã xóa');

      insert or ignore into criticalTypes (id, name_en, name_vi) VALUES
      (1, 'Chill', 'Thấp'),
      (2, 'Normal', 'Trung bình'),
      (3, 'High', 'Cao'),
      (4, 'Urgent', 'Khẩn cấp'),
      (5, 'Immediately', 'Ngay lập tức');

    `);
  
  console.log("Database seeded");

  return db;
}
