import { SubstringData } from "./Models/SubstringData";

export interface IStringRepository {
    addSubstringData(payload: SubstringData): any;
    getUserStringHistory(limit: number, skip:number, userId: number): any;
    getStringSuggestions(searchKey: string): any;
    searchStringAnalysisHistory(string: string): any;
    
}