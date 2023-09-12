export interface Result<R> { // 제네릭 타입 : 매개변수처럼 사용하여 추후 원하는 타입을 부여할 수 있음
    isError : false
    value : R;
}

export interface Failure<E> {
    isError : true
    value : E
}

export type Failable<R, E> = Result<R> | Failure<E>