import React from "react";
import LeftSideContent from "../components/login/LeftSideContent";
import LoginForm from "../components/login/LoginForm";

const Index = () => {
  return (
    <div>
      <div className="bg-white grid md:grid-cols-10 ">
        <LeftSideContent />
        <LoginForm />
      </div>
      {/* login form  */}
    </div>
  );
};

export default Index;
