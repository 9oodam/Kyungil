// 서명 타입
import { SignatureInput } from "elliptic";

// 트랜잭션의 입력 구조 정의
export class TxIn {
    txOutId ? : string // 이전 트랜잭션의 이이디(해시값)
    txOutIndex : number // 이전 트랜잭션의 출력 인덱스
    signature? : SignatureInput                                                                                                                   
}

// 트랜잭션 출력 구조 정의
export class TxOut {
    account : string // 수신자 계정 공개키 or 주소
    amount : number // 전송된 금액
}


// utxo : 마사용 객체
// TxIn 은 utxo에서 잔액을 가져옴
// TxOut 은 보낸 수신자 총 금액을 출력

// 트랜잭션 정보 구조 정의
export class TransactionRow {
    txIns : TxIn[] // 트랜잭션 입력 목록 (utxo의 값을 참조)
    txOuts : TxOut[] // 트랜잭션 출력 목록 (새로 생성되는 출력)
    hash? : string // 트랜잭션의 식별자(해시값)
}

// UTXO 구조 정의
export class UnspentTxOut {
    txOutId : string // 해당 utxo가 포함된 트랜잭션의 아이디(해시값)
    txOutIndex : number // 해당 utxo가 포함된 트랜잭션의 출력 인덱스
    account : string // 해당 utxo를 소유하고 있는 계정
    amount : number // 잔액
}

// 트랜잭션 데이터 타입
export type TransactionData = string | TransactionRow[];

// 사용되지 않은 UTXO 출력 타입
export type UnspentTxOutPool = UnspentTxOut[];

// 트랜잭션 pool의 타입
// 트랜잭션을 발생시키면 바로 처리X, pool에 pending 상태로 쌓임
// 블록이 생성될 때 트랜잭션 pool에 있는 대기상태의 트랜잭션을 처리하고 블록에 기록
export type TransactionPool = TransactionRow[];