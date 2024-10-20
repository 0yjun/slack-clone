import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@pages/Login";
import Singup from "@pages/Signup";

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
