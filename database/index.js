const mysql = require("mysql2/promise");
require("dotenv").config();

class Database {
    /**
     * @type {mysql.Connection|null}
     */
    static connection = null;

    /**
     * Create the connection and returns it
     * @returns {Promise<mysql.Connection>}
     */
    static async connect() {
        if (Database.connection) return Database.connection;
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOSTNAME,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        await connection.connect().catch((err) => {
            console.error(err);
            process.exit(1);
        });
        Database.connection = connection;
        return Database.connection;
    }

    /**
     * 
     * @param {string} query
     * @param {any[]} params 
     * @returns {Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket>}
     */
    static async query(query, params) {
        if(!Database.connection) await Database.connect();
        const [rows] = await Database.connection.execute(query, params);
        return rows;
    }
}

module.exports = Database;