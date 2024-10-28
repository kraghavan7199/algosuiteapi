import { inject, injectable } from "inversify";
import { Database } from "../config/Database";
import { REFUSED } from "dns";
import { SubstringData } from "../domain/Models/SubstringData";
import { IStringRepository } from "../domain/IStringRepository";

@injectable()
export class StringRepository implements IStringRepository {


    constructor(@inject(Database) private db: Database) { }

    async addSubstringData(payload: SubstringData) {
        const result =  await this.db.query(`SELECT * FROM strings.addsubstringdata($1, $2, $3, $4)`, [payload.string, payload.longestSubstringLength, payload.uniqueSubstring, payload.userId]);
        return result;
    }

    async getUserStringHistory(userId: number) {
        const result = await this.db.query(`SELECT * FROM strings.usersubstringanalysis WHERE user_id = $1`, [userId]);
        return result
    }


}
