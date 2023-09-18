import { TransactionData, TransactionPool, TransactionRow, TxIn, TxOut, UnspentTxOut } from "./transaction.interface";
import { SignatureInput } from "elliptic";
import { SHA256 } from "crypto-js";

// 보내는 사람의 객체 타입 구조 정의
class Sender {
    account : string;
}

// 영수증
class Receipt {
    sender : Sender;
    receiver : string;
    amount : number;
    signature : SignatureInput;
}


class Transaction {
    private readonly REWARD = 50; // 코인베이스 트랜잭션시 채굴자(블록 생성 권한이 있는 사람)에게 주어지는 보상 (블록의 첫 번째 트랜잭션으로 기록)
    private readonly transactionPool : TransactionPool = []; // 처리되지 않은 트랜잭션이 있는 공간

    constructor() {

    }

    // 트랜잭션 목록을 조회
    getPool() {
        return this.transactionPool;
    }

    // 트랜잭션 추가
    create(receipt : Receipt, unspentTxOuts : UnspentTxOut[]) {
        // 서명 확인
        if(!receipt.signature) throw new Error("signature 존재하지 않습니다.");

        // 잔액 계산
        const [txIns, amount] = this.createInput(unspentTxOuts, receipt.amount, receipt.signature);

        // 출력 트랜잭션 객체 생성
        const txOuts = this.createOutput(receipt.receiver, receipt.amount, receipt.sender.account, amount);

        // 트랜잭션 객체 생성
        const transaction : TransactionRow = {
            txIns, // 잔액 확인
            txOuts // 최종 결과물 (누구의 주소에 얼마가 있는지)
        }

        // 트랜잭션 해시 추가
        transaction.hash = this.serializeRow(transaction);
        
        // 트랜잭션이 바로 처리되는 것이 아니라 pool에 pending 상태로 담김
        // 블록 채굴 -> 승인 -> 트랜잭션 처리 -> 하나의 블록에 여러 개의 트랜잭션 기록
        this.transactionPool.push(transaction);

        return transaction;
    }

    // 잔액 계산 함수
    createInput(myUnspentTxOuts : UnspentTxOut[], receiptAmount : number, signature : SignatureInput) : [TxIn[], number] {
        let targetAmount = 0; // 0보다 큰지 비교

        const txins = myUnspentTxOuts.reduce((acc : TxIn[], unspentTxOut : UnspentTxOut) => { // TxIn[] 타입인지 추론 안됨
            // 현재 순회하는 요소 (본인의 UTXO)의 잔액, hash, index
            const {amount, txOutId, txOutIndex} = unspentTxOut;

            // 혹시 0을 보내면
            if(targetAmount >= receiptAmount) return acc;

            targetAmount += amount;
            acc.push({txOutIndex, txOutId, signature});

            return acc;

        }, [] as TxIn[]) // TxIn[] 타입일 것이라고 알려주는 것
    
        return [txins, targetAmount]
    }

    // 출력 생성 함수
    createOutput(receiver : string, amount : number, sender : string, sendAmount : number) {
        console.log(receiver, amount); // 받는 사람, 받은 금액
        console.log(sender, sendAmount); // 보낸 사람, 보낸 사람의 잔액

        const txouts : TxOut[] = [];

        // 받은 금액은 받은 사람으로 객체 생성하여 목록에 추가
        txouts.push({
            account : receiver,
            amount : amount
        })

        // 잔액은 보낸사람으로 다시 새로운 객체 생성하여 목록에 추가
        if(sendAmount - amount > 0) {
            txouts.push({
                account : sender,
                amount : sendAmount - amount
            })
        }

        // 잔액 비교하여 검증
        const outAmount = txouts.reduce(
            (acc, txout : TxOut) => acc + txout.amount, 0
        )
        console.log(outAmount, sendAmount);

        if(outAmount !== sendAmount) throw new Error("금액 불일치")

        return txouts;
    }

    // 트랜잭션 문자열로 반환
    serializeTxOut(txout : TxOut) : string {
        const {account, amount} = txout;
        const txt = [account, amount].join('');
        return SHA256(txt).toString();
    }
    serializeTxIn(txin : TxIn) : string {
        const {txOutIndex} = txin;
        const txt = [txOutIndex].join('');
        return SHA256(txt).toString();
    }

    // 트랜잭션을 직열화한 문자열로 반환
    serializeTx<T>(data : T[], callback : (item : T) => string) {
        // 초기 빈문자열에 callback 함수의 반환값 문자열을 배열 수만큼 반복
        return data.reduce((acc : string, item : T) => acc + callback(item), "");
    }

    // 트랜잭션 row를 전부 직열화하여 반환
    serializeRow(row : TransactionRow) {
        const {txIns, txOuts} = row;
        const txOutsText = this.serializeTx<TxOut>(txOuts, (item) => {
            return this.serializeTxOut(item)
        })
        const txInsText = this.serializeTx<TxIn>(txIns, (item) => {
            return this.serializeTxIn(item)
        })

        return SHA256(txOutsText + txInsText).toString();
    }


    // 채굴 보상을 위한 특수 트랜잭션(블록에 첫 번째로 기록)
    createTxIn(txOutIndex: number, txOutId? : string, signature? : SignatureInput) : TxIn {
        const txIn = new TxIn();
        txIn.txOutIndex = txOutIndex;
        txIn.txOutId = txOutId;
        txIn.signature = signature;

        return txIn;
    }
    createTxOut(account : string, amount : number) : TxOut {
        if(account.length !== 40) throw new Error("비정상적인 계정");

        const txOut = new TxOut();
        txOut.account = account;
        txOut.amount = amount;

        return txOut;
    }
    createRow(txIns : TxIn[], txOuts : TxOut[]) {
        const transactionRow = new TransactionRow();
        transactionRow.txIns = txIns;
        transactionRow.txOuts = txOuts;
        transactionRow.hash = this.serializeRow(transactionRow);

        return transactionRow;
    }
    createCoinBase(account : string, latestBlockHeight : number) {
        const txin = this.createTxIn(latestBlockHeight + 1); // 채굴자의 경우 트랜잭션의 해시와 서명 없음, 높이만 전달하면 됨
        const txout = this.createTxOut(account, this.REWARD);
        return this.createRow([txin], [txout]);
    }


    // 트랜잭션 pool 처리 (처리 완료된 트랜잭션 삭제)
    update(transaction : TransactionRow) {
        const findCallback = (tx : TransactionRow) => transaction.hash == tx.hash;
        const index = this.transactionPool.findIndex(findCallback);
        if(index !== -1) {
            this.transactionPool.splice(index, 1)
        }
    }

    // 트랜잭션 목록 업데이트
    sync(transactions : TransactionData) {
        if(typeof transactions === "string") return;

        transactions.forEach(this.update.bind(this));
    }
}

export default Transaction;