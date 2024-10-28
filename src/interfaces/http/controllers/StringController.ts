import { BaseHttpController, controller, httpGet,  httpPost,  request, requestParam, response } from "inversify-express-utils";
import { inject } from 'inversify';
import * as express from 'express';
import * as HttpStatus from 'http-status';
import { PerformSubstringCalculations } from "../../../application/String/PerformSubstringAlgorithms";
import { asyncLocalStorage } from "../../../contexts/Request-Context";
import { GetUserStringsHistory } from "../../../application/String/GetUserStringsHistory";


@controller('/string')
export class StringController extends BaseHttpController {

    @inject('performSubstringCalculations') private performSubstringCalculationsFeature!: PerformSubstringCalculations;
    @inject('getUserStringsHistory') private getUserStringsHistoryFeature!: GetUserStringsHistory;

    @httpGet('/:string/substrings', 'authMiddleware')
    public async getSubstringData(@requestParam('string') inputString: string , @request() req: express.Request, @response() res: express.Response) {
        
        const { SUCCESS, BADREQUEST , ERROR} = this.performSubstringCalculationsFeature.outputs;

        const store = asyncLocalStorage.getStore();
        const userId = store?.user?.id;
        this.performSubstringCalculationsFeature.on(SUCCESS, result => res.json(result));
        await this.performSubstringCalculationsFeature.execute({inputString: inputString, userId: userId ? +userId : 0 })


    }


    @httpGet('/history', 'authMiddleware')
    public async getUserStringHistory( @request() req: express.Request, @response() res: express.Response) {
        const { SUCCESS, BADREQUEST , ERROR} = this.getUserStringsHistoryFeature.outputs;

        const store = asyncLocalStorage.getStore();
        const userId = store?.user?.id;
        this.getUserStringsHistoryFeature.on(SUCCESS, result => res.json(result));
        await this.getUserStringsHistoryFeature.execute( userId ? +userId : 0)

    }
}