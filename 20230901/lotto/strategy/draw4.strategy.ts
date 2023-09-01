import { UserParams } from "../interface/lotto.req";
import { LottoMachine, LottoResponse } from "./LotteryMachine";
import { SelectNum } from "./selectNum";

// 4개 뽑는 로또 로직
export class Draw4LottoMachine implements LottoMachine {
    async draw(input: UserParams): Promise<LottoResponse> {
        console.log("로또 4개 추첨")

        const value = SelectNum(4);

        console.log(input, ':', value);

        return {
            success : true,
            result : []
        }
    }
}