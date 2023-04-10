import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      style={{
        fontFamily: "Comfortaa",
        fontSize: 12,
        fontWeight: "bold",
        // backgroundColor: "#FFFFFF",
      }}
    >
      Log In
    </button>
  );
};

export default LoginButton;
