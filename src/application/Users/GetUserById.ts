import { inject, injectable } from "inversify";
import { Operation } from "../Operatrion";
import { IUserRepository } from "../../domain/IUserRepository";



@injectable()
export class GetUserById extends Operation {
    constructor(@inject('userRepo') private userRepository: IUserRepository) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute(userId: number) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;

        const result = await this.userRepository.getUser(userId);

        if(result && result[0]) {
            this.emit(SUCCESS, {userId: result[0].id, email: result[0].email})
        }
    }
}