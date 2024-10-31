import { inject, injectable } from "inversify";
import { Operation } from "../Operatrion";
import { IAuthService } from "../../domain/services/IAuthService";




@injectable()
export class LoginUser extends Operation {
    constructor(@inject('authService') private authService: IAuthService) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute(payload: { email: string, password: string }) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;

        try {

            if (!payload.email) {
                this.emit(BADREQUEST, 'Email ID is Required')
            }

            if (!payload.password) {
                this.emit(BADREQUEST, 'Password is Required')
            }

            const jwtCode = await this.authService.login(payload.email, payload.password);
            if (jwtCode) {
                this.emit(SUCCESS, { token: jwtCode });
                return;
            }
            this.emit(BADREQUEST, 'Invalid Credentials')
        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}