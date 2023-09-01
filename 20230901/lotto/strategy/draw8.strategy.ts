import { UserParams } from "../interface/lotto.req";
import { LottoMachine, LottoResponse } from "./LotteryMachine";
import { SelectNum } from "./selectNum";

// 8개 뽑는 로또 로직
export class Draw8LottoMachine implements LottoMachine {
    async draw(input: UserParams): Promise<LottoResponse> {
        console.log("로또 8개 추첨")

        const value = SelectNum(8);

        console.log(input, ':', value);

        return {
            success : true,
            result : []
        }
    }
}