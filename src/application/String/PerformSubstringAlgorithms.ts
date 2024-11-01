import { inject, injectable } from "inversify";
import { IStringService } from "../../domain/services/IStringService";
import { Operation } from "../Operatrion";



@injectable()
export class PerformSubstringCalculations extends Operation {
    constructor(@inject('stringService') private authService: IStringService) {
        super();
        this.setOutputs(['SUCCESS', 'BADREQUEST', 'ERROR']);
    }

    async execute(payload: { inputString: string, userId: number }) {
        const { SUCCESS, BADREQUEST, ERROR } = this.outputs;

        try {

            if (!payload.inputString) {
                this.emit(BADREQUEST, 'No Input String');
                return;
            }

            if (!payload.userId) {
                this.emit(BADREQUEST, 'No User Id Present');
                return;
            }

            const result = await this.authService.performSubstringCalculations(payload.inputString, payload.userId);
            if (result) {
                this.emit(SUCCESS, result);
                return;
            }
        } catch (error) {
            this.emit(ERROR, error);
            return;
        }
    }
}