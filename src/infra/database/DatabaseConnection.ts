import pgp from "pg-promise"
import 'dotenv/config'

export default interface DatabaseConnection {
    query(statement: string, params: any): Promise<any>;
    close(): Promise<void>;
}

export class PgPromiseAdapter implements DatabaseConnection {
    connection: any

    constructor() {
        this.connection = pgp()(process.env.connectionString ?? "");
    }

    async query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }
    
    async close(): Promise<void> {
        this.connection.close();
    }

}