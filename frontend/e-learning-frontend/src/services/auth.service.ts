import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const AuthorizeUser = () => {
  const navigate: any = useNavigate();
  const { isLogged } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (isLogged === false) {
      navigate("/login");
    }
  });
  if (isLogged === true) {
    return true;
  } else {
    return false;
  }
};
