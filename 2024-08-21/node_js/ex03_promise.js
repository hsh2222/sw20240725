// Promise를 이용한 흐름 제어
// 콜백 함수의 실행 순서를 결정한다.

new Promise(function (fullfill) {
    console.log('1. Task1 시작');
    let num = 0;
    setTimeout(() => {
        let num = 1004;
        fullfill({data: '3. Task1 결과', num}); // Promise가 성공적으로 완료되면 fullfill에 객체를 전달
    }, 300);
    console.log('2. Task1 끝', num); // setTimeout이 실행되기 전에 num은 0이므로, 여기서 0이 출력됩니다.
}).then( (result) => {
    console.log('fullfiled 함수 : ', result.data, result.num); // Promise가 성공적으로 완료된 후, fullfill에서 전달된 값이 result로 출력됩니다.
});
