import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
    return await openDatabaseAsync('MeuEstoque.db');
};

export async function initializeDatabase() {
    const db = await getDBConnection();
    await db.execAsync(
    `
      CREATE TABLE IF NOT EXISTS sections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        value INTEGER NOT NULL,
        measure TEXT NOT NULL,
        section INTEGER NOT NULL,
        FOREIGN KEY(section) REFERENCES sections(id)
      );
    `
  );
}

export async function setSection(name: string) {
    const db = await getDBConnection();
    await db.runAsync(
        `INSERT INTO sections (name) VALUES (?);`,
        [name]
    );
}

export async function getSection() {
    const db = await getDBConnection();
    const result = await db.runAsync(
        `SELECT * FROM sections`
    );
    return result;
}

export async function getAllSection() {
    const db = await getDBConnection();
    const result = await db.getAllAsync(
        `SELECT * FROM sections`
    );
    return result;
}
