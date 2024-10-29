import { inject, injectable } from "inversify";
import { IStringService } from "../../domain/services/IStringService";
import { Operation } from "../Operatrion";
import { IStringRepository } from "../../domain/IStringRepository";



@injectable()
export class GetStringSuggestions extends Operation {
    constructor(@inject('stringRepository') private stringRepository: IStringRepository) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute(searchKey: string) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;
        try {
            if (!searchKey) {
                this.emit(BADREQUEST, 'Search Key Is Required');
                return;
            }


            const result = await this.stringRepository.getStringSuggestions(searchKey);

            this.emit(SUCCESS, result);
        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}