// Node.js의 내장 http 모듈을 불러옵니다.
const http = require('http');

// HTTP 서버를 생성합니다.
const server = http.createServer(function (req, res) {
    // 클라이언트에게 'Hello World!'라는 문자열을 응답으로 작성합니다.
    res.write('Hello World!');

    // 응답을 종료합니다. 이 메서드는 응답 본문을 클라이언트에 보내고 연결을 닫습니다.
    res.end();
});

// 서버를 3000 포트에서 실행합니다.
// 서버가 성공적으로 실행되면 콜백 함수가 호출되어 콘솔에 메시지를 출력합니다.
server.listen(3000, function() {
    console.log("서버 실행 중 >>> http://localhost:3000");
});