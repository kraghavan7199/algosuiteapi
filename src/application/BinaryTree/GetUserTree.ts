
import { inject, injectable } from "inversify";
import { IStringService } from "../../domain/services/IStringService";
import { Operation } from "../Operatrion";
import { ITreeRepository } from "../../domain/ITreeRepository";
import { ITreeService } from "../../domain/services/ITreeService";



@injectable()
export class GetUserTree extends Operation {
    constructor(@inject('treeRepo') private treeRepo: ITreeRepository) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute(userId : number) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;

       const result = await this.treeRepo.getUserTree(userId);

       if(result) {
              this.emit(SUCCESS, {tree : result[0].tree});
             return;
       }
    }   
}