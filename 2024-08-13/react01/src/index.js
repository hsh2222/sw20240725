import React from 'react';                  // React 라이브러리 임포트
import ReactDOM from 'react-dom/client';    // ReactDOM 임포트

const Hello = () => {                       // Hello 컴포넌트 정의
  return (
    <>                                      {/* JSX 문법 사용 */}
      <h2>h2</h2>           {/* h2 태그에 텍스트 출력 */}
    </>
  );
}

const App = () => {                         // App 컴포넌트 정의
  return (
    <>                                      {/* JSX 문법 사용 */}
      <h3>h3</h3>       {/* h3 태그에 환영 메시지 출력 */}
      <h1>h1</h1>                  {/* h1 태그에 'Hello World' 출력 */}
      <Hello/>                             {/* Hello 컴포넌트 포함 */}
    </>
  );
};

const container = document.getElementById('root');  // 'root' 엘리먼트 선택
const root = ReactDOM.createRoot(container);        // root 생성
root.render(<App/>);                               // App 컴포넌트 렌더링
