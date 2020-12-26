import ApiService from "./ApiService";
import { Moment } from "moment";

class LottoGenService extends ApiService {
    genNumbersByQuote(quote: string): number[] | PromiseLike<number[]> {
        // return new Promise(resolve => resolve([1, 2, 3, 4, 5, 6]));
        if (quote == null) {
            throw new Error("Invalid quote");
        }
        return this.getJson("/main?string=" + quote);
    }
    genNumbersByBirthDate(
        birthDate: Moment | null,
        name: string | null,
    ): Promise<any> {
        // return new Promise(resolve => resolve([1, 2, 3, 4, 5, 6]));
        if (birthDate == null) {
            throw new Error("Invalid birthDate");
        }
        return this.getJson(
            "/main?string=" + birthDate.format("YYYY-MM-DD") + name,
        );
    }
}

export default new LottoGenService();
