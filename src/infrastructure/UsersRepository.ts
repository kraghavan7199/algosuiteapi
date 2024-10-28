import { inject, injectable } from "inversify";
import { Database } from "../config/Database";
import { REFUSED } from "dns";

@injectable()
export class UserRepository {


    constructor(@inject(Database) private db: Database) { }

    async getUserByEmail(email: string) {
        const result = await this.db.query("SELECT * FROM auth.users WHERE email = $1", [email]);
        return result[0]
    }

    async createUser(email: string, hashedPassword: string) {
        const result = this.db.query("INSERT INTO auth.users (email, password) VALUES ($1, $2) RETURNING created_at", [email, hashedPassword]);
        return result;
    }

    async getUser(id: number) {
        const result = this.db.query('SELECT * FROM auth.users WHERE id = $1', [id]);
        console.log(result, '********')
        return result;
    }
}
