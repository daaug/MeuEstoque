import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
    return await openDatabaseAsync('MeuEstoque.db');
};

export default class Database {
    static async initializeDatabase() {
        try {
            const db = await getDBConnection();
            await db.execAsync(
                `
                CREATE TABLE IF NOT EXISTS sections (
                    sectionId INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL
                );

                CREATE TABLE IF NOT EXISTS items (
                    itemId INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    value INTEGER NOT NULL,
                    measure TEXT NOT NULL,
                    sectionId INTEGER NOT NULL,
                    FOREIGN KEY (sectionId) REFERENCES sections(sectionId)
                );
                `
            );

        } catch(e){
            console.error(e)
        }
    }
    static async dropTables() {
        const db = await getDBConnection();
        await db.execAsync(
            `
            DROP TABLE IF EXISTS items;
            DROP TABLE IF EXISTS sections;
            `
        );
    }

    static async insertSection(name: string) {
        const db = await getDBConnection();
        await db.runAsync(
            `INSERT INTO sections (name) VALUES (?);`,
            [name]
        );
    }

    static async getSection() {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `SELECT * FROM sections`
        );
        return result;
    }

    static async getSectionByName(name: string) {
        const db = await getDBConnection();
        const result = await db.getFirstAsync(
            `SELECT name FROM sections WHERE name = ?`,
            [name]
        );
        return result;
    }

    static async getAllSections() {
        const db = await getDBConnection();
        const result = await db.getAllAsync(
            `SELECT * FROM sections`
        );
        return result;
    }

    static async deleteSections() {
        const db = await getDBConnection();
        await db.execAsync(
            `DELETE FROM sections`
        );
    }

    static async setItem(name: string, value: number, measure: string, sectionId: number) {
        const db = await getDBConnection();
        await db.runAsync(
            `INSERT INTO items (name, value, measure, sectionId) VALUES (?, ?, ?, ?);`,
            [name, value, measure, sectionId]
        );
    }

    static async getItem() {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `SELECT * FROM items WHERE id=?`
        );
        return result;
    }

    static async getAllItems() {
        const db = await getDBConnection();
        const result = await db.getAllAsync(
            `
            SELECT * 
                FROM items
                INNER JOIN sections ON items.sectionId = sections.sectionId
            `
        );
        return result;
    }
}

