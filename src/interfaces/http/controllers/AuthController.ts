import { controller, httpPost, httpGet, request, response, BaseHttpController} from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";
import * as HttpStatus from 'http-status';
import { asyncLocalStorage, getRequestContext } from "../../../contexts/Request-Context";
import { GetUserById } from "../../../application/Users/GetUserById";
import { LoginUser } from "../../../application/Auth/LoginUser";
import { RegisterUser } from "../../../application/Auth/RegisterUser";

@controller("/auth")
export class AuthController extends BaseHttpController {
    
    @inject('loginUser') private loginUser!: LoginUser;
    @inject('registerUser') private registerUserFeature!: RegisterUser;
    @inject('getUserById') private getUserByIdFeature!: GetUserById;

    @httpPost("/register")
    async register(@request() req: Request, @response() res: Response) {
        const { SUCCESS, BADREQUEST , ERROR} = this.registerUserFeature.outputs;
        const {name, email, password} = req.body;

        this.registerUserFeature.on(SUCCESS, result => res.json(result));
        this.registerUserFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));                                                                                                                                                                                 
        this.registerUserFeature.on(ERROR, err => { throw (err); });

        await this.registerUserFeature.execute({name, email, password})
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

        const store = asyncLocalStorage.getStore();
        const userId = store?.user?.id;
        
        this.getUserByIdFeature.on(SUCCESS, result => res.json(result));
        this.getUserByIdFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));                                                                                                                                                                                 
        this.getUserByIdFeature.on(ERROR, err => { throw (err); });

        await this.getUserByIdFeature.execute(userId ? +userId : 0)

    }
}
