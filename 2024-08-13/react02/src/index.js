import React from 'react';   // React 라이브러리를 가져옴
import ReactDOM from 'react-dom/client';   // ReactDOM을 가져옴
import App from './App';   // App 컴포넌트를 불러옴

const container = document.getElementById('root');  // 'root'라는 DOM 요소를 선택
const root = ReactDOM.createRoot(container);   // ReactDOM을 통해 root를 생성
root.render(<App />);   // root에 App 컴포넌트를 렌더링
