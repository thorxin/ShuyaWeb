import React from "react";

//images
import AuthLoading from "../../../assets/Authentication/Loading/auth_loading.gif"

export default function AuthenticationLoading() {
  return (
    <>
      <img
        src={AuthLoading}
        className="w-6 h-auto mx-auto"
        alt="AuthenticationLoading"
      />
    </>
  );
}
