import { inject, injectable } from "inversify";
import { IUserRepository } from "../IUserRepository";
import { TreeRepository } from "../../infrastructure/TreeRepository";
import { ITreeRepository } from "../ITreeRepository";
import { TreeNode } from "../Models/TreeNode";
import { ITreeService } from "./ITreeService";
import { v4 as uuidv4 } from 'uuid';


@injectable()
export class TreeService implements ITreeService {
    constructor(
        @inject('treeRepo') private treeRepo: ITreeRepository
    ) { }


    maxLeafToNodeSum(node: TreeNode | null): any {
        if (!node) return { sum: 0, path: [] };
        if (!node.left && !node.right) return { sum: node.value, path: [node.uniqueId] };

        const leftResult = this.maxLeafToNodeSum(node.left || null);
        const rightResult = this.maxLeafToNodeSum(node.right || null);

        if (leftResult.sum > rightResult.sum) {
            return {
                sum: node.value + leftResult.sum,
                path: [node.uniqueId, ...leftResult.path]
            };
        } else {
            return {
                sum: node.value + rightResult.sum,
                path: [node.uniqueId, ...rightResult.path]
            };
        }
    }

    maxBetweenTwoNodes(root: TreeNode): any {
        const state = {
            maxSum: Number.NEGATIVE_INFINITY,
            maxPath: []
        }
        this.calculateNodeGain(root, state);
        
        return {
            sum: state.maxSum,
            path: state.maxPath
        };
    }

    calculateNodeGain(
        node: TreeNode,
        state: any
    ):any {
        if (!node) {
            return { gain: 0, path: [] };
        }
    
        // Get maximum gains and paths from left and right subtrees
        const leftResult = node.left ? this.calculateNodeGain(node.left, state) : { gain: 0, path: [] };
        const rightResult = node.right ? this.calculateNodeGain(node.right, state) : { gain: 0, path: [] };
    
        // Calculate gains, considering negative values as 0
        const leftGain = Math.max(0, leftResult.gain);
        const rightGain = Math.max(0, rightResult.gain);
    
        // Calculate current path sum using both branches
        const currentPathSum = node.value + leftGain + rightGain;
    
        // If this path is the best so far, update maxSum and maxPath in state
        if (currentPathSum > state.maxSum) {
            state.maxSum = currentPathSum;
            state.maxPath = [
                ...leftResult.path,
                node.uniqueId,
                ...rightResult.path
            ].filter(id => id); 
        }

        const bestChildGain = Math.max(leftGain, rightGain);
        const bestChildPath = leftGain > rightGain ? leftResult.path : rightResult.path;
    
        return {
            gain: node.value + bestChildGain,
            path: bestChildGain > 0 ? [...bestChildPath, node.uniqueId] : [node.uniqueId]
        };
    }

    generateBinaryTree(depth: number): TreeNode | undefined {
        if (depth <= 0) {
            return undefined;
        }
    
        return this.buildTreeNode(depth, depth);
    }

    buildTreeNode(currentDepth: number, maxDepth: number): TreeNode | undefined {
        if (currentDepth <= 0) {
            return undefined;
        }
    
        const node: TreeNode = {
            value: Math.floor(Math.random() * 100) + 1,
            uniqueId: uuidv4()
        };

        const probability = currentDepth / maxDepth;
        
        if (Math.random() < probability) {
            node.left = this.buildTreeNode(currentDepth - 1, maxDepth);
        }
        
        if (Math.random() < probability) {
            node.right = this.buildTreeNode(currentDepth - 1, maxDepth);
        }
    
        return node;
    }


   
}
