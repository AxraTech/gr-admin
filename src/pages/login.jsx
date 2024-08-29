import { useForm } from "react-hook-form";
import InputField from "../modules/common/components/input-field";

const Login = () => {
  const { register: loginRegister, error: loginFormError } = useForm();
  return (
    <div id="login-container" className="w-screen min-h-screen flex justify-center items-center">
      <div className="w-[35vw] min-h-[55vh] border-2 rounded border-gray-700 flex flex-col justify-around backdrop-blur-md">
        <div className="w-full h-8 mt-4 flex items-center justify-center">
          <h2 className="text-center text-black text-2xl font-bold">Login</h2>
        </div>
        <div className="w-full h-full p-8  flex flex-col">
          <form action="" className="w-full h-full flex flex-col text-black">
            <InputField
              label="Username"
              name="username"
              placeholder="Enter Username"
              inputType="text"
              fullSize={true}
              require={loginRegister}
            />
            <InputField
              label="Password"
              name="password"
              placeholder="Enter Password"
              inputType="password"
              fullSize={true}
              require={loginRegister}
            />
            <div className="w-full h-12 mt-4">
              <button
                type="submit"
                className="w-full h-full flex flex-row items-center justify-center text-white bg-gradient-to-r from-blue-900 to-gray-600"
              >
                {/* {updateCardLoading ? (
                          <LoadingButton size={20} />
                        ) : (
                          "Save Changes"
                        )} */}
                Login
              </button>
            </div>
          </form>
          <div className="w-full h-auto mt-4">
            <a className="text-white" href="/register">Create an account</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
