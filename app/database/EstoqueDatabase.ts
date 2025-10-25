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

                CREATE TABLE IF NOT EXISTS clients (
                    clientId INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL
                );

                CREATE TABLE IF NOT EXISTS products (
                    productId INTEGER PRIMARY KEY AUTOINCREMENT,
					clientId INTEGER NOT NULL,
                    name TEXT NOT NULL
                );

                CREATE TABLE IF NOT EXISTS sales (
                    saleId INTEGER PRIMARY KEY AUTOINCREMENT,
                    clientId INTEGER NOT NULL,
                    productId INTEGER NOT NULL,
                    value INTEGER NOT NULL,
                    date TEXT NOT NULL
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
            DROP TABLE IF EXISTS clients;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS sales;
            `
        );
    }

    //
    // INSERTERS
    //
    static async insertSection(name: string) {
        const db = await getDBConnection();
        await db.runAsync(
            `
            INSERT INTO sections (name) 
                VALUES (?);
            `,
            [name]
        );
    }
    static async insertItem(name: string, value: number, measure: string, sectionId: number) {
        const db = await getDBConnection();
        await db.runAsync(
            `
            INSERT INTO items (name, value, measure, sectionId) 
                VALUES (?, ?, ?, ?);
            `,
            [name, value, measure, sectionId]
        );
    }
    static async insertClient(name: string) {
        const db = await getDBConnection();
        await db.runAsync(
            `
            INSERT INTO clients (name) 
                VALUES (?);
            `,
            [name]
        );
    }
    static async insertProduct(name: string, clientId: number) {
        const db = await getDBConnection();
        await db.runAsync(
            `
            INSERT INTO products (name, clientId) 
                VALUES (?, ?);
            `,
            [name, clientId]
        );
    }
    static async insertSale(clientId: number, productId: number, value: number, date: string) {
        const db = await getDBConnection();
        await db.runAsync(
            `
            INSERT INTO sales (clientId, productId, value, date) 
                VALUES (?, ?, ?, ?);
            `,
            [clientId, productId, value, date]
        );
    }

    //
    // SIMPLE GETTERS
    //
    static async getSection() {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `SELECT * FROM sections`
        );
        return result;
    }
    static async getClients() {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `SELECT * FROM clients`
        );
        return result;
    }
    static async getProducts() {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `SELECT * FROM products`
        );
        return result;
    }
    static async getSales() {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `SELECT * FROM sales`
        );
        return result;
    }

    //
    // UPDATERS
    //
    static async updateSection(sectionId: number, name: string) {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `
            UPDATE sections
                SET name = ?
                WHERE sectionId = ?
            `,
            [name, sectionId]
        );
        return result;
    }
    static async updateItem(itemId: number, name: string, value: number, measure: string) {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `
            UPDATE items
                SET name = ?,
                    value = ?,
                    measure = ?
                WHERE itemId = ?
            `,
            [name, value, measure, itemId]
        );
        return result;
    }
    static async updateClient(clientId: number, name: string) {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `
            UPDATE clients
                SET name = ?
                WHERE clientId = ?
            `,
            [name, clientId]
        );
        return result;
    }
    static async updateProduct(productId: number, name: string) {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `
            UPDATE products
                SET name = ?
                WHERE productId = ?
            `,
            [name, productId]
        );
        return result;
    }
    static async updateSale(clientId: string, productId: string, value: number, date: string) {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `
            UPDATE sales
                SET clientId = ?,
                    productId = ?,
                    value = ?,
                    date = ?
                WHERE productId = ?
            `,
            [clientId, productId, value, date]
        );
        return result;
    }

    //
    // GETTERS - ALL
    //
    static async getAllSections() {
        const db = await getDBConnection();
        const result = await db.getAllAsync(
            `SELECT * FROM sections`
        );
        return result;
    }
    static async getAllItems() {
        const db = await getDBConnection();
        const result = await db.getAllAsync(
            `
            SELECT * FROM items
            `
        );
        return result;
    }
    static async getAllClients() {
        const db = await getDBConnection();
        const result = await db.getAllAsync(
            `
            SELECT * FROM clients
            `
        );
        return result;
    }
    static async getAllProducts() {
        const db = await getDBConnection();
        const result = await db.getAllAsync(
            `
            SELECT * FROM products
            `
        );
        return result;
    }
    static async getAllSales() {
        const db = await getDBConnection();
        const result = await db.getAllAsync(
            `
            SELECT * FROM sales
            `
        );
        return result;
    }

    //
    // DELETERS
    //
    static async deleteSection(sectionId: number) {
        await this.deleteAllItemsFromSection(sectionId);
        const db = await getDBConnection();
        await db.runAsync(
            `
            DELETE FROM sections
                WHERE sectionId = ?;
            `,
            [sectionId]
        );
    }
    static async deleteItem(itemId: number) {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `
            DELETE FROM items
                WHERE itemId = ?
            `,
            [itemId]
        );
        return result;
    }
    static async deleteClient(clientId: number) {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `
            DELETE FROM clients
                WHERE clientId = ?
            `,
            [clientId]
        );
        return result;
    }
    static async deleteProduct(productId: number) {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `
            DELETE FROM products
                WHERE productId = ?
            `,
            [productId]
        );
        return result;
    }
    static async deleteSale(saleId: number) {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `
            DELETE FROM sales
                WHERE saleId = ?
            `,
            [saleId]
        );
        return result;
    }

    //
    // DELETE ALL
    //
    static async deleteAllItemsFromSection(sectionId: number) {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `
            DELETE FROM items
                WHERE sectionId = ?
            `,
            [sectionId]
        );
        return result;
    }
    static async deleteAllSalesFromClient(clientId: number) {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `
            DELETE FROM sales
                WHERE clientId = ?
            `,
            [clientId]
        );
        return result;
    }

}

