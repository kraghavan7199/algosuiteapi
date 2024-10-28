import { TreeNode } from "./Models/TreeNode";

export interface ITreeRepository {
    addTree(payload: any): any;
    getTreeById(id: number): any;
    getUserTree(userId: number): any;
}