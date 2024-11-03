import { inject, injectable } from "inversify";
import { IStringService } from "../../domain/services/IStringService";
import { Operation } from "../Operatrion";
import { IStringRepository } from "../../domain/IStringRepository";
import { IUserRepository } from "../../domain/IUserRepository";



@injectable()
export class GetAllUsers extends Operation {
    constructor(
    @inject('userRepo') private userRepository: IUserRepository) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute(payload: any) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;
        try {
           
            const result = await this.userRepository.getAllUsers(payload);
            if (result) {
                this.emit(SUCCESS, result);
                return;
            }
        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}