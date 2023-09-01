import { UserParams } from "./interface/lotto.req";
import UserService from "./service/user.service";
import Strategy from "./strategy/strategy";
import { Draw4LottoMachine } from "./strategy/draw4.strategy";
import { Draw6LottoMachine } from "./strategy/draw6.strategy";
import { Draw8LottoMachine } from "./strategy/draw8.strategy";

const strategy = new Strategy();

strategy.set(4, new Draw4LottoMachine())
strategy.set(6, new Draw6LottoMachine())
strategy.set(8, new Draw8LottoMachine())

const userService = new UserService(strategy)

const userParams1 : UserParams = {
    name : 'koo'
}
const userParams2 : UserParams = {
    name : 'lee'
}
const userParams3 : UserParams = {
    name : 'pak'
}


userService.draw(4, userParams1);
userService.draw(6, userParams2);
userService.draw(8, userParams3);