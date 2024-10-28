import { inject, injectable } from "inversify";
import { IStringService } from "../../domain/services/IStringService";
import { Operation } from "../Operatrion";
import { IStringRepository } from "../../domain/IStringRepository";



@injectable()
export class GetUserStringsHistory extends Operation {
    constructor(@inject('stringRepository') private stringRepository: IStringRepository) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute(userId: number) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;

        const result = await this.stringRepository.getUserStringHistory(userId);
        if (result) {
            this.emit(SUCCESS, result);
            return;
        }
    }
}