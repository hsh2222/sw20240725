
import React, { useState } from "react";  // React와 useState 훅을 임포트

const Input = ({ appendItem }) => {       // Input 컴포넌트 정의, appendItem 함수는 부모 컴포넌트로부터 전달받음
  const [inputValue, setInputValue] = useState("");  // 입력값을 관리하는 상태 선언

  const handleSubmit = (event) => {       // 폼 제출 이벤트 핸들러 정의
    event.preventDefault();               // 기본 폼 제출 동작 방지
    if (inputValue.trim()) {              // 입력값이 비어있지 않으면
      appendItem(inputValue);             // 부모 컴포넌트의 appendItem 함수 호출
      setInputValue("");                  // 입력값 초기화
    }
  };

  return (
    <form onSubmit={handleSubmit}>        
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // 입력값 변경 시 상태 업데이트
        placeholder="할 일을 입력하세요"
      />
      <button type="submit">추가</button> 
    </form>
  );
};

export default Input;  

