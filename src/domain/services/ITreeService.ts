import { TreeNode } from "../Models/TreeNode";


export interface ITreeService {
    maxLeafToNodeSum(node: TreeNode | null): any
    maxBetweenTwoNodes(node: TreeNode | undefined): { sum: number; path: string[] };
    generateBinaryTree(depth: number):any
}