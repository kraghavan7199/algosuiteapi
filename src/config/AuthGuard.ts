import { inject, injectable } from "inversify";

import { interfaces, BaseMiddleware, HttpContext } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../domain/services/IAuthService";
import { asyncLocalStorage, setRequestContext } from "../contexts/Request-Context";

@injectable()
export class AuthMiddleware extends BaseMiddleware {
    constructor(@inject('authService') private authService: IAuthService) {
        super();
    }

    public handler(req: Request, res: Response, next: NextFunction): void {
        const authKey = req.headers['auth-key']

        if(!authKey) {
            return;
        }
       

        if (!authKey) {
            return;
        }

        const payload = this.authService.verifyToken(<string>authKey);
        if (!payload) {
            return;
        }  
        console.log(payload)
        asyncLocalStorage.run({}, () => {
            setRequestContext({ id: payload.userId });
            next();
        });
    }
}
