import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useUpdateUserMutation} from "../../features/auth/authApi";
import Error from "../ui/Error";

const UpdateUser = () => {
  const {user} = useSelector((state) => state.auth);
  const {role, session, year, term, studentId, designation, educationalQualification, permanantAddress, currentAddress, experience, contactNumber, imageURL} = user || {};
  const [updateUser, {data, isSuccess, isError}] = useUpdateUserMutation();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleOnchange = (e) => {
    userData[e.target.name] = e.target.value;
    setUserData({...userData});
  };
  const handleSubmit = () => {
    updateUser({email: user?.email, data: userData});
  };
  console.log(data);
  useEffect(() => {
    if (data?.status === "success" && isSuccess) {
      navigate("/dashboard/user");
      setError("");
    } else if (!isSuccess && isError) {
      setError("There was an error occured!");
    }
  }, [data, isSuccess, isError, error, navigate]);
  return (
    <div>
      <section className="py-6 bg-gray-100 text-gray-900">
        <div className="px-5">
          <h1 className="text-4xl font-bold my-8">Update Profile</h1>
        </div>
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x mb-8">
          <div className="py-6 md:py-0 md:px-6">
            <div className="">
              {role != "teacher" && (
                <label className="block mb-1">
                  <span className="my-2">Session</span>
                  <input onChange={handleOnchange} type="text" name="session" placeholder="Session" defaultValue={session} className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
                </label>
              )}

              {role != "teacher" && (
                <label className="block mb-1">
                  <span className="my-2">Term</span>
                  <textarea onChange={handleOnchange} name="term" type="number" placeholder="Term" defaultValue={term} className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
                </label>
              )}

              <label className="block mb-1">
                <span className="my-2">Designation</span>
                <input onChange={handleOnchange} name="designation" type="text" placeholder="" defaultValue={designation} className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
              </label>
              <label className="block mb-1">
                <span className="my-2">Educational Qualification</span>
                <input onChange={handleOnchange} name="educationalQualification" type="text" defaultValue={educationalQualification} className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
              </label>
              <label className="block mb-1">
                <span className="my-2">Contact Number</span>
                <input onChange={handleOnchange} name="contactNumber" type="text" placeholder="01____" defaultValue={contactNumber} className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
              </label>
            </div>
          </div>
          <div className="py-6 md:py-0 md:px-6">
            {role != "teacher" && (
              <label className="block mb-1">
                <span className="my-2">Year</span>
                <input onChange={handleOnchange} name="year" type="number" placeholder="Year" defaultValue={year} className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
              </label>
            )}
            <label className="block mb-1">
              <span className="my-2">Experience</span>
              <input onChange={handleOnchange} name="experience" type="text" defaultValue={experience} placeholder="Experience" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
            </label>
            <label className="block mb-1">
              <span className="my-2">Permanant Address</span>
              <input onChange={handleOnchange} name="permanantAddress" type="text" defaultValue={permanantAddress} placeholder="Parmanent address" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
            </label>
            <label className="block mb-1">
              <span className="my-2">Current Address</span>
              <input onChange={handleOnchange} name="currentAddress" type="text" defaultValue={currentAddress} placeholder="Current Address" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
            </label>
            <label className="block mb-1">
              <span className="my-2">Image URL</span>
              <input onChange={handleOnchange} name="imageURL" defaultValue={imageURL} type="text" placeholder="Image Link" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={handleSubmit} type="button" className=" px-8 py-2 text-lg rounded bg-main text-white">
            Submit
          </button>
        </div>
        {error !== "" && <Error message={error} />}
      </section>
    </div>
  );
};

export default UpdateUser;
