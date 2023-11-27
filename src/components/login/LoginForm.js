import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useLoginMutation} from "../../features/auth/authApi";
import Error from "../ui/Error";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, {data, isLoading, error: responseError}] = useLoginMutation();
  const navigate = useNavigate();
  //

  useEffect(() => {
    if (!data?.status) {
      setError(data?.message);
    }
    if (responseError?.data) {
      setError(responseError?.data?.message);
    }
    if (data?.token && data?.user) {
      navigate("/dashboard/books");
    }
  }, [data, responseError, navigate]);
  //login
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const emailValidation = /\S+@\S+\.\S+/.test(email);
    const passValidation = /(?=.{8,})/.test(password);
    if (emailValidation && passValidation) {
      login({
        email,
        password,
      });
    } else {
      setError("Please enter a valid email or password !");
    }
  };
  return (
    <div className=" flex flex-col justify-center items-center px-4 mt-5 md:mt-0">
      {/* login form  */}

      <div className="flex flex-col md:p-6 rounded-md sm:p-10 text-gray-800 w-full">
        <h2 className="font-bold text-center">Logo</h2>
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm text-gray-600">Sign in to access your account</p>
        </div>
        <form className=" ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit}>
          <div className="w-4/6 mx-auto">
            <div className="flex mb-6">
              <input type="email" className="rounded-none rounded-l-lg bg-green-50 border text-gray-900  focus:border-main block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                </svg>
              </span>
            </div>
            <div className="flex">
              <input type="password" required className="rounded-none rounded-l-lg bg-green-50 border text-gray-900  focus:border-main block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="*****" value={password} onChange={(e) => setPassword(e.target.value)} />
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </span>
            </div>
            <div>
              <div className="flex justify-between mt-2 ">
                <div className="">
                  {" "}
                  <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-main checked:border-main focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                  <label className="form-check-label inline-block text-gray-800 font-semibold" htmlFor="flexCheckDefault">
                    Remember Me
                  </label>
                </div>
                <Link to="/" className="text-xs hover:underline text-gray-600 mt-2 font-semibold">
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-2 w-4/6 mx-auto">
            <div>
              <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-main text-fill mt-8 flex justify-center items-center" sdisabled={isLoading}>
                {isLoading && <svg class="animate-spin h-5 w-5 mr-3 text-white rounded-full border-4 border-solid border-r-transparent s motion-reduce:animate-[spin_1.5s_linear_infinite]" viewBox="0 0 24 24"></svg>}
                <span>Login</span>
              </button>
            </div>
          </div>
          <div className="mt-2 w-4/6 mx-auto">{error && <Error message={error} />}</div>
        </form>
      </div>
      <p className="md:px-6 text-sm text-center text-gray-600 align-bottom mt-8 w-4/6 mx-auto">
        Don't have an account yet?
        <Link to="/signup" className="hover:underline text-main ml-1 font-bold">
          Quick Sign up here
        </Link>
        .
      </p>
    </div>
  );
};

export default LoginForm;
