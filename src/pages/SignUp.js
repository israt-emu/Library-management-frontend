import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/ui/Error";
import { useSignUpMutation } from "../features/auth/authApi";
import Background from "../assets/images/loginImage.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetPassword, setRepetPassword] = useState("");
  const [error, setError] = useState("");
  const [signUp, { data: responseData, isLoading, error: responseError }] =
    useSignUpMutation();
  const navigate = useNavigate();
  //
  useEffect(() => {
    if (!responseData?.status) {
      setError(responseData?.message);
    }
    if (responseError?.data) {
      setError(responseError.data);
    }
    if (responseData?.status === "success" && responseData?.user) {
      navigate("/");
    }
  }, [responseData, responseError, navigate]);
  //signUp user
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const emailValidation = /\S+@\S+\.\S+/.test(email);
    const passValidation = /(?=.{8,})/.test(password);
    if (!emailValidation && !passValidation) {
      setError("Please enter valid input !");
    } else if (!emailValidation) {
      setError("Please enter a valid email!");
    } else if (!passValidation) {
      setError("Password must contain 8 characters or more");
    } else if (password !== repetPassword) {
      setError("Password Did not Matched");
      // console.log(password);
      return;
    } else {
      setError("");
      const data = {
        name,
        email,
        password,
      };

      signUp(data);
    }
  };

  return (
    <div
      className="bg-green-400 h-screen flex"
      style={{
        background: `url(${Background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/*  signUp form  */}
      <div className=" flex flex-col justify-center items-center w-full backdrop-blur-sm bg-green-400/[0.8] ">
        <div className="bg-green-50 shadow-lg py-10 md:w-1/3 flex flex-col justify-center items-center rounded ">
          <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10  text-gray-800 w-full">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold uppercase">
                Create Account
              </h1>
            </div>
            <form
              className=" ng-untouched ng-pristine ng-valid"
              onSubmit={handleSubmit}
            >
              <div className="">
                <div className="flex mb-6">
                  <input
                    type="text"
                    className="rounded-none rounded-l-lg bg-green-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your Name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="flex mb-6">
                  <input
                    type="email"
                    className="rounded-none rounded-l-lg bg-green-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                      />
                    </svg>
                  </span>
                </div>

                <div className="flex mb-6">
                  <input
                    type="password"
                    required
                    className="rounded-none rounded-l-lg bg-green-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="flex ">
                  <input
                    type="password"
                    required
                    className="rounded-none rounded-l-lg bg-green-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Repeat Your Password"
                    value={repetPassword}
                    onChange={(e) => setRepetPassword(e.target.value)}
                  />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <div className="flex justify-between mt-2">
                    <div className="">
                      {" "}
                      <input
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="checkbox"
                        value=""
                        required
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label inline-block text-gray-800 font-semibold"
                        htmlFor="flexCheckDefault"
                      >
                        I agree all statements in
                        <span className="underline ml-1">Terms of service</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 font-semibold rounded-md bg-green-400 text-gray-50 mt-8"
                    disabled={isLoading}
                  >
                    SingUp
                  </button>
                </div>
              </div>
              <div className="mt-2">{error && <Error message={error} />}</div>
            </form>
          </div>
          <p className="px-6 text-sm text-center  align-bottom mt-8">
            Already have an account?
            <Link to="/" className="hover:underline text-black font-bold ml-1">
              Please Login
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;