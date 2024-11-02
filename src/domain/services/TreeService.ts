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

    maxSum = -Infinity;
    maxPath: any = [];


    // Function To Calculate Max Sum Path From Leaf To Node
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

    // Function To Calculate The Max Sum Path between two nodes
    maxBetweenTwoNodes(root: TreeNode): any {
        if (!root) return { maxSum: 0, maxPath: [] };

        this.maxSum = -Infinity;
        this.maxPath = [];
        this.findMaxPath(root);

        return {
            sum: this.maxSum,
            path: this.maxPath
        };

    }

    findMaxPath(node: any): any {
        if (!node) return { sum: 0, path: [] };

        const leftResult = this.findMaxPath(node.left);
        const rightResult = this.findMaxPath(node.right);
        const leftSum = Math.max(0, leftResult.sum);
        const rightSum = Math.max(0, rightResult.sum);
        const fullPathSum = leftSum + node.value + rightSum;

        if (fullPathSum > this.maxSum) {
            this.maxSum = fullPathSum;

            let newPath: number[] = [];

            if (leftSum > 0) {
                newPath = [...leftResult.path];
            }

            newPath.push(node.uniqueId);

            if (rightSum > 0) {
                newPath = [...newPath, ...rightResult.path];
            }

            this.maxPath = newPath;
        }

        const maxBranchSum = node.value + Math.max(leftSum, rightSum);
        return {
            sum: maxBranchSum,
            path: leftSum > rightSum ?
                [...leftResult.path, node.uniqueId] :
                [node.uniqueId, ...rightResult.path]
        };
    }

    // Function To Create Randomized Binary Tree Of A Given Depth
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


    isValidTree(root: any) {
        if (root === null) return true;

        const queue: (TreeNode | null)[] = [root];
        while (queue.length > 0) {
            const node = queue.shift();
            if (node === null) continue;

            if (node!.left) {
                if (node!.left === root) return false;
                queue.push(node!.left);
            }

            if (node!.right) {
                if (node!.right === root) return false;
                queue.push(node!.right);
            }

        }

        return true;
    }
}
