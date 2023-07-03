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
      text="continue_with"
      size="large"
      useOneTap
      width="400"
    />
  );
};

export default SignInWithGoogle;
