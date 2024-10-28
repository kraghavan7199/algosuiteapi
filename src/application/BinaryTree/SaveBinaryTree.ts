import { inject, injectable } from "inversify";
import { IStringService } from "../../domain/services/IStringService";
import { Operation } from "../Operatrion";
import { ITreeRepository } from "../../domain/ITreeRepository";



@injectable()
export class SaveBinaryTree extends Operation {
    constructor(@inject('treeRepo') private treeRepo: ITreeRepository) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute(payload : any) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;

       const result = await this.treeRepo.addTree(payload);
       if(result) {
              this.emit(SUCCESS, result);
             return;
       }
    }   
}