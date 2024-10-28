
import { inject, injectable } from "inversify";
import { IStringService } from "../../domain/services/IStringService";
import { Operation } from "../Operatrion";
import { ITreeRepository } from "../../domain/ITreeRepository";
import { ITreeService } from "../../domain/services/ITreeService";



@injectable()
export class GetBinaryTreeCalculations extends Operation {
    constructor(@inject('treeService') private treeService: ITreeService) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute(payload : any) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;

        const calculationFunctionMap: any = {
            'maxLeafToNode' : () =>  this.treeService.calculateMaxLeafToSum(payload.userId),
            'maxPathBetweenNodes' : () => this.treeService.calculateMaxBetweenTwoNodes(payload.treeId)
        };

       const result = await calculationFunctionMap[payload.type]();
       if(result) {
              this.emit(SUCCESS, result);
             return;
       }
    }   
}