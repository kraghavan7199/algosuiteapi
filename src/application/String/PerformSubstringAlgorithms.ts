import { inject, injectable } from "inversify";
import { IStringService } from "../../domain/services/IStringService";
import { Operation } from "../Operatrion";
import { IStringRepository } from "../../domain/IStringRepository";
import { SubstringData } from "../../domain/Models/SubstringData";



@injectable()
export class PerformSubstringCalculations extends Operation {
    constructor(@inject('stringService') private authService: IStringService,
    @inject('stringRepository') private stringRepository: IStringRepository) {
      
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

            const searchAnalysis = await this.stringRepository.searchStringAnalysisHistory(payload.inputString);

            if(searchAnalysis && searchAnalysis[0]) {
                const substringData: SubstringData = {
                    string: payload.inputString,
                    longestSubstringLength: searchAnalysis[0].longest_substring_length,
                    uniqueSubstring: searchAnalysis[0].unique_substrings,
                    userId: payload.userId
                  };

                 await  this.stringRepository.addSubstringData(substringData);
                 this.emit(SUCCESS, substringData);
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