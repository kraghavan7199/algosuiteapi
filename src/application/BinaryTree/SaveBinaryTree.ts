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

        try {

            if(!payload.userId) {
                this.emit(BADREQUEST, 'User Id Required');
                return;
            }

            if(!payload.tree) {
                this.emit(BADREQUEST, 'Tree Is Required');
                return;
            }

            const result = await this.treeRepo.addTree(payload);
            if(result) {
                   this.emit(SUCCESS, result);
                  return;
            }
        }catch(error) {
            this.emit(ERROR, error);
            return;
        }

     
    }   
}