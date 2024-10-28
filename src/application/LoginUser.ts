import { inject, injectable } from "inversify";
import { IAuthService } from "../domain/services/IAuthService";
import { Operation } from "./Operatrion";



@injectable()
export class LoginUser extends Operation {
    constructor(@inject('authService') private authService: IAuthService) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute(payload: {email: string, password: string}) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;
        const jwtCode = await this.authService.login('lol@gmail.com', 'somePass');
        if(jwtCode) {
            this.emit(SUCCESS,  {token :jwtCode});
            return;
        }
    }   
}