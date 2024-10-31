import { injectable } from 'inversify';
import { Client } from 'pg';

@injectable()
export class Database {
    private client: Client;

    constructor() {
        this.client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
    }

    async connect(): Promise<void> {
        try {
            await this.client.connect();
            console.log('Connected to PostgreSQL');
        } catch (err: any) {
            console.error('Error connecting to PostgreSQL:', err.message);
        }
    }

    async query(text: string, params?: any[]) {
        try {
            const result = await this.client.query(text, params);
            return result.rows;
        } catch (err: any) {
            console.error('Error executing query:', err.message);
            throw err; // Optionally rethrow the error
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.client.end();
            console.log('Disconnected from PostgreSQL');
        } catch (err: any) {
            console.error('Error disconnecting from PostgreSQL:', err.message);
        }
    }
}
