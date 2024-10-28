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

        try {

            if (!userId) {
                this.emit(BADREQUEST, 'User Id Is Required');
                return;
            }

            const result = await this.userRepository.getUser(userId);

            this.emit(SUCCESS, result)
            return;
        } catch (error) {
            this.emit(ERROR, error)
        }

    }
}