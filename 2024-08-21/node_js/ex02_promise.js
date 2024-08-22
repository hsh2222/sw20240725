function task1(fullfill, reject) {
    console.log('Task1 시작'); // Task1 시작을 출력
    let num = 0; // num 변수를 0으로 초기화
    setTimeout(function() {
        num = 1004; // 300ms 후에 num을 1004로 변경
        fullfill({ message: 'Task1 결과', num: num }); // 객체로 묶어서 전달
    }, 300);
    console.log('Task1 끝', num); // Task1 끝을 출력하지만, 이 시점의 num은 여전히 0
}

function fullfilled(result) {
    // result는 이제 객체입니다. 객체의 각 속성에 접근할 수 있습니다.
    console.log('fullfiled : ', result.message, result.num); // message와 num 모두 출력
}

function rejected(err) {
    console.log('rejected : ', err); // Promise가 실패하면 오류 메시지를 출력
}

new Promise(task1).then(fullfilled, rejected);
