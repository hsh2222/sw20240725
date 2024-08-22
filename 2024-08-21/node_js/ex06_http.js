var http = require('http'); // HTTP 모듈 불러오기

var server = http.createServer(); // HTTP 서버 생성
server.listen(3000, () => {
    console.log("http://localhost:3000"); // 서버를 포트 3000에서 시작하고, 콘솔에 서버 주소 출력
});

const html = `
<!DOCTYPE html>
<html lang="ko">
    <head>
        <title>Node.js응답</title>
        <meta charset="UTF-8" />
    </head>
    <body>
        <h1>Nodejs 응답 페이지</h1>
    </body>
</html>
`; // HTML 응답 콘텐츠를 문자열로 정의

// req > request (요청 객체)
// res > response (응답 객체)
server.on('request', (req, res) => {
    console.log('>>> 클라이언트 요청이 들어왔습니다.'); // 클라이언트 요청이 들어왔을 때 콘솔에 메시지 출력
    // res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"}); // 응답 헤더 설정 (주석 처리됨)
    res.write(html); // 클라이언트에게 HTML 콘텐츠를 전송
    res.end(); // 응답을 종료, 클라이언트에게 모든 데이터 전송 완료
    // res.write()는 여러 번 호출 가능, res.end()는 한 번만 호출해야 함.
    // res.end()는 문자열 데이터만 사용 가능.
    // Express에서는 res.send()를 사용하여 문자열, 객체 등을 body에 바로 출력할 수 있음.
});
