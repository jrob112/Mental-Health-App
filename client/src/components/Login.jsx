import React from "react";

const Login = () => {
  return (
    <>
      <h1> Google Login </h1>
      Click here to authenticate with Google
      <form action="/auth/google" method="GET">
        <button type="submit"> GOOGLE BUTTON </button>
      </form>
    </>
  )
}

export default Login;
