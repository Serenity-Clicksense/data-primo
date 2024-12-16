import React from "react";
import { Box, Typography, Button, Card } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CategoryIcon from "@mui/icons-material/Category";
import DatabaseIcon from "@mui/icons-material/Storage";
import GavelIcon from "@mui/icons-material/Gavel";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";

function Home() {
  const navigate = useNavigate();

  const handleManageCategories = () => {
    navigate("/manageCategories");
  };
  const handleManageRules = () => {
    navigate("/manageRules");
  };
  const handleApplyRules = () => {
    navigate("/applyRules");
  };
  const handleSourceDatabase = () => {
    navigate("/SourceDatabase");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="75vh" // This makes sure the height takes the full screen
      bgcolor="#f9f9f9"
      p={3}
      overflow="hidden" // Prevents scrolling
    >
      {/* Welcome Header */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mr={1}>
          Welcome to
        </Typography>
        <img
          src={logo1}
          alt="Dataprimo"
          style={{ height: "50px", width: "auto", marginLeft: "-30px" }}
        />
      </Box>

      {/* Vision, Tagline, and Mission Section */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={4}
        mb={5}
        mt={-1}
      >
        {/* Tagline */}
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            color="textSecondary"
            sx={{ minWidth: 200 }}
          >
            Your Data in Focus
          </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={4}
        mb={5}
      >
        {/* Vision Card */}
        <Card
          sx={{
            width: "440px", // Same width as buttons
            height: "180px", // Same height as buttons
            boxShadow: 3,
            borderRadius: "12px",
            p: 2,
            textAlign: "center",
            backgroundColor: "#e3f2fd", // Light blue
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="#1976D2" // Dark blue text
            mb={2}
            sx={{ textTransform: "uppercase" }}
          >
            Vision
          </Typography>
          <Typography variant="body1" color="textSecondary">
            "To be the trusted source of accurate and reliable data, empowering
            informed decisions and driving business excellence."
          </Typography>
        </Card>



        {/* Mission Card */}
        <Card
          sx={{
            width: "440px", // Same width as buttons
            height: "180px", // Same height as buttons
            boxShadow: 3,
            borderRadius: "12px",
            p: 2,
            textAlign: "center",
            backgroundColor: "#e8f5e9", // Light green
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="#2E7D32" // Dark green text
            mb={2}
            sx={{ textTransform: "uppercase" }}
          >
            Mission
          </Typography>
          <Typography variant="body1" color="textSecondary">
            "To ensure the highest standards of data integrity and accuracy
            through continuous improvement, innovative solutions, and a
            commitment to excellence in data management."
          </Typography>
        </Card>
      </Box>
      
              

      {/* Buttons Section */}
      <Box
        display="flex"
        justifyContent="center"
        gap={4}
        flexWrap="nowrap"
        mt={2}
        maxWidth="100%"
        overflow="hidden"
      >
        {/* Manage Rules */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "180px",
            width: "220px", // Same size as cards
            fontSize: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "capitalize",
            transition: "transform 0.3s ease",
            background: "linear-gradient(90deg, #56CCF2, #2F80ED)",
            "&:hover": { transform: "scale(1.05)" },
          }}
          onClick={handleManageRules}
        >
          <AddCircleOutlineIcon sx={{ fontSize: 50, mb: 1 }} />
          Manage Rules
        </Button>

        {/* Manage Categories */}
        <Button
          variant="contained"
          sx={{
            height: "180px",
            width: "220px", // Same size as cards
            fontSize: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "capitalize",
            transition: "transform 0.3s ease",
            background: "linear-gradient(90deg, #56CCF2, #2F80ED)",
            "&:hover": { transform: "scale(1.05)" },
          }}
          onClick={handleManageCategories}
        >
          <CategoryIcon sx={{ fontSize: 50, mb: 1 }} />
          Manage Categories
        </Button>

        {/* Source Database */}
        <Button
          variant="contained"
          color="secondary"
          sx={{
            height: "180px",
            width: "220px", // Same size as cards
            fontSize: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "capitalize",
            transition: "transform 0.3s ease",
            background: "linear-gradient(90deg, #56CCF2, #2F80ED)",
            "&:hover": { transform: "scale(1.05)" },
          }}
          onClick={handleSourceDatabase}
        >
          <DatabaseIcon sx={{ fontSize: 50, mb: 1 }} />
          Source Database
        </Button>

        {/* Apply Rules */}
        <Button
          variant="contained"
          color="success"
          sx={{
            height: "180px",
            width: "220px", // Same size as cards
            fontSize: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "capitalize",
            transition: "transform 0.3s ease",
            background: "linear-gradient(90deg, #56CCF2, #2F80ED)",
            "&:hover": { transform: "scale(1.05)" },
          }}
          onClick={handleApplyRules}
        >
          <GavelIcon sx={{ fontSize: 50, mb: 1 }} />
          Apply Rules
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
