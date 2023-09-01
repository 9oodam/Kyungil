import { UserParams } from "../interface/lotto.req";
import { LottoResponse, LottoMachine } from "../strategy/LotteryMachine";
import Strategy from "../strategy/strategy";

class UserService {
    constructor(private readonly strategy : Strategy) {

    }

    async draw(type : number, input : UserParams) : Promise<LottoResponse> {
        const result = await this.strategy.draw(type, input)
        return result;
    }
}

export default UserService