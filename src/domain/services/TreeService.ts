import { inject, injectable } from "inversify";
import { IUserRepository } from "../IUserRepository";
import { TreeRepository } from "../../infrastructure/TreeRepository";
import { ITreeRepository } from "../ITreeRepository";
import { TreeNode } from "../Models/TreeNode";
import { ITreeService } from "./ITreeService";


@injectable()
export class TreeService implements ITreeService {
    constructor(
        @inject('treeRepo') private treeRepo: ITreeRepository
    ) {}


   async calculateMaxLeafToSum(treeId: number) {

    const tree = await this.treeRepo.getUserTree(treeId);
    return this.maxLeafToNodeSum(tree[0].tree);

    }

    async calculateMaxBetweenTwoNodes(treeId: number) {

    }


    private maxLeafToNodeSum(node: TreeNode | null): any {
        if (!node) return { sum: 0, path: [] };
        if (!node.left && !node.right) return { sum: node.value, path: [node.value] };
    
        const leftResult = this.maxLeafToNodeSum(node.left || null);
        const rightResult = this.maxLeafToNodeSum(node.right || null);
    
        if (leftResult.sum > rightResult.sum) {
            return {
                sum: node.value + leftResult.sum,
                path: [node.value, ...leftResult.path]
            };
        } else {
            return {
                sum: node.value + rightResult.sum,
                path: [node.value, ...rightResult.path]
            };
        }
    }

      private maxGain(node: TreeNode | undefined, maxPath: { value: number }): number {
        if (!node) return 0;
    
        const leftGain = Math.max(this.maxGain(node.left, maxPath), 0);
        const rightGain = Math.max(this.maxGain(node.right, maxPath), 0);
    
        const currentMaxPath = node.value + leftGain + rightGain;
    
        maxPath.value = Math.max(maxPath.value, currentMaxPath);
    
        return node.value + Math.max(leftGain, rightGain);
    }
    
    private maxBetweenTwoNodes(node: TreeNode | undefined): number {
        const maxPath = { value: Number.MIN_SAFE_INTEGER };
        this.maxGain(node, maxPath); 
        return maxPath.value; 
    }
    
}
