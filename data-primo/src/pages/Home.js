import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CategoryIcon from "@mui/icons-material/Category";
import DatabaseIcon from "@mui/icons-material/Storage";
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate();

    const handleManageCategories=()=>{
        navigate("/manageCategories");
    }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      {/* Header */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mr={1}>
          Welcome to
        </Typography>
        <Box
          width={175}
          height={50}
          bgcolor="black"
          color="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontWeight="bold"
          fontSize={30}
          borderRadius={4}
        >
          Dataprimo
        </Box>
      </Box>

      {/* Buttons Section */}
      <Box
        display="flex"
        justifyContent="center"
        gap={4}
        flexWrap="wrap"
        maxWidth="800px"
        mt={2}
      >
        {/* Add Rules Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "180px",
            width: "220px",
            fontSize: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "capitalize",
            transition: "transform 0.3s ease",
            background: "linear-gradient(90deg, #56CCF2, #2F80ED)",
            "&:hover": {
              transform: "scale(1.1)", // Zoom effect
            },
          }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: 50, mb: 1 }} />
          Add Rules
        </Button>

        {/* Manage Categories Button */}
        <Button
          variant="contained"
          sx={{
            height: "180px",
            width: "220px",
            fontSize: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "capitalize",
            transition: "transform 0.3s ease",
            background: "linear-gradient(90deg, #56CCF2, #2F80ED)",
            
            "&:hover": {
              transform: "scale(1.1)", // Zoom effect
            },
          }}
          onClick={handleManageCategories}
        >
          <CategoryIcon sx={{ fontSize: 50, mb: 1 }} />
          Manage Categories
        </Button>

        {/* Manage Database Button */}
        <Button
          variant="contained"
          color="secondary"
          sx={{
            height: "180px",
            width: "220px",
            fontSize: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "capitalize",
            transition: "transform 0.3s ease",
            background: "linear-gradient(90deg, #56CCF2, #2F80ED)",
            "&:hover": {
              transform: "scale(1.1)", // Zoom effect
            },
          }}
        >
          <DatabaseIcon sx={{ fontSize: 50, mb: 1 }} />
          Manage Database
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
