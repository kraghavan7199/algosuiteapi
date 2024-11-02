import { inject, injectable } from "inversify";
import { Database } from "../config/Database";
import { ITreeRepository } from "../domain/ITreeRepository";

@injectable()
export class TreeRepository implements ITreeRepository {


    constructor(@inject(Database) private db: Database) { }
 
    async addTree(payload: any) {
        const result =  await this.db.query(`SELECT * FROM tree.addtree($1, $2, $3)`, [payload.tree, payload.userId, payload.maxSumPath]);
        return result;
    }

    async getTreeById(id: number) {
        const result = await this.db.query(`SELECT * FROM tree.UserTree WHERE id = $1`, [id]);
        return result;
    }

    async  getUserTree(userId: number) {
        const result = await this.db.query(`SELECT * FROM tree.UserTree WHERE user_id = $1`, [userId]);

        if(result && result.length) {
            return {
                tree: result[0].tree,
                userId: result[0].user_id,
                maxSumPath: result[0].maxsumpath
            }
        }
        return null;
    }

}
