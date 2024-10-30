import { BaseHttpController, controller, httpGet, httpPost, request, requestParam, response } from "inversify-express-utils";
import { inject } from 'inversify';
import * as express from 'express';
import * as HttpStatus from 'http-status';
import { SaveBinaryTree } from "../../../application/BinaryTree/SaveBinaryTree";
import { asyncLocalStorage } from "../../../contexts/Request-Context";
import { GetBinaryTreeCalculations } from "../../../application/BinaryTree/GetBinaryTreeCalculations";
import { GetUserTree } from "../../../application/BinaryTree/GetUserTree";
import { GenerateBinaryTree } from "../../../application/BinaryTree/GenerateBinaryTree";





@controller('/tree')
export class TreeController extends BaseHttpController {

    @inject('saveBinaryTree') private saveBinaryTreeFeature!: SaveBinaryTree;
    @inject('getBinaryTreeCalculations') private getBinaryTreeCalculationsFeature!: GetBinaryTreeCalculations; 
    @inject('getUserTree') private getUserTreeFeature!: GetUserTree;
    @inject('generateBinaryTree') private generateBinaryTreeFeature!: GenerateBinaryTree;

    @httpPost('', 'authMiddleware')
    public async saveBinaryTree(@request() req: express.Request, @response() res: express.Response) {

        const { SUCCESS, BADREQUEST, ERROR } = this.saveBinaryTreeFeature.outputs;

        const { tree } = req.body;
        const store = asyncLocalStorage.getStore();
        const userId = store?.user?.id;

        this.saveBinaryTreeFeature.on(SUCCESS, result => res.json(result));
        this.saveBinaryTreeFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));
        this.saveBinaryTreeFeature.on(ERROR, err => { throw (err); });

        await this.saveBinaryTreeFeature.execute({ tree, userId: userId ? +userId : 0 })
    }

    @httpGet('/:type', 'authMiddleware')
    public async getBinaryTreeCalculations(@requestParam('type') type: string, @request() req: express.Request, @response() res: express.Response) {
        const { SUCCESS, BADREQUEST, ERROR } = this.getBinaryTreeCalculationsFeature.outputs;
        const store = asyncLocalStorage.getStore();
        const userId = store?.user?.id;
        this.getBinaryTreeCalculationsFeature.on(SUCCESS, result => res.json(result));
        this.getBinaryTreeCalculationsFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));
        this.getBinaryTreeCalculationsFeature.on(ERROR, err => { throw (err); });
        await this.getBinaryTreeCalculationsFeature.execute({ userId, type: type });

    }

    @httpGet('', 'authMiddleware')
    public async getUserBinaryTree(@requestParam('type') type: string, @request() req: express.Request, @response() res: express.Response) {
        const { SUCCESS, BADREQUEST, ERROR } = this.getUserTreeFeature.outputs;
        const store = asyncLocalStorage.getStore();
        const userId = store?.user?.id;
        this.getUserTreeFeature.on(SUCCESS, result => res.json(result));
        this.getUserTreeFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));
        this.getUserTreeFeature.on(ERROR, err => { throw (err); });
        await this.getUserTreeFeature.execute(userId ? +userId : 0);
    }

    @httpPost('/generate', 'authMiddleware')
    public async generateBinaryTree(@request() req: express.Request, @response() res: express.Response) {
        const { SUCCESS, BADREQUEST, ERROR } = this.generateBinaryTreeFeature.outputs;
        const store = asyncLocalStorage.getStore();
        const userId = store?.user?.id;

        const {depth} = req.body;
        this.generateBinaryTreeFeature.on(SUCCESS, result => res.json(result));
        this.generateBinaryTreeFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));
        this.generateBinaryTreeFeature.on(ERROR, err => { throw (err); });
        console.log('here')
        await this.generateBinaryTreeFeature.execute(depth, userId ? +userId : 0);
    }
}