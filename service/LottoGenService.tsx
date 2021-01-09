import ApiService from "./ApiService";
import { Moment } from "moment";

class LottoGenService extends ApiService {
    async genNumbersByQuote(quote: string): Promise<number[]> {
        if (quote == null) {
            throw new Error("Invalid quote");
        }
        try {
            const result = await this.getJson("/main?string=" + quote);
            return result.res;
        } catch (err) {
            throw err;
        }
    }
    async genNumbersByBirthDate(
        birthDate: Moment | null,
        name: string | null,
    ): Promise<any> {
        if (birthDate == null) {
            throw new Error("Invalid birthDate");
        }
        try {
            const result = await this.getJson(
                "/main?string=" + birthDate.format("YYYY-MM-DD") + name,
            );
            return result.res;
        } catch (err) {
            throw err;
        }
    }
}

export default new LottoGenService();
