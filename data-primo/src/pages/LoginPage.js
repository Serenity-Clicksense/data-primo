import React from "react";
import { Box, Button, TextField, Typography, Link, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage(){
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    //authentication logic 
   
    navigate("/"); 
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      
      <Box
        width={300}
        p={4}
        bgcolor="white"
        borderRadius={2}
        boxShadow="0 2px 10px rgba(0,0,0,0.1)"
      >
        
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={2}
        >
        {/* <Typography variant="h5" textAlign="center"  fontWeight="bold" mr={1}>
          Welcome to 
        </Typography> */}
          <Box
            width={170}
            height={40}
            bgcolor="black"
            color="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontWeight="bold"
            fontSize={28}
            borderRadius={4}
          >
            Dataprimo
          </Box>
        </Box>
        
        
        <Typography variant="h5" textAlign="center"  fontWeight="bold" mb={2} color="purple">
          Login
        </Typography>
        
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          
        </Box>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #4b6cb7, #182848)",
            color: "white",
            mt: 2,
            mb: 1,
          }}
          onClick={handleLogin}
        >
          LOGIN
        </Button>
        <Typography variant="body2" textAlign="center">
          Don't have an account?{" "}
          <Link href="/signup" underline="none">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
export default LoginPage;

