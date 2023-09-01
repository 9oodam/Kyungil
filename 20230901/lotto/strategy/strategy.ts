import { UserParams } from "../interface/lotto.req";
import { LottoResponse, LottoMachine } from "./LotteryMachine";

interface IStrategy {
    [key : number] : LottoMachine
}

class Strategy {
    private strategy : IStrategy = {}

    public set(key : number, draw : LottoMachine) {
        this.strategy[key] = draw;
    }

    public async draw(type : number, input : UserParams) : Promise<LottoResponse> {
        const result = await this.strategy[type].draw(input);
        return result
    }
}

export default Strategy