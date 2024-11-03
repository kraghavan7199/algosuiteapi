import { inject, injectable } from "inversify";
import { IStringService } from "../../domain/services/IStringService";
import { Operation } from "../Operatrion";
import { IStringRepository } from "../../domain/IStringRepository";
import { IUserRepository } from "../../domain/IUserRepository";



@injectable()
export class GetAdminData extends Operation {
    constructor(
    @inject('userRepo') private userRepository: IUserRepository) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute() {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;
        try {
           
            const result = await this.userRepository.getUserData();
            if (result) {
                this.emit(SUCCESS, result);
                return;
            }
        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}