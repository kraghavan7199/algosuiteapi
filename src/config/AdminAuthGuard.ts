import { inject, injectable } from "inversify";

import { interfaces, BaseMiddleware, HttpContext } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../domain/services/IAuthService";
import { asyncLocalStorage, setRequestContext } from "../contexts/Request-Context";
import * as HttpStatus from 'http-status';

@injectable()
export class AdminAuthMiddleware extends BaseMiddleware {
    constructor(@inject('authService') private authService: IAuthService) {
        super();
    }

    public handler(req: Request, res: Response, next: NextFunction): void {
        const authKey = req.headers['auth-key']

        if (!authKey) {
            res.status(HttpStatus.UNAUTHORIZED).json('Unauthorized Access');
        }

        const payload = this.authService.verifyToken(<string>authKey);
        if (!payload) {
            res.status(HttpStatus.UNAUTHORIZED).json('Unauthorized Access');
        }  

        if(payload.role !== 'admin') {
            res.status(HttpStatus.UNAUTHORIZED).json('Unauthorized Access');
        }

        asyncLocalStorage.run({}, () => {
            setRequestContext({ id: payload.userId });
            next();
        });
    }
}
