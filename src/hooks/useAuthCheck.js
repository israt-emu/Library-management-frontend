import {useState} from "react";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {userLoggedIn, userLoggedOut} from "../features/auth/authSlice";
// import {bookmarkViewChange} from "../features/bookmark/bookmarkSlice";
import {themeChange} from "../features/theme/themeSlice";
import {jwtVerify} from "../utils/jwtVerify";

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme"));
    // const bookmarkView = JSON.parse(localStorage.getItem("bookmarkView"));
    // check theme initially
    if (theme) {
      dispatch(themeChange(theme?.mode));
    }
    // check bookmark view initially
    // if (bookmarkView) {
    //   dispatch(bookmarkViewChange(bookmarkView?.view));
    // }
    const jwtExpired = jwtVerify();
    if (jwtExpired) {
      dispatch(userLoggedOut());
      localStorage.removeItem("auth");
    } else {
      const auth = JSON.parse(localStorage.getItem("auth"));
      dispatch(userLoggedIn({accessToken: auth?.accessToken, user: auth?.user}));
    }
    setAuthChecked(true);
  }, [dispatch]);
  return authChecked;
};
