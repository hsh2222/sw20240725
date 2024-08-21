import React from "react";                       // React 라이브러리를 불러와서 React 컴포넌트를 사용
import ReactDOM from "react-dom/client";         // ReactDOM을 불러와서 React 컴포넌트를 실제 DOM에 렌더링
import "./index.css";                            // 글로벌 스타일을 적용하기 위해 index.css를 불러옴
import App from "./App";                         // App 컴포넌트를 불러옴 (이 컴포넌트가 메인 컴포넌트)

const container = document.getElementById("root"); // index.html에서 정의된 'root' 요소를 가져옴
const root = ReactDOM.createRoot(container);       // ReactDOM의 루트를 생성하여 'root' 요소에 렌더링할 준비를 함
root.render(<App />);                              // App 컴포넌트를 'root'에 렌더링, 즉 애플리케이션이 시작됨
