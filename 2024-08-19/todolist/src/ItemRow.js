
import { useState } from "react";                // useState 훅을 가져옵니다.

const ItemRow = ({item, onDoneFlag, onDelete, onEdit}) => {
    const [flag, setFlag] = useState(false);     // 편집 모드 상태를 관리하는 상태
    const [outputTitle, setOutputTtile] = useState(item.title); // Todo 제목을 관리하는 상태
    const lineThroughClass = {textDecoration: "line-through", color: "blue"}; // 완료된 Todo의 스타일
    const [titleTmp, setTitleTmp] = useState(item.title); // 수정 중인 제목 임시 저장 상태

    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <input onChange={() => onDoneFlag(item)} checked={item.done && "checked"} type="checkbox" /> {/* 완료 체크박스 */}
          </div>
        </div>
        <input
          style={item.done ? lineThroughClass : {}}  // 완료된 항목에 취소선 적용
          type="text"
          className="form-control"
          readOnly={!flag}                          // 편집 모드 여부에 따라 읽기 전용 설정
          value={outputTitle}                       // Todo 제목
          onChange={(e) => setOutputTtile(e.target.value)} // 제목 수정 시 상태 업데이트
          onFocus={() => setFlag(true)}             // 입력 필드 클릭 시 편집 모드로 전환
          onBlur={() => {                           // 입력 필드 외부 클릭 시 편집 모드 종료
            setFlag(false);
            setOutputTtile(item.title);             // 수정하지 않은 경우 원래 제목으로 복원
          }}
        />
        <div className="input-group-append">
          <button onClick={() => onEdit({no: item.no, title: titleTmp, done: item.done})} className="btn btn-primary" type="button">Edit</button> {/* 'Edit' 버튼 */}
          <button onClick={() => onDelete(item)} className="btn btn-danger" type="button">Delete</button> {/* 'Delete' 버튼 */}
        </div>
      </div>
    );
}

export default ItemRow;

