
import "./App.css";                              // App 전용 스타일을 가져옵니다.
import {useState} from "react";                  // useState 훅을 가져옵니다.
import ItemRow from "./ItemRow";                 // 개별 Todo 아이템을 표시하는 ItemRow 컴포넌트를 가져옵니다.

const App = () => {

    const [name, setName] = useState("Todo List"); // Todo 리스트 제목을 관리하는 상태
    const [todoList, setTodoLilst] = useState([    // Todo 항목들의 리스트를 관리하는 상태
        {no:101, title:"공부하기", done: false},
        {no:102, title:"자바하기", done: true},
        {no:103, title:"리액트하기", done: false},
        {no:104, title:"스프링하기", done: false}
    ]);
    const [noCnt, setNoCnt] = useState(105);       // 다음 Todo 항목의 번호를 관리하는 상태

    const [inputTitle, setInputTtile] = useState("");  // 새로운 Todo 제목 입력을 관리하는 상태

    const onClickEvent = () => {                   // 'Save' 버튼 클릭 시 실행되는 함수
        setTodoLilst([...todoList, {no:noCnt, title:inputTitle, done: false}]); // 새로운 Todo 추가
        setNoCnt(noCnt + 1);                       // Todo 항목 번호 증가
        setInputTtile("");                         // 입력 필드 초기화
    }

    const onChangeTitle = (e) => {                 // 입력 필드의 값이 변경될 때 실행되는 함수
        setInputTtile(e.target.value);             // 입력 값을 상태로 업데이트
    }

    const onDelete = ({no}) => {                   // Todo 항목을 삭제하는 함수
        const newList = todoList.filter(todo => todo.no !== no); // 해당 항목을 제외한 새로운 리스트 생성
        setTodoLilst(newList);                     // 상태를 새로운 리스트로 업데이트
    };

    const onDoneFlag = ({no}) => {                 // Todo 항목의 완료 상태를 토글하는 함수
        const newTodoList = todoList.map(item => {
            if(item.no === no) {
                return {...item, done: !item.done}; // 완료 상태를 토글
            }
            return item;
        });
        setTodoLilst(newTodoList);                 // 상태를 업데이트
    };

    const onEdit = ({no, title}) => {              // Todo 항목의 제목을 수정하는 함수
        const newTodoList = todoList.map(item => {
            if(item.no === no) {
                return {...item, title};           // 제목을 새로운 값으로 변경
            }
            return item;
        });
        setTodoLilst(newTodoList);                 // 상태를 업데이트
    };

    return (
      <div className="todoList">                    {/* 메인 Todo 리스트 컨테이너 */}
        <div className="App-header">                {/* 헤더 섹션 */}
            <h1>{name} App</h1>                     {/* Todo 리스트 제목 */}
        </div>
        <div className="input-title">               {/* 입력 필드 섹션 */}
          <div className="container" style={{padding: "10px"}}>
            <div className="input-group mb-3">
                <input value={inputTitle} onChange={onChangeTitle} type="text" className="form-control" placeholder="Enter new todo" /> {/* 입력 필드 */}
                <div className="input-group-append">
                    <button className="btn btn-success" onClick={onClickEvent}>Save</button> {/* 'Save' 버튼 */}
                </div>
            </div>
          </div>
        </div>
        <div className="list-body">                 {/* Todo 항목 리스트 섹션 */}
          <div className="container">
            <table className="table table-hover">
              <thead>
                <tr style={{textAlign:"center"}}>
                    <th>Done</th>
                    <th>Title</th>
                    <th>Buttons</th>
                </tr>
              </thead>
              <tbody>
                {todoList.map(item => (             // Todo 항목들을 반복 렌더링
                    <tr key={item.no}>
                        <td colSpan={3} style={{padding:"0px"}}>
                            <ItemRow item={item} onDoneFlag={onDoneFlag} onDelete={onDelete} onEdit={onEdit} /> {/* 개별 Todo 항목을 렌더링 */}
                        </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
    );
}

export default App;

