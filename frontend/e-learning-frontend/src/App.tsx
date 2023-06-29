import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SigInPage";
import SignUp from "./pages/SignUpPage";
import Error from "./pages/PageNotFound";
import DashBoard from "./pages/DashBoard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
