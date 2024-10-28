import { inject, injectable } from "inversify";
import { Database } from "../config/Database";
import { REFUSED } from "dns";
import { IUserRepository } from "../domain/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository{


    constructor(@inject(Database) private db: Database) { }

    async getUserByEmail(email: string) {
        const result = await this.db.query("SELECT * FROM auth.users WHERE email = $1", [email]);
        return result && result[0]
    }

    async createUser(name:string, email: string, hashedPassword: string) {
        const result: any = await this.db.query("INSERT INTO auth.users (name, email, password) VALUES ($1, $2, $3) RETURNING id", [name ,email, hashedPassword]);
        if(result && result[0]) {
            return {userId: result[0].id}
        }
        return null;
    }

    async getUser(id: number) {
        const result: any = await this.db.query('SELECT * FROM auth.users WHERE id = $1', [id]);
        if(result && result[0]) {
            return {userId: result[0].id, email: result[0].email, name: result[0].name}
        }
        return null
    }
}
