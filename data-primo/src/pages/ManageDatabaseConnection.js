import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";

function ManageDatabaseConnection() {
  // Array of database names
  const databases = [
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "SQL Server",
    "Oracle Database",
    "Firebase",
    "SQLite",
    "Redis",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f9f9f9",
        p: 3,
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={4}
        sx={{ color: "#333" }}
      >
        Manage Database Connection
      </Typography>

      {/* Database Cards */}
      <Grid container spacing={3} justifyContent="center">
        {databases.map((db, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                maxWidth: 300,
                textAlign: "center",
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)", // Slight zoom effect on hover
                },
              }}
            >
              <CardMedia>
                <StorageIcon
                  sx={{ fontSize: 60, color: "#1976d2", mt: 2 }}
                />
              </CardMedia>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {db}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ManageDatabaseConnection;
