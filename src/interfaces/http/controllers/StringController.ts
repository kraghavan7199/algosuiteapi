import { BaseHttpController, controller, httpGet,  httpPost,  request, requestParam, response } from "inversify-express-utils";
import { inject } from 'inversify';
import * as express from 'express';
import * as HttpStatus from 'http-status';
import { PerformSubstringCalculations } from "../../../application/String/PerformSubstringAlgorithms";
import { asyncLocalStorage } from "../../../contexts/Request-Context";
import { GetUserStringsHistory } from "../../../application/String/GetUserStringsHistory";
import { GetStringSuggestions } from "../../../application/String/GetStringSuggestions";


@controller('/string')
export class StringController extends BaseHttpController {

    @inject('performSubstringCalculations') private performSubstringCalculationsFeature!: PerformSubstringCalculations;
    @inject('getUserStringsHistory') private getUserStringsHistoryFeature!: GetUserStringsHistory; 
    @inject('getStringSuggestions') private getStringSuggestionsFeature!: GetStringSuggestions;

    @httpGet('/:string/substrings', 'authMiddleware')
    public async getSubstringData(@requestParam('string') inputString: string , @request() req: express.Request, @response() res: express.Response) {
        
        const { SUCCESS, BADREQUEST , ERROR} = this.performSubstringCalculationsFeature.outputs;

        const store = asyncLocalStorage.getStore();
        const userId = store?.user?.id;
        this.performSubstringCalculationsFeature.on(SUCCESS, result => res.json(result));
        this.performSubstringCalculationsFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));                                                                                                                                                                                 
        this.performSubstringCalculationsFeature.on(ERROR, err => { throw (err); });

        await this.performSubstringCalculationsFeature.execute({inputString: inputString, userId: userId ? +userId : 0 })
    }

    @httpGet('/history', 'authMiddleware')
    public async getUserStringHistory( @request() req: express.Request, @response() res: express.Response) {
        const { SUCCESS, BADREQUEST , ERROR} = this.getUserStringsHistoryFeature.outputs;

        const criteria = JSON.parse(<any>req.query.criteria || '{}');
        criteria.limit = criteria.limit || 10;
        criteria.skip = criteria.skip || 0;
        const store = asyncLocalStorage.getStore();
        const userId = store?.user?.id;
        this.getUserStringsHistoryFeature.on(SUCCESS, result => res.json(result));
        this.getUserStringsHistoryFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));                                                                                                                                                                                 
        this.getUserStringsHistoryFeature.on(ERROR, err => { throw (err); });
        await this.getUserStringsHistoryFeature.execute(criteria, userId ? +userId : 0)
    }

    @httpGet('/:searchKey/suggestions', 'authMiddleware')
    public async getStringSuggestions(@requestParam('searchKey') searchKey: string, @request() req: express.Request, @response() res: express.Response) {
        const { SUCCESS, BADREQUEST , ERROR} = this.getStringSuggestionsFeature.outputs;

        this.getStringSuggestionsFeature.on(SUCCESS, result => res.json(result));
        this.getStringSuggestionsFeature.on(BADREQUEST, err => res.status(HttpStatus.BAD_REQUEST).send(err));                                                                                                                                                                                 
        this.getStringSuggestionsFeature.on(ERROR, err => { throw (err); });

        await this.getStringSuggestionsFeature.execute(searchKey)
    }
}