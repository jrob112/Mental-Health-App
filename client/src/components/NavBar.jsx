import React from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  
  const style = {
    margin: '20px',
  }

  return (
    <Box>
      <NavLink style={style} to="/home">Healthier</NavLink>
      <NavLink style={style} to="/habits">Habits</NavLink>
      <NavLink style={style} to="/journal">Journal</NavLink>
      <NavLink style={style} to="/moods">Moods</NavLink>
    </Box>
  )
}

export default NavBar;
