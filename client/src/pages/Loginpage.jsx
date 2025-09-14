import useLogin from "../hooks/useLogin";

const Login = () => {
  const {
    email,
    password,
    emailError,
    passwordError,
    postMessage,
    handleFieldChange,
    handleLogin,
    navigateToRegister,
  } = useLogin();
  // Require post Message

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Login to Laz</h2>

        <form className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 bg-white border border-gray-700 rounded-lg text-gray focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                handleFieldChange("email", event.target.value);
              }}
            />
            {emailError && (
              <span className="text-light-error">{emailError}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 bg-white border border-gray-700 rounded-lg text-gray focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="********"
              value={password}
              onChange={(event) => {
                handleFieldChange("password", event.target.value);
              }}
            />
            {passwordError && (
              <span className="text-light-error">{passwordError}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-200 transition cursor-pointer"
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-6">
          Dont have a account?{" "}
          <span
            className="underline cursor-pointer "
            onClick={() => navigateToRegister()}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
