import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Input,
} from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function SourceDatabase() {
  // Array of database names with allowed file types
  const databases = [
    { name: "MySQL", fileTypes: [".sql"] },
    { name: "PostgreSQL", fileTypes: [".sql"] },
    { name: "MongoDB", fileTypes: [".json"] },
    { name: "SQL Server", fileTypes: [".sql"] },
    { name: "Oracle Database", fileTypes: [".sql"] },
    { name: "Amazon S3", fileTypes: [".json", ".csv"] },
    { name: "Amazon EC2", fileTypes: [".pem", ".key"] },
    { name: "Amazon RDS", fileTypes: [".sql"] },
  ];

  // State for selected database and allowed file types
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [allowedFileTypes, setAllowedFileTypes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");

  // Ref for the file input
  const fileInputRef = useRef();

  // Handle card click to set the database and allowed file types
  const handleCardClick = (db) => {
    setSelectedDatabase(db.name);
    setAllowedFileTypes(db.fileTypes);
    setFileError("");
    setSelectedFile(null);
  };

  // Handle file upload and validate file type
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileExtension = `.${file.name.split(".").pop()}`.toLowerCase();

      if (allowedFileTypes.includes(fileExtension)) {
        setSelectedFile(file);
        setFileError("");
        alert(`File "${file.name}" successfully uploaded for ${selectedDatabase}.`);
      } else {
        setFileError(
          `Invalid file type "${fileExtension}". Allowed types for ${selectedDatabase}: ${allowedFileTypes.join(", ")}`
        );
        setSelectedFile(null);
      }
    }

    // Reset the file input value to ensure the `onChange` event fires again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle Upload File button click (if no database selected)
  const handleUploadButtonClick = () => {
    if (!selectedDatabase) {
      alert(
        "Please select a database card first.\n\nFile types allowed:\n" +
          databases
            .map((db) => `${db.name}: ${db.fileTypes.join(", ")}`)
            .join("\n")
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
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
        Source Database
      </Typography>

      {/* Upload File Button */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          color="primary"
          onClick={handleUploadButtonClick}
          component={selectedDatabase ? "label" : "button"}
        >
          Upload File
          {selectedDatabase && (
            <Input
              type="file"
              sx={{ display: "none" }}
              accept={allowedFileTypes.join(",")}
              onChange={handleFileChange}
              inputRef={fileInputRef} // Attach the ref here
            />
          )}
        </Button>
      </Box>

      {/* Display File Error */}
      {fileError && (
        <Typography variant="body2" sx={{ color: "red", mb: 2 }}>
          {fileError}
        </Typography>
      )}

      {/* File Upload Confirmation */}
      {selectedFile && (
        <Typography
          variant="body2"
          sx={{ color: "green", mb: 2, textAlign: "center" }}
        >
          File "{selectedFile.name}" uploaded successfully for {selectedDatabase}.
        </Typography>
      )}

      {/* Database Cards */}
      <Grid container spacing={3} justifyContent="center">
        {databases.map((db, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={() => handleCardClick(db)}
              sx={{
                maxWidth: 300,
                textAlign: "center",
                boxShadow: 3,
                cursor: "pointer",
                outline: selectedDatabase === db.name ? "3px solid #1976d2" : "none",
                transition: "transform 0.3s, outline 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardMedia>
                <StorageIcon sx={{ fontSize: 60, color: "#1976d2", mt: 2 }} />
              </CardMedia>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {db.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SourceDatabase;
