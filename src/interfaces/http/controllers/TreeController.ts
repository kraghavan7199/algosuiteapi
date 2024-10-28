import { BaseHttpController, controller, httpGet, httpPost, request, requestParam, response } from "inversify-express-utils";
import { inject } from 'inversify';
import * as express from 'express';
import * as HttpStatus from 'http-status';
import { SaveBinaryTree } from "../../../application/BinaryTree/SaveBinaryTree";
import { asyncLocalStorage } from "../../../contexts/Request-Context";
import { GetBinaryTreeCalculations } from "../../../application/BinaryTree/GetBinaryTreeCalculations";
import { GetUserTree } from "../../../application/BinaryTree/GetUserTree";





@controller('/tree')
export class TreeController extends BaseHttpController {

    @inject('saveBinaryTree') private saveBinaryTreeFeature!: SaveBinaryTree;
    @inject('getBinaryTreeCalculations') private getBinaryTreeCalculationsFeature!: GetBinaryTreeCalculations;
    @inject('getUserTree') private getUserTreeFeature!: GetUserTree;

    @httpPost('', 'authMiddleware')
    public async saveBinaryTree(@request() req: express.Request, @response() res: express.Response) {

        const { SUCCESS, BADREQUEST, ERROR } = this.saveBinaryTreeFeature.outputs;

        const { tree } = req.body;
        const store = asyncLocalStorage.getStore();
        const userId = store?.user?.id;

        this.saveBinaryTreeFeature.on(SUCCESS, result => res.json(result));
        await this.saveBinaryTreeFeature.execute({ tree, userId: userId ? +userId : 0 })
    }

    @httpGet('/:type', 'authMiddleware')
    public async getBinaryTreeCalculations(@requestParam('type') type: string, @request() req: express.Request, @response() res: express.Response) {
        const { SUCCESS, BADREQUEST, ERROR } = this.getBinaryTreeCalculationsFeature.outputs;
        const store = asyncLocalStorage.getStore();
        const userId = store?.user?.id;
        this.getBinaryTreeCalculationsFeature.on(SUCCESS, result => res.json(result));
        await this.getBinaryTreeCalculationsFeature.execute({ userId, type: type });

    }

    @httpGet('', 'authMiddleware')
    public async getUserBinaryTree(@requestParam('type') type: string, @request() req: express.Request, @response() res: express.Response) {
        const { SUCCESS, BADREQUEST, ERROR } = this.getUserTreeFeature.outputs;
        const store = asyncLocalStorage.getStore();
        const userId = store?.user?.id;
        this.getUserTreeFeature.on(SUCCESS, result => res.json(result));
        await this.getUserTreeFeature.execute(userId ? +userId : 0);
    }
}