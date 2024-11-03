import { inject, injectable } from "inversify";
import { Database } from "../config/Database";
import { REFUSED } from "dns";
import { IUserRepository } from "../domain/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository{


    constructor(@inject(Database) private db: Database) { }
  
    async getUserByEmail(email: string, user_role: string) {
        const result = await this.db.query("SELECT * FROM auth.users WHERE (email = $1) AND (user_role = $2) AND (blocked IS NOT TRUE) ", [email, user_role]);
        return result && result[0]
    }

    async createUser(name:string, email: string, hashedPassword: string, user_role: string) {
        const result: any = await this.db.query("INSERT INTO auth.users (name, email, password, user_role) VALUES ($1, $2, $3, $4) RETURNING id", [name ,email, hashedPassword, user_role]);
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

    async getUserData() {
        const result: any = await this.db.query('SELECT * FROM auth.getuserdata()');
        if(result && result[0]) {
            return {userCount: result[0].count_users, stringsCount: result[0].count_strings, treesCount: result[0].count_trees}
        }
        return []
    }

    async getAllUsers(payload: any) {
        const result: any = await this.db.query(`SELECT * FROM auth.users where user_role = $1 ORDER BY id LIMIT ${payload.limit} OFFSET ${payload.skip} ROWS`, ['user']);
        if(result && result.length) {
            return result.map((res:any) => ({
                id: res.id,
                name: res.name,
                email: res.email,
                blocked: res.blocked
            }))
        }
        return[];
    }

   async changeUserBlockStatus(userId: number, isBlocked: boolean) {
        const result = await this.db.query('UPDATE auth.users SET blocked = $1 WHERE id = $2', [!!isBlocked, userId])
        return true;
       
    }
}
