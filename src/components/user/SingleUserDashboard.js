import React, { useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import UserBorrowedBookTable from "../tables/UserBorrowedBookTable";
import { useFindBorrowedBookByUserIdQuery } from "../../features/boorowedBook/borrowedBookApi";
import { Link, useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../../features/auth/authApi";
import { MdCircleNotifications } from "react-icons/md";
import AddNotificationModal from "../modals/AddNotificationModal";

const SingleUserDashboard = () => {
  const [addNotificationModal, setAddNotificationModal] = useState(false);
  const params = useParams();
  const { email: userEmail } = params || {};
  console.log(userEmail);
  const { data: user, error } = useGetSingleUserQuery(userEmail);
  console.log(user?.users, error);
  const {
    name,
    role,
    email,
    createdAt,
    updatedAt,
    _id: id,
    status,
    studentId,
    session,
    year,
    term,
    educationalQualification,
    permanantAddress,
    currentAddress,
    experience,
    contactNumber,
    imageURL,
  } = user?.users || {};
  const { data: borrowedBooks } = useFindBorrowedBookByUserIdQuery(id);

  return (
    <div className="my-5">
      <div className="flex items-center space-x-2">
        <h1 className="font-medium">{name}'s Dashboard</h1>
        <button
          type="button"
          className="p-1 rounded-full hover:bg-gray-300 text-lg text-black"
          title="Notification"
          onClick={() => setAddNotificationModal(true)}
        >
          <MdCircleNotifications className="w-8 h-8" />
        </button>
      </div>

      <div className="container mx-auto py-5">
        <div className="md:flex no-wrap md:-mx-2">
          {/* <!-- Left Side --> */}
          <div className="w-full md:w-4/12 md:mx-2">
            {/* <!-- Profile Card --> */}
            <div className="bg-white p-3 border-t-4 border-main">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto"
                  src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                  alt=""
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {name}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">
                {role?.toUpperCase()}
              </h3>

              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span
                      className={`${
                        status == "active" ? "bg-green-500" : "bg-red-500"
                      } py-1 px-2 rounded text-white text-sm`}
                    >
                      {status?.toUpperCase()}
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">
                    {" "}
                    <Moment format="D MMM YYYY" withTitle>
                      {createdAt}
                    </Moment>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Last Update</span>
                  <span className="ml-auto">
                    {" "}
                    <Moment format="D MMM YYYY" withTitle>
                      {updatedAt}
                    </Moment>
                  </span>
                </li>
              </ul>
            </div>
            {/* <!-- End of profile card --> */}
            <div className="my-4"></div>
            {/* <!-- Friends card --> */}

            {/* <!-- End of friends card --> */}
          </div>
          {/* <!-- Right Side --> */}
          <div className="w-full md:w-8/12 mx-2 h-64">
            {/* <!-- Profile tab -->
                <!-- About Section --> */}
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Name</div>
                    <div className="px-4 py-2">{name}</div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2"> {contactNumber}</div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Student Id</div>
                    <div className="px-4 py-2"> {studentId}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Session</div>
                    <div className="px-4 py-2"> {session}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Year</div>
                    <div className="px-4 py-2"> {year}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Term</div>
                    <div className="px-4 py-2"> {term}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Current Address
                    </div>
                    <div className="px-4 py-2 break-words">
                      {currentAddress}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Parmanant Address
                    </div>
                    <div className="px-4 py-2">{permanantAddress}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email.</div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800"
                        href="mailto:jane@example.com"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!-- Experience and education --> */}
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="grid grid-cols-2">
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span clas="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">Experience</span>
                      </div>
                      <ul className="list-inside space-y-2">
                        <li>
                          <div className="text-teal-600">{experience}</div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span clas="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path
                              fill="#fff"
                              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">Education</span>
                      </div>
                      <ul className="list-inside space-y-2">
                        <li>
                          <div className="text-teal-600">
                            {educationalQualification}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End of about section --> */}

            <div className="my-4"></div>
          </div>
        </div>
        <div className="mt-28">
          <UserBorrowedBookTable data={borrowedBooks?.borrowedBooks} id={id} />
        </div>
      </div>
      <AddNotificationModal
        user={user?.users?._id}
        notificationModal={addNotificationModal}
        setNotificationModal={setAddNotificationModal}
      />
    </div>
  );
};

export default SingleUserDashboard;
