import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Error from "../components/ui/Error";
import {useSignUpMutation} from "../features/auth/authApi";
import Background from "../assets/images/library-g9c16b1ced_1920.jpg";
import {useSelector} from "react-redux";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(false);
  const [repetPassword, setRepetPassword] = useState("");
  const [error, setError] = useState("");
  const [signUp, {data: responseData, isLoading, error: responseError}] = useSignUpMutation();
  const navigate = useNavigate();
  const theme = useSelector((state) => state?.theme?.themeMode);

  //
  useEffect(() => {
    if (!responseData?.status) {
      setError(responseData?.message);
    }
    if (responseError?.data) {
      setError(responseError.data);
    }
    if (responseData?.status === "success" && responseData?.user) {
      navigate("/dashboard/books");
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
        role: role ? "teacher" : "student",
      };
      console.log(data);
      signUp(data);
    }
  };

  return (
    <div
      className={`${theme === "dark" ? "theme-dark" : "theme-light"} bg-fill h-screen flex`}
      style={{
        background: `linear-gradient(rgba(2, 55, 60, 0.7), rgba(68, 147, 66, 0.6)),url(${Background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/*  signUp form  */}
      <div className=" flex flex-col justify-center items-center w-full pb-4">
        <div className="bg-fill shadow-lg py-6 md:w-1/3 flex flex-col justify-center items-center rounded mt-4">
          <div className="flex flex-col sm:p-10  md:pt-6 md:pb-4 rounded-md  text-gray-800 w-full">
            <div className="mb-8 text-center">
              <h1 className="mb-3 mt-2 text-3xl font-bold uppercase">Create Account</h1>
            </div>
            <form className=" ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit}>
              <div className="">
                <div className="flex mb-6">
                  <input type="text" className="rounded-none rounded-l-lg bg-green-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="Your Name" value={name} required onChange={(e) => setName(e.target.value)} />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
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
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                    </svg>
                  </span>
                </div>

                <div className="flex mb-6">
                  <input type="password" required className="rounded-none rounded-l-lg bg-green-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </span>
                </div>
                <div className="flex ">
                  <input type="password" required className="rounded-none rounded-l-lg bg-green-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="Repeat Your Password" value={repetPassword} onChange={(e) => setRepetPassword(e.target.value)} />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </span>
                </div>
                <div>
                  <div className="flex justify-between mt-2 flex-col">
                    <div className="">
                      {" "}
                      <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-second checked:border-second focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" required id="flexCheckDefault" />
                      <label className="form-check-label inline-block text-gray-800 font-semibold" htmlFor="flexCheckDefault">
                        I agree all statements in
                        <span className="underline ml-1">Terms of service</span>
                      </label>
                    </div>
                    <div className="">
                      {" "}
                      <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-second checked:border-second focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" onChange={(e) => setRole(!role)} />
                      <label className="form-check-label inline-block text-gray-800 font-semibold" htmlFor="flexCheckDefault">
                        Register as a Teacher ?
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div>
                  <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-main text-fill mt-8  flex justify-center items-center" disabled={isLoading}>
                  {isLoading && <svg class="animate-spin h-5 w-5 mr-3 text-white rounded-full border-4 border-solid border-r-transparent s motion-reduce:animate-[spin_1.5s_linear_infinite]" viewBox="0 0 24 24"></svg>}
                    <span> Sign Up</span>
                  </button>
                </div>
              </div>
              <div className="mt-2">{error && <Error message={error} />}</div>
            </form>
          </div>
          <p className="px-6 text-sm text-center  align-bottom pb-2">
            Already have an account?
            <Link to="/" className="hover:underline text-second font-bold ml-1">
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
