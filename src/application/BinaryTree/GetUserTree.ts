
import { inject, injectable } from "inversify";
import { Operation } from "../Operatrion";
import { ITreeRepository } from "../../domain/ITreeRepository";



@injectable()
export class GetUserTree extends Operation {
    constructor(@inject('treeRepo') private treeRepo: ITreeRepository) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute(userId: number) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;

        try {

            if (!userId) {
                this.emit(BADREQUEST, 'User Id is required');
                return;
            }

            const result = await this.treeRepo.getUserTree(userId);

            this.emit(SUCCESS, result ? result : { tree: null });
            return;
        } catch (error) {
            this.emit(ERROR, error)
        }

    }
}