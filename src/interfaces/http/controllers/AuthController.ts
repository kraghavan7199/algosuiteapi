import { controller, httpPost, httpGet, request, response, BaseHttpController} from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";
import * as HttpStatus from 'http-status';
import { asyncLocalStorage, getRequestContext } from "../../../contexts/Request-Context";
import { GetUserById } from "../../../application/Users/GetUserById";
import { LoginUser } from "../../../application/Auth/LoginUser";
import { RegisterUser } from "../../../application/Auth/RegisterUser";
import { AdminRegister } from "../../../application/AdminAuth/AdminRegister";
import { AdminLogin } from "../../../application/AdminAuth/AdminLogin";

@controller("/auth")
export class AuthController extends BaseHttpController {
    
    @inject('loginUser') private loginUser!: LoginUser;
    @inject('registerUser') private registerUserFeature!: RegisterUser;
    @inject('getUserById') private getUserByIdFeature!: GetUserById;
    @inject('adminRegister') private adminRegisterFeature!: AdminRegister;
    @inject('adminLogin') private adminLoginFeature!: AdminLogin;

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

    @httpPost("/admin/register")
    async adminRegister(@request() req: Request, @response() res: Response) {
        const { SUCCESS, BADREQUEST , ERROR} = this.adminRegisterFeature.outputs;
        const {name, email, password} = req.body;

        this.adminRegisterFeature.on(SUCCESS, result => res.json(result));
        this.adminRegisterFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));                                                                                                                                                                                 
        this.adminRegisterFeature.on(ERROR, err => { throw (err); });

        await this.adminRegisterFeature.execute({name, email, password})
    }

    @httpPost("/admin/login")
    async adminLogin(@request() req: Request, @response() res: Response) {
        const { SUCCESS, BADREQUEST , ERROR} = this.adminLoginFeature.outputs;

        const {email, password} = req.body;

        this.adminLoginFeature.on(SUCCESS, result => res.json(result));
        this.adminLoginFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));                                                                                                                                                                                 
        this.adminLoginFeature.on(ERROR, err => { throw (err); });

        await this.adminLoginFeature.execute({email, password})
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


    @httpGet("/admin/user", 'adminAuthMiddleware')
    async getAdminUserById(@request() req: Request, @response() res: Response) {
        const { SUCCESS, BADREQUEST , ERROR} = this.getUserByIdFeature.outputs;

        const store = asyncLocalStorage.getStore();
        const userId = store?.user?.id;
        
        this.getUserByIdFeature.on(SUCCESS, result => res.json(result));
        this.getUserByIdFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));                                                                                                                                                                                 
        this.getUserByIdFeature.on(ERROR, err => { throw (err); });

        await this.getUserByIdFeature.execute(userId ? +userId : 0) 

    }
}
