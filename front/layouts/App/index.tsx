import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@pages/Login"; // 애플리케이션의 메인 컴포넌트
import SignUp from "@pages/SignUp"; // 애플리케이션의 메인 컴포넌트

const App = () => {
  return (
    <Router>
      {" "}
      {/* BrowserRouter로 감싸줍니다. */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
