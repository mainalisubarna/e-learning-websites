import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignInPage/SigInPage";
import SignUp from "./pages/SignUpPage/SignUpPage";
import Error from "./pages/PageNotFound/PageNotFound";
import DashBoard from "./pages/DashBoard/DashBoard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
