import {
    controller,
    httpPost,
    httpGet,
    request,
    response,
    BaseHttpController,
} from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";
import { LoginUser } from "../../../application/LoginUser";
import * as HttpStatus from 'http-status';
import { asyncLocalStorage, getRequestContext } from "../../../contexts/Request-Context";
import { GetUserById } from "../../../application/Users/GetUserById";

@controller("/auth")
export class AuthController extends BaseHttpController {

    @inject('loginUser') private loginUser!: LoginUser;

    @inject('getUserById') private getUserByIdFeature!: GetUserById;

    @httpPost("/register")
    async register(@request() req: Request, @response() res: Response) {
        const { email, password } = req.body;
        res.status(201).send("User registered");
    }

    @httpPost("/login")
    async login(@request() req: Request, @response() res: Response) {
        const { SUCCESS, BADREQUEST , ERROR} = this.loginUser.outputs;

        const {email, password} = req.body;

        this.loginUser.on(SUCCESS, result => res.json(result));
        this.loginUser.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));                                                                                                                                                                                 
        this.loginUser.on(ERROR, err => { throw (err); });

        await this.loginUser.execute({email, password})
    }

    @httpGet("/user", 'authMiddleware')
    async getUserById(@request() req: Request, @response() res: Response) {
        const { SUCCESS, BADREQUEST , ERROR} = this.getUserByIdFeature.outputs;

        console.log('jhere')

        const store = asyncLocalStorage.getStore();
        const userId = store?.user?.id;
        
        this.getUserByIdFeature.on(SUCCESS, result => res.json(result));
        await this.getUserByIdFeature.execute(userId ? +userId : 0)

    }
}
