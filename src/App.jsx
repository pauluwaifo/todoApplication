import "./App.css";
import { Route, Routes } from "react-router-dom";
import Todo from "./pages/Todo";
import GlobalState from "./context/GlobalState";
import SignUp from "./pages/SignUpPage";
import Login from "./pages/LoginPage";

function App() {
  return (
    <div className="align-center content">
      <GlobalState>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </GlobalState>
    </div>
  );
}

export default App;
