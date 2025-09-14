import InputGroup from "../Components/InputGroup";
import useRegister from "../hooks/useRegister";

const Register = (props) => {
  const {
    // Field
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    firstNameError,
    lastNameError,

    // errorField
    emailError,
    phoneNumberError,
    passwordError,
    confirmPasswordError,
    postMessage,

    // Handle
    handleFieldChange,
    handleSubmitAsync,
    navigateToLogin,
  } = useRegister();

  return (
    <>
      <div className="bg-light-surface-container-highest w-screen h-screen flex ">
        <div className=" bg-light-surface rounded-2xl py-8 mx-auto my-auto w-md">
          <form>
            <h2 className="text-center text-2xl mb-4">Create an account</h2>

            {postMessage.text !== "" &&
              (postMessage.isSuccess === true ? (
                <p className="text-light-success text-center mb-4">
                  {postMessage.text}
                </p>
              ) : (
                <p className="text-light-error text-center mb-4">
                  {postMessage.text}
                </p>
              ))}

            <div className="grid grid-cols-2">
              <InputGroup
                title="First name"
                placeholder="First name"
                type="text"
                isRequired={true}
                errorMessage={firstNameError}
                value={firstName}
                onChange={(event) => {
                  handleFieldChange("firstName", event.target.value);
                }}
              />

              <InputGroup
                title="Last name"
                placeholder="Last name"
                type="text"
                isRequired={true}
                errorMessage={lastNameError}
                value={lastName}
                onChange={(event) => {
                  handleFieldChange("lastName", event.target.value);
                }}
              />
            </div>

            <InputGroup
              title="Email"
              placeholder="Email"
              type="email"
              isRequired={true}
              errorMessage={emailError}
              value={email}
              onChange={(event) => {
                handleFieldChange("email", event.target.value);
              }}
            />

            <InputGroup
              title="Phone"
              placeholder="Phone"
              type="tel"
              isRequired={true}
              errorMessage={phoneNumberError}
              value={phoneNumber}
              onChange={(event) => {
                handleFieldChange("phoneNumber", event.target.value);
              }}
            />

            <InputGroup
              title="Password"
              placeholder="Password"
              type="password"
              isRequired={true}
              errorMessage={passwordError}
              value={password}
              onChange={(event) => {
                handleFieldChange("password", event.target.value);
              }}
            />

            <InputGroup
              title="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              isRequired={true}
              errorMessage={confirmPasswordError}
              value={confirmPassword}
              onChange={(event) => {
                handleFieldChange("confirmPassword", event.target.value);
              }}
            />

            <p className="px-4 py-2">
              By creating an account, you agree to the{" "}
              <a href="#" className="text-light-primary underline">
                Terms of Service
              </a>{" "}
              and have read the{" "}
              <a href="#" className="text-light-primary underline">
                Privacy Policy
              </a>
            </p>

            <div className="w-full flex py-2">
              <button
                type="submit"
                onClick={handleSubmitAsync}
                className=" bg-light-primary text-light-on-primary rounded-2xl text-center m-auto px-6 py-2 cursor-pointer"
              >
                Create Account
              </button>
            </div>

            <p className="px-4 pt-2 text-center">
              Already have an account?{" "}
              <span
                className="text-light-primary underline cursor-pointer"
                onClick={navigateToLogin}
              >
                Log in
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
