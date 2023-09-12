import { Block } from "@core/block/block";
import { Chain } from "@core/chain/chain";

// npm i ws
// npm i -D @types/ws
import { WebSocket, WebSocketServer } from "ws"; // 웹소켓 (기본적인 연결 관련)


// enum : 알아보기 쉽게 상태를 지정
// ex) run, state, work, ...
enum MessageType {
    // 문자로 지정해도 되지만 오타가 발생할 수 있기 때문에 통상적으로 숫자 사용

    lastBlock = 0, // 마지막 블록 요청
    allBlock = 1, // 전체 체인 요청
    addBlock = 2, // 블록 추가
}

interface IMessage {
    type : MessageType;
    payload : any;
}

class P2P extends Chain { // Chain에 있는 메서드 사용 예정
    private sockets : Array<any> // 연결된 socket 확인

    constructor() {
        super();
        this.sockets = [];
    }

    getSockets() : Array<WebSocket> {
        return this.sockets;
    }

    connectSocket(socket : any, type? : MessageType) : void { // 반환값 없음
        // 연결된 socket을 받아서 추가
        // socket에는 충돌방지를 위해 고유의 포트가 들어있음
        // 애플리케이션 or 서비스에 연결하면 동적으로 고유 포트를 지정해줌
        this.sockets.push(
            `${socket._socket.remoteAddress}:${socket._socket.remotePort}`
        );

        // socket.send() 메서드를 호출하면 발생하는 이벤트
        socket.on("message", (_data : string) => {
            const data = JSON.parse(_data.toString()); // 객체로 바꿈

            switch (data.type) {
                case MessageType.lastBlock: // 0이 들어오면
                    const msg0 : IMessage = {
                        type : MessageType.lastBlock,
                        payload : [this.latestBlock()] // class Chain에 있는 마지막 블록 구하는 함수
                    }
                    socket.send(JSON.stringify(msg0)); // 문자열로 바꿈
                    break;

                case MessageType.allBlock: // 1이 들어오면
                    break;

                case MessageType.addBlock: // 2이 들어오면
                    const isValid = this.replaceChain(data.payload); // 검증 로직 (추가될 수 있는지?)                    
                    if(isValid.isError) break; // 문제가 있으면 종료

                    // 문제가 없으면 현재 접속한 유저들에게 메시지 전송
                    const msg2 : IMessage = {
                        type : MessageType.addBlock,
                        payload : data.payload
                    }
                    this.sockets.forEach((item) => {
                        item.send(JSON.stringify(msg2));
                    })
                    break;
            
                default:
                    break;
            }
        })
    }

    listen(port : number) : void {
        // 로컬 환경에서 서버 생성
        const server : WebSocketServer = new WebSocket.Server({port});

        server.on("connection", (socket : WebSocket) => {
            // 소켓 연결 시도
            console.log("new socket 연결");
            // 현재 연결한 소켓을 배열에 추가 & 메시지 이벤트 등록
            this.connectSocket(socket);
        })
    }

    addToPeer(peer : string) : void {
        // 상대방이 내 ip에 접속했을 때 소켓을 생성
        const socket : WebSocket = new WebSocket(peer);
        // 상대의 소켓 서버 주소를 받아서 연결 시도
        socket.on("open", () => {
            // 연결 성공하면 이벤트 실행
            console.log("연결 성공");
            this.connectSocket(socket, MessageType.addBlock);
        })
    }
}

export default P2P;