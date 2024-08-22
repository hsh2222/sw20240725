var http = require('http'); // HTTP 모듈 불러오기

var server = http.createServer(); // HTTP 서버 생성

server.on('request', function(request, response) { 
    response.end('Hello'); // 클라이언트 요청 시 'Hello' 응답
});

server.on('connection', function(session) {
    console.log('connection event'); // 클라이언트가 서버에 연결될 때 콘솔에 'connection event' 출력
    // console.log(session); // 세션 정보 출력 (주석 처리됨)
});

server.on('close', function() {
    console.log('close'); // 서버가 닫힐 때 콘솔에 'close' 출력
});

server.listen(3000, ()=> {console.log("http://localhost:3000")}); // 서버를 포트 3000에서 시작하고, 콘솔에 서버 주소 출력
