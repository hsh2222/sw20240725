
import "./App.css";                              // App 전용 스타일을 가져옵니다.
import {useState} from "react";                  // React의 useState 훅을 가져와 상태를 관리.
import Input from "./Input";                     // Input 컴포넌트를 가져와 Todo 항목 추가 기능을 처리.
import Output from "./Output";                   // Output 컴포넌트를 가져와 Todo 리스트를 출력.

const App = ()=>{

    const [name, setName] = useState("Todo List"); // Todo 리스트 제목을 관리하는 상태 변수, 기본값은 "Todo List".
    const [todoList, setTodoLilst] = useState([    // Todo 항목들을 관리하는 상태 변수, 초기에는 4개의 항목이 있음.
        {no:101, title:"공부하기", done: false},  // 각 항목은 번호(no), 제목(title), 완료 여부(done)를 가짐.
        {no:102, title:"자바하기", done: true},
        {no:103, title:"리액트하기", done: false},
        {no:104, title:"스프링하기", done: false}
    ]);
    const [noCnt, setNoCnt] = useState(105);       // 다음 Todo 항목의 번호를 관리하는 상태, 새 항목 추가 시 번호가 증가.

    const onClickEvent = (inputTitle) => {         // 'Save' 버튼 클릭 시 호출되는 함수, 새로운 Todo 항목을 리스트에 추가.
        setTodoLilst([...todoList, {no:noCnt, title:inputTitle, done: false}]); // 기존 리스트에 새 항목 추가.
        setNoCnt(noCnt+1);                         // 항목 번호 증가.
    }

    const onDelete = ({no}) => {                   // Todo 항목을 삭제하는 함수, Delete 버튼 클릭 시 호출됨.
        const newList = todoList.filter((todo)=> todo.no != no); // 클릭된 항목을 제외한 새 리스트 생성.
        setTodoLilst(newList);                     // Todo 리스트 상태를 새로운 리스트로 업데이트.
    };

    const onDoneFlag = ({no})=>{                   // Todo 항목의 완료 상태를 토글하는 함수, 체크박스 클릭 시 호출됨.
        const newTodoList = todoList.map((item) => {
            if(item.no === no) {
                return {...item, done: !item.done}; // 완료 상태를 반전시킴.
            }
            return item;                           // 다른 항목들은 그대로 유지.
        });
        setTodoLilst(newTodoList);                 // Todo 리스트 상태를 업데이트.
    };

    const onEdit = ({no, title})=>{                // Todo 항목의 제목을 수정하는 함수, Edit 버튼 클릭 시 호출됨.
        const newTodoList = todoList.map((item) => {
            if(item.no === no) {
                return {...item, title};           // 해당 항목의 제목을 새로운 제목으로 변경.
            }
            return item;                           // 다른 항목들은 그대로 유지.
        });
        setTodoLilst(newTodoList);                 // Todo 리스트 상태를 업데이트.
    };

    return (<div className="todoList">
        <div className="App-header">
            <h1>{name} App</h1>                    
        </div>
        <Input onClickEvent={onClickEvent} />      
        <Output todoList={todoList} onDelete={onDelete} onDoneFlag={onDoneFlag} onEdit={onEdit} /> {/* Todo 항목 리스트를 표시하는 Output 컴포넌트 */}
    </div>);
}

export default App;

