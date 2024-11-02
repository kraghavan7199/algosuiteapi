
import { inject, injectable } from "inversify";
import { IStringService } from "../../domain/services/IStringService";
import { Operation } from "../Operatrion";
import { ITreeRepository } from "../../domain/ITreeRepository";
import { ITreeService } from "../../domain/services/ITreeService";



@injectable()
export class GetBinaryTreeCalculations extends Operation {
    constructor(@inject('treeService') private treeService: ITreeService,
        @inject('treeRepo') private treeRepo: ITreeRepository) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute(payload: any) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;


        try {
            const userTreeData = await this.treeRepo.getUserTree(payload.userId);
            if (!(userTreeData)) {
                this.emit(SUCCESS, null)
            }

            if (userTreeData.maxSumPath && userTreeData.maxSumPath[payload.type]) {
                this.emit(SUCCESS, userTreeData.maxSumPath[payload.type]);
                return;
            }


            const calculationFunctionMap: any = {
                'maxLeafToNode': () => this.treeService.maxLeafToNodeSum(userTreeData.tree),
                'maxPathBetweenNodes': () => this.treeService.maxBetweenTwoNodes(userTreeData.tree)
            };

            const result = await calculationFunctionMap[payload.type]();
            if (result) {

                if (!userTreeData.maxSumPath) {
                    userTreeData.maxSumPath = {};
                }

                userTreeData.maxSumPath[payload.type] = result;

                await this.treeRepo.addTree(userTreeData);


                this.emit(SUCCESS, result);
                return;
            }
        } catch (error) {
            this.emit(ERROR, error)
        }

    }
}