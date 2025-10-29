import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
    return await openDatabaseAsync('MeuEstoque.db');
};

export default class Database {
     async initializeDatabase() {
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
                    value REAL NOT NULL,
                    date TEXT NOT NULL
                );
                `
            );

        } catch(e){
            console.error(e)
        }
    }

     async dropTables() {
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
     async insertSection(name: string) {
        const db = await getDBConnection();
        await db.runAsync(
            `
            INSERT INTO sections (name) 
                VALUES (?);
            `,
            [name]
        );
    }
     async insertItem(name: string, value: number, measure: string, sectionId: number) {
        const db = await getDBConnection();
        await db.runAsync(
            `
            INSERT INTO items (name, value, measure, sectionId) 
                VALUES (?, ?, ?, ?);
            `,
            [name, value, measure, sectionId]
        );
    }
     async insertClient(name: string) {
        const db = await getDBConnection();
        await db.runAsync(
            `
            INSERT INTO clients (name) 
                VALUES (?);
            `,
            [name]
        );
    }
     async insertProduct(name: string, clientId: number) {
        const db = await getDBConnection();
        await db.runAsync(
            `
            INSERT INTO products (name, clientId) 
                VALUES (?, ?);
            `,
            [name, clientId]
        );
    }
     async insertSale(clientId: number, productId: number, value: number, date: string) {
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
     async getSection() {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `SELECT * FROM sections`
        );
        return result;
    }
     async getClients() {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `SELECT * FROM clients`
        );
        return result;
    }
     async getProducts() {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `SELECT * FROM products`
        );
        return result;
    }
     async getSales() {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `SELECT * FROM sales`
        );
        return result;
    }

    //
    // UPDATERS
    //
     async updateSection(sectionId: number, name: string) {
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
     async updateItem(itemId: number, name: string, value: number, measure: string) {
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
     async updateClient(clientId: number, name: string) {
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
     async updateProduct(productId: number, name: string) {
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
     async updateSale(clientId: number, productId: number, value: number, date: string) {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `
            UPDATE sales
                SET clientId = ?,
                    productId = ?,
                    value = ?,
                    date = ?
                WHERE clientId = ? AND productId = ?
            `,
            [clientId, productId, value, date]
        );
        return result;
    }

    //
    // GETTERS - ALL
    //
     async getAllSections() {
        const db = await getDBConnection();
        const result = await db.getAllAsync(
            `SELECT * FROM sections`
        );
        return result;
    }
     async getAllItems() {
        const db = await getDBConnection();
        const result = await db.getAllAsync(
            `
            SELECT * FROM items
            `
        );
        return result;
    }
     async getAllClients() {
        const db = await getDBConnection();
        const result = await db.getAllAsync(
            `
            SELECT * FROM clients
            `
        );
        return result;
    }
     async getAllProducts() {
        const db = await getDBConnection();
        const result = await db.getAllAsync(
            `
            SELECT * FROM products
            `
        );
        return result;
    }
     async getAllSales() {
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
     async deleteSection(sectionId: number) {
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
     async deleteItem(itemId: number) {
        const db = await getDBConnection();
        await db.runAsync(
            `
            DELETE FROM items
                WHERE itemId = ?
            `,
            [itemId]
        );
    }
     async deleteClient(clientId: number) {
		await this.deleteAllSalesFromClient(clientId);
		await this.deleteAllProductsFromClient(clientId);
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
     async deleteProduct(productId: number) {
		await this.deleteAllSalesFromProduct(productId);
        const db = await getDBConnection();
        await db.runAsync(
            `
            DELETE FROM products
                WHERE productId = ?
            `,
            [productId]
        );
    }
     async deleteSale(saleId: number) {
        const db = await getDBConnection();
        await db.runAsync(
            `
            DELETE FROM sales
                WHERE saleId = ?
            `,
            [saleId]
        );
    }

    //
    // DELETE ALL
    //
     async deleteAllItemsFromSection(sectionId: number) {
        const db = await getDBConnection();
        await db.runAsync(
            `
            DELETE FROM items
                WHERE sectionId = ?
            `,
            [sectionId]
        );
    }
     async deleteAllProductsFromClient(clientid: number) {
		await this.deleteAllSalesFromClient(clientid);
        const db = await getDBConnection();
        await db.runAsync(
            `
            DELETE FROM products
                WHERE clientid = ?
            `,
            [clientid]
        );
    }
     async deleteAllSalesFromClient(clientid: number) {
        const db = await getDBConnection();
        await db.runAsync(
            `
            DELETE FROM sales
                WHERE clientid = ?
            `,
            [clientid]
        );
    }
     async deleteAllSalesFromProduct(productId: number) {
        const db = await getDBConnection();
        await db.runAsync(
            `
            DELETE FROM sales
                WHERE productId = ?
            `,
            [productId]
        );
    }

}

