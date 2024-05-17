import React from "react";
import { Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import { styleRedButton } from "./styles";

const Login = () => {
  return (
    <>
      <h1> Welcome to Healthier </h1>
      <h2> Your Personal Mental Health Tracker</h2>
      <h4>Sign-In or Sign-up with Google to get started</h4>
      <form action="/auth/google" method="GET">
        <Button variant="contained" type="submit" sx={styleRedButton}><GoogleIcon sx={{color: 'white', fontSize: 'xx-large'}} /></Button>
      </form>
    </>
  )
}

export default Login;
