import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import { Outlet, useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";

function MainLayout() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    // Implement logout logic here
    navigate("/login");
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: '#56CCF2'}}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handleNavigateHome}
          >
          <img
            src={logo2}  // Using the imported logo here
            alt="Dataprimo"
            style={{ height: '35px', width:'auto', marginLeft:"-15px"}}  // Adjust size as needed
          />
          <img
            src={logo1}  // Using the imported logo here
            alt="Dataprimo"
            style={{ height: '35px', width:'auto', marginLeft:"-20px" }}  // Adjust size as needed
          />
          </Typography>
          <IconButton
            edge="end"
            color="#F5F5F5"
            aria-label="home"
            sx={{ mr: 2 }} // Add spacing between Home and Profile icons
            onClick={handleNavigateHome}
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            edge="end"
            color="#F5F5F5"
            aria-label="profile"
            onClick={handleMenuOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
