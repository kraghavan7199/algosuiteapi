import { inject, injectable } from "inversify";
import { IAuthService } from "../domain/services/IAuthService";
import { Operation } from "./Operatrion";



@injectable()
export class RegisterUser extends Operation {
    constructor(@inject('authService') private authService: IAuthService) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute() {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;
        const a = await this.authService.register('lol@gmail.com', 'somePass');
    }
}