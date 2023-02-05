import React from "react";
import {useSelector} from "react-redux";
import LoginForm from "../components/login/LoginForm";
import RightSideContent from "../components/login/RightSideContent";

const Index = () => {
  const theme = useSelector((state) => state?.theme?.themeMode);

  return (
    <div>
      <div className={`${theme === "dark" ? "theme-dark" : "theme-light"} bg-fill h-screen  grid md:grid-cols-2 `}>
        <LoginForm />
        <RightSideContent />
      </div>
      {/* login form  */}
    </div>
  );
};

export default Index;
