import React from "react";
import { Box, Button, TextField, Typography, Link, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

function LoginPage(){
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
        <Typography variant="h5" textAlign="center"  fontWeight="bold" mb={2}>
          Welcome to Dataprimo
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

