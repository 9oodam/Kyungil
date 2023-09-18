import { TransactionData, TransactionRow, TxIn, TxOut, UnspentTxOut, UnspentTxOutPool } from "./transaction.interface"

// UTXO
// 각 노드의 UTXO 데이터베이스
// 주소별 잔액을 가지고 있는 객체 내용 포함

// A -> B 1bit 전송 => 트랜잭션 발생
// => txIn에 이전 트랜잭션에서 남은 미사용 객체(UTXO)를 참조해서
// txOut 결과물의 UTXO 객체를 만들어 놓고
// 보내는 금액보다 많이 가지고 있으면 트랜잭션 승인
// => UTXO에 결과로 생성된 잔액과 주소를 포함한 객체를 추가

class Unspent {
    // UTXO 객체 목록
    // 누가 얼마를 가지고 있는지에 대한 내용
    private readonly unspentTxOuts : UnspentTxOutPool = [];

    constructor() {

    }

    // UTXO 내용 조회하는 함수
    getUnspentTxPool() {
        return this.unspentTxOuts;
    }

    // UTXO 안의 객체는 사용하면 삭제
    delete(txin : TxIn) {
        const {txOutId, txOutIndex} = txin;
        const index = this.unspentTxOuts.findIndex((unspentTxOut : UnspentTxOut) => {
            return (
                // utxo가 포함된 트랜잭션 아이디/인덱스가 같은지 비교 검증
                unspentTxOut.txOutId === txOutId && unspentTxOut.txOutIndex === txOutIndex
            )
        })

        // 찾은 값(사용한 객체)을 제거
        if(index !== -1) {
            this.unspentTxOuts.splice(index, 1);
        }
    }

    // 새로운 객체 생성
    // txOut 정보를 가지고 UTXO 생성 목록에 추가
    create(hash : string) {
        return(txOut : TxOut, txOutIndex : number) => {
            const { account, amount } = txOut;
            this.unspentTxOuts.push({
                txOutId : hash,
                txOutIndex,
                account,
                amount
            })
        }
    }

    // 트랜잭션 검증 후 UTXO 업데이트
    update(transaction : TransactionRow) {
        // 처리되는 트랜잭션의 내용
        // txIns : 입력값 (누가 누구에게 송금하는지 내용, 잔액)
        // txOuts : 출력값 (누가 받았는지 주소, 잔액)
        // hash : 트랜잭션 식별자
        const { txIns, txOuts, hash } = transaction;

        if(!hash) throw new Error("hash가 정상적이지 않습니다.")

        // UTXO에 트랜잭션 출력값 추가
        txOuts.forEach(this.create(hash));

        // 사용한 객체 제거
        txIns.forEach(this.delete.bind(this)); // bind : 현재 작성된 위치에서의 this를 참조
    }

    // 특정 계정의 객체를 UTXO에서 모두 조회
    getUTXO(account : string) : UnspentTxOut[] {
        const myUnspentTxOuts = this.unspentTxOuts.filter((utxo) => {
            return utxo.account === account;
        })

        return myUnspentTxOuts;
    }

    // 특정 계정의 잔액 총합
    getAmount(myUnspentTxOuts : UnspentTxOut[]) {
        // reduce(콜백함수, 초기값)
        //         콜백혐수(순회하고 변한 누적값, 현재 순회하는 요소)
        return myUnspentTxOuts.reduce((acc, utxo) => acc + utxo.amount, 0)
    }

    // 계정의 잔고가 보내는 금액보다 큰지 검증
    isAmount(account : string, sendAmount : number) {
        const myUnspentTxOuts = this.getUTXO(account); // 내 주소와 잔액 정보가 있는 미사용 객체
        const totalAmount = this.getAmount(myUnspentTxOuts); // 총 잔액

        // 총 잔액이 보내는 금액보다 크면 true
        if(totalAmount > sendAmount) return true;
        return false;
    }
}

export default Unspent;