
import React from "react";                       // React 라이브러리를 가져옵니다.
import ReactDOM from "react-dom/client";         // ReactDOM을 가져옵니다.
import "./index.css";                            // 전역 스타일을 적용하기 위해 index.css를 가져옵니다.
import App from "./App";                         // App 컴포넌트를 가져옵니다.

const container = document.getElementById("root"); // 'root' 요소를 가져옵니다.
const root = ReactDOM.createRoot(container);       // ReactDOM의 루트를 생성합니다.
root.render(<App />);                              // App 컴포넌트를 'root'에 렌더링합니다.

