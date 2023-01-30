const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
export const jwtVerify = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth) {
    const decodedJwt = parseJwt(auth?.accessToken);
    if (decodedJwt?.exp * 1000 < Date.now()) {
      return true;
    }
    return false;
  }
};
