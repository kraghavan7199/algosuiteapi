import { inject, injectable } from "inversify";
import { IStringService } from "./IStringService";
import { IStringRepository } from "../IStringRepository";
import { SubstringData } from "../Models/SubstringData";



@injectable()
export class StringService implements IStringService {
  constructor(
    @inject('stringRepository') private stringRepository: IStringRepository
  ) { }


  async performSubstringCalculations(inputString: string, userid: number) {
    const uniqueSubstrings = this.findUniqueSubstrings(inputString);
    const longestLength = this.findLongestUniqueSubstring(inputString);

    const payload: SubstringData = {
      string: inputString,
      longestSubstringLength: longestLength,
      uniqueSubstring: uniqueSubstrings,
      userId: userid
    };

    const result = await this.stringRepository.addSubstringData(payload);
    return payload;
  }


  findUniqueSubstrings(str: string): string[] {
    const result: string[] = [];
    for (let i = 0; i < str.length; i++) {
      for (let j = i + 1; j <= str.length; j++) {
        const substr = str.slice(i, j);
        if (this.hasUniqueChars(substr)) {
          result.push(substr);
        }
      }
    }
    return result;
  }

  hasUniqueChars(str: string): boolean {
    return new Set(str).size === str.length;
  }

  findLongestUniqueSubstring(str: string): number {
    let maxLength = 0;
    let start = 0;
    const charMap = new Map();

    for (let end = 0; end < str.length; end++) {
      if (charMap.has(str[end])) {
        start = Math.max(charMap.get(str[end]) + 1, start);
      }
      charMap.set(str[end], end);
      maxLength = Math.max(maxLength, end - start + 1);
    }
    return maxLength;
  }
}
