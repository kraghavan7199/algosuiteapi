import { BaseHttpController, controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";
import * as HttpStatus from 'http-status';
import { GetAdminData } from "../../../application/Admin/GetAdminData";
import { GetAllUsers } from "../../../application/Admin/GetAllUsers";
import { ChangeUserBlockStatus } from "../../../application/Admin/BlockUser";


@controller("/admin")
export class AdminController extends BaseHttpController {
    @inject('getAdminData') private getAdminDataFeature!: GetAdminData;
    @inject('getAllUsers') private getAllUsersFeature!: GetAllUsers;
    @inject('changeUserBlockStatus') private changeUserBlockStatusFeature!: ChangeUserBlockStatus;

    @httpGet("/data", 'adminAuthMiddleware')
    async getAdminData(@request() req: Request, @response() res: Response) {

        const { SUCCESS, BADREQUEST, ERROR } = this.getAdminDataFeature.outputs;

        this.getAdminDataFeature.on(SUCCESS, result => res.json(result));
        this.getAdminDataFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));
        this.getAdminDataFeature.on(ERROR, err => { throw (err); });

        await this.getAdminDataFeature.execute();
    }

    @httpGet("/users", 'adminAuthMiddleware')
    async getAllUsers(@request() req: Request, @response() res: Response) {

        const { SUCCESS, BADREQUEST, ERROR } = this.getAllUsersFeature.outputs;

        const criteria = JSON.parse(<any>req.query.criteria || '{}');
        criteria.limit = criteria.limit || 10;
        criteria.skip = criteria.skip || 0;

        this.getAllUsersFeature.on(SUCCESS, result => res.json(result));
        this.getAllUsersFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));
        this.getAllUsersFeature.on(ERROR, err => { throw (err); });

        await this.getAllUsersFeature.execute(criteria);
    }


    @httpPost("/users/block-status", 'adminAuthMiddleware')
    async changeUserBlockStatus(@request() req: Request, @response() res: Response) {

        const { SUCCESS, BADREQUEST, ERROR } = this.changeUserBlockStatusFeature.outputs;

        const { userId, isBlocked } = req.body;

        this.changeUserBlockStatusFeature.on(SUCCESS, result => res.json(result));
        this.changeUserBlockStatusFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));
        this.changeUserBlockStatusFeature.on(ERROR, err => { throw (err); });

        await this.changeUserBlockStatusFeature.execute(userId, isBlocked);
    }
}