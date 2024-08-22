function task1(fullfill, reject) {
    console.log('Task1 시작'); // Task1 시작을 출력
    let num = 0; // num 변수를 0으로 초기화
    setTimeout(function() {
        num = 1004; // 300ms 후에 num을 1004로 변경
        fullfill('Task1 결과', num); // 성공 시 fullfill에 'Task1 결과'와 num을 전달
    }, 300); // 0.3초 후에 위의 코드를 실행
    console.log('Task1 끝', num); // Task1 끝을 출력, 이 시점의 num은 아직 0
}

function fullfilled(result, num) {
    console.log('fullfiled : ', result, num); // 결과와 num을 출력
}

function rejected(err) {
    console.log('rejected : ', err); // Promise가 실패하면 오류 메시지를 출력
}

// 새로운 Promise를 생성하고, 비동기 작업(task1)을 시작합니다
new Promise(task1).then(fullfilled, rejected);// 비동기 작업이 완료되면 fullfilled 함수가 호출됩니다. 실패하면 rejected 함수가 호출됩니다.
