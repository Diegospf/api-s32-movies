// /backend/src/db/database.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Criação das tabelas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS user (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS s32list (
    id INTEGER PRIMARY KEY,
    movie_id INTEGER NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS mylist (
    id INTEGER PRIMARY KEY,
    user_id TEXT,
    movie_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user (username)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS week (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    movies TEXT NOT NULL,
    year INTEGER,
    user_id TEXT,
    FOREIGN KEY (user_id) REFERENCES user (username)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS rate (
    id INTEGER PRIMARY KEY,
    user_id TEXT,
    movie_id INTEGER,
    rate INTEGER,
    FOREIGN KEY (user_id) REFERENCES user (username)
  )`);
});

module.exports = db;
