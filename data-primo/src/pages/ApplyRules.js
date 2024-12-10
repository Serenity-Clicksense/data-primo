import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ApplyRules() {
  // State for database selection
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const databases = ["Database 1", "Database 2", "Database 3"]; // Example database options

  // Categories and rules
  const categories = [
    {
      name: "Category 1",
      rules: ["Rule 1", "Rule 2", "Rule 3"],
    },
    {
      name: "Category 2",
      rules: ["Rule 4", "Rule 5"],
    },
    {
      name: "Category 3",
      rules: ["Rule 6", "Rule 7", "Rule 8", "Rule 9"],
    },
  ];

  // State for selected rules
  const [selectedRules, setSelectedRules] = useState([]);

  // Handle database selection
  const handleDatabaseChange = (event) => {
    setSelectedDatabase(event.target.value);
  };

  // Handle rule selection (toggle chip selection)
  const handleRuleToggle = (rule) => {
    setSelectedRules((prev) =>
      prev.includes(rule) ? prev.filter((r) => r !== rule) : [...prev, rule]
    );
  };

  // Submit selected rules
  const handleSubmit = () => {
    if (selectedDatabase === "") {
      alert("Please select a database.");
    } else {
      alert(
        `Applying rules to ${selectedDatabase}: ${selectedRules.join(", ")}`
      );
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="top"
      minHeight="100vh"
      bgcolor="#f9f9f9"
      p={4}
    >
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" mb={5}>
        Apply Rules
      </Typography>

      {/* Database Selector */}
      <FormControl sx={{ minWidth: "300px", mb: 4 }} variant="outlined">
        <InputLabel id="database-selector-label">Select Database</InputLabel>
        <Select
          labelId="database-selector-label"
          value={selectedDatabase}
          onChange={handleDatabaseChange}
          label="Select Database"
        >
          {databases.map((db, index) => (
            <MenuItem key={index} value={db}>
              {db}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Categories as Accordion */}
      <Box width="100%" maxWidth="800px">
        {categories.map((category, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`category-${index}-content`}
              id={`category-${index}-header`}
            >
              <Typography fontWeight="bold">{category.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Rules as Chips */}
              <Box display="flex" flexWrap="wrap" gap={1}>
                {category.rules.map((rule, idx) => (
                  <Chip
                    key={idx}
                    label={rule}
                    clickable
                    color={selectedRules.includes(rule) ? "primary" : "default"}
                    onClick={() => handleRuleToggle(rule)}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 4 }}
        onClick={handleSubmit}
      >
        Apply Rules
      </Button>
    </Box>
  );
}

export default ApplyRules;
