
import React from "react";                       // React 라이브러리를 가져와 컴포넌트를 작성할 수 있게 함.
import ReactDOM from "react-dom/client";         // ReactDOM을 가져와 React 컴포넌트를 실제 DOM에 렌더링할 수 있게 함.
import "./index.css";                            // 전역 스타일을 적용하기 위해 index.css를 가져옵니다.
import App from "./App";                         // App 컴포넌트를 가져와 최종적으로 렌더링할 컴포넌트로 지정.

const container = document.getElementById("root"); // 'root' 요소를 가져옵니다, index.html에서 정의된 root 요소.
const root = ReactDOM.createRoot(container);       // ReactDOM의 루트를 생성하여 이 루트에 컴포넌트를 렌더링할 준비를 함.
root.render(<App />);                              // App 컴포넌트를 'root'에 렌더링합니다, 즉, App 컴포넌트가 DOM에 추가됨.

