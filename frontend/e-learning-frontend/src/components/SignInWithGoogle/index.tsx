import { GoogleLogin } from "@react-oauth/google";

const SignInWithGoogle = () => {
  const successResponse = (credintalResponse: any) => {
    const URL = import.meta.env.VITE_SERVER_URL;
    window.location.href = URL + "/auth/google";
  };
  return (
    <GoogleLogin
      onSuccess={successResponse}
      onError={() => {
        console.log("Login Failed");
      }}
      useOneTap
      width="600"
    />
  );
};

export default SignInWithGoogle;
