
import { inject, injectable } from "inversify";
import { IStringService } from "../../domain/services/IStringService";
import { Operation } from "../Operatrion";
import { ITreeRepository } from "../../domain/ITreeRepository";
import { ITreeService } from "../../domain/services/ITreeService";



@injectable()
export class GenerateBinaryTree extends Operation {
    constructor(@inject('treeRepo') private treeRepo: ITreeRepository,
    @inject('treeService') private treeService: ITreeService) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute(depth: number ,userId : number) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;

        const tree = this.treeService.generateBinaryTree(depth);
        console.log(tree)

         await this.treeRepo.addTree({tree: tree, userId: userId})

         this.emit(SUCCESS, tree);

    }   
}