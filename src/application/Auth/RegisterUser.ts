import { inject, injectable } from "inversify";
import { Operation } from "../Operatrion";
import { IAuthService } from "../../domain/services/IAuthService";
import { IUserRepository } from "../../domain/IUserRepository";



@injectable()
export class RegisterUser extends Operation {
    constructor(@inject('authService') private authService: IAuthService,
        @inject('userRepo') private userRepository: IUserRepository) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute(payload: { email: string, password: string, name: string }) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;

        try {

            if (!payload.name) {
                this.emit(BADREQUEST, 'Name is Required')
                return;
            }

            if (!payload.email) {
                this.emit(BADREQUEST, 'Email ID is Required')
                return;
            }

            if (!payload.password) {
                this.emit(BADREQUEST, 'Password is Required')
                return;
            }

            const user = await this.userRepository.getUserByEmail(payload.email);

            if (user) {
                this.emit(BADREQUEST, 'User Already Exists');
                return;
            }

            const jwtCode = await this.authService.register(payload.name, payload.email, payload.password);
            if (jwtCode) {
                this.emit(SUCCESS, { token: jwtCode });
                return;
            }

        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}