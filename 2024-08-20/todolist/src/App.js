import "./App.css";                              // App 전용 스타일을 불러옴
import { useEffect, useState } from "react";     // React의 useState와 useEffect 훅을 사용
import Input from "./Input";                     // Input 컴포넌트를 불러옴 (새로운 Todo 항목을 추가하는 기능을 담당)
import Output from "./Output";                   // Output 컴포넌트를 불러옴 (Todo 리스트를 출력하는 기능을 담당)
import axios from "axios";                       // Axios를 불러와 HTTP 요청을 처리

const App = () => {
    const [name, setName] = useState("Todo List"); // 애플리케이션의 제목을 관리하는 상태 변수
    const [todoList, setTodoLilst] = useState([]); // Todo 리스트를 관리하는 상태 변수
    const serverURL = 'http://localhost:5000/todo'; // 서버의 API 엔드포인트 URL

    useEffect(() => {                              // 컴포넌트가 마운트될 때 실행되는 훅 (초기 데이터 로드)
        axios.get(serverURL).then(function (response) {
            setTodoLilst(response['data']);        // 서버에서 가져온 데이터를 todoList 상태에 저장
        });
    }, []);                                        // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행

    const onClickEvent = (newTotoTitle) => {       // 새로운 Todo 항목을 추가하는 함수
        axios.post(serverURL, { title: newTotoTitle }).then(function (response) {
            setTodoLilst(response.data);           // 서버에서 업데이트된 Todo 리스트를 받아와 상태에 저장
        });
    }

    const onDelete = ({ no }) => {                 // Todo 항목을 삭제하는 함수
        axios.delete(serverURL + "/" + no).then(function (response) {
            setTodoLilst(response.data);           // 서버에서 업데이트된 Todo 리스트를 받아와 상태에 저장
        });
    };

    const onDoneFlag = (todoItem) => {             // Todo 항목의 완료 상태를 토글하는 함수
        todoItem.done = !todoItem.done;            // 완료 상태를 반전시킴
        axios.put(serverURL, todoItem).then(function (response) {
            setTodoLilst(response.data);           // 서버에서 업데이트된 Todo 리스트를 받아와 상태에 저장
        });
    };

    const onEdit = (todoItem) => {                 // Todo 항목의 제목을 수정하는 함수
        axios.put(serverURL, todoItem).then(function (response) {
            setTodoLilst(response.data);           // 서버에서 업데이트된 Todo 리스트를 받아와 상태에 저장
        });
    };

    return (
        <div className="todoList">
            <div className="App-header">
                <h1>{name} App</h1>  
            </div>
            <Input onClickEvent={onClickEvent} />  
            <Output todoList={todoList} onDelete={onDelete} onDoneFlag={onDoneFlag} onEdit={onEdit} /> {/* Todo 리스트를 출력하는 Output 컴포넌트를 렌더링 */}
        </div>
    );
}

export default App;                                // App 컴포넌트를 모듈로 내보내기
