
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

    async execute(payload : any) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;


        const tree = await this.treeRepo.getUserTree(payload.userId);
        if(!(tree && tree[0])) {
            this.emit(SUCCESS, null)
        }

        const calculationFunctionMap: any = {
            'maxLeafToNode' : () =>  this.treeService.maxLeafToNodeSum(tree[0].tree),
            'maxPathBetweenNodes' : () => this.treeService.maxBetweenTwoNodes(tree[0].tree)
        };

       const result = await calculationFunctionMap[payload.type]();
       if(result) {
              this.emit(SUCCESS, result);
             return;
       }
    }   
}