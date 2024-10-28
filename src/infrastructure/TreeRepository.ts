import { inject, injectable } from "inversify";
import { Database } from "../config/Database";
import { REFUSED } from "dns";
import { SubstringData } from "../domain/Models/SubstringData";
import { IStringRepository } from "../domain/IStringRepository";
import { ITreeRepository } from "../domain/ITreeRepository";

@injectable()
export class TreeRepository implements ITreeRepository {


    constructor(@inject(Database) private db: Database) { }
 
    async addTree(payload: any) {
        const result =  await this.db.query(`SELECT * FROM tree.addtree($1, $2)`, [payload.tree, payload.userId]);
        return result;
    }

    async getTreeById(id: number) {
        const result = await this.db.query(`SELECT * FROM tree.UserTree WHERE id = $1`, [id]);
        return result;
    }

    async  getUserTree(userId: number) {
        const result = await this.db.query(`SELECT * FROM tree.UserTree WHERE user_id = $1`, [userId]);
        return result
    }

}
