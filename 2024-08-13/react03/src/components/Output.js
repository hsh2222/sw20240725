
import React from "react";  // React 임포트

const Output = ({ todoListArr }) => {  // Output 컴포넌트 정의, 할 일 목록을 props로 받음
  return (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Done</th>
        </tr>
      </thead>
      <tbody>
        {todoListArr.map((item) => (    
          <tr key={item.no}>
            <td>{item.no}</td>
            <td>{item.title}</td>
            <td>{item.done ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Output;  

