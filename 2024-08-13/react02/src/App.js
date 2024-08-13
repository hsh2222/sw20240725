import Hello from "./Hello";   // Hello 컴포넌트를 불러옴

const App = () => {    // App이라는 메인 컴포넌트를 정의
  return (
    <>
      <h3>Welcome to my homepage</h3>    {/* h3 태그로 환영 메시지를 렌더링 */}
      <Hello />    {/* Hello 컴포넌트를 포함하여 렌더링 */}
    </>
  );
};

export default App;   // App 컴포넌트를 내보내서 다른 파일에서 사용할 수 있게 함
