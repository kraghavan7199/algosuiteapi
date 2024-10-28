import { SubstringData } from "./Models/SubstringData";

export interface IStringRepository {
    addSubstringData(payload: SubstringData): any;
    getUserStringHistory(userId: number): any;
    
}