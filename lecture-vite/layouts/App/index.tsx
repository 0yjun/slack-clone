import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";
const Login = loadable(() => import("@pages/Login"));
const SignUp = loadable(() => import("@pages/SignUp"));

const App = () => {
  return (
    <Router>
      {" "}
      {/* BrowserRouter로 감싸줍니다. */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
