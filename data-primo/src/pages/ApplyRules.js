import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function ApplyRules() {
  // State to store the form data
  const [ruleDescription, setRuleDescription] = useState("");
  const [tableName, setTableName] = useState("");
  const [columnName, setColumnName] = useState("");
  const [columnRuleDescription, setColumnRuleDescription] = useState("");
  const [columnRuleParameter, setColumnRuleParameter] = useState("");

  // State for rule descriptions (retrieved from localStorage)
  const [ruleOptions, setRuleOptions] = useState([]);

  // Fetch rule descriptions from localStorage when the component mounts
  useEffect(() => {
    const storedRules = JSON.parse(localStorage.getItem("rules"));
    if (storedRules) {
      const ruleDescriptions = storedRules.map(rule => rule.rule_description);
      setRuleOptions(ruleDescriptions);
    }
  }, []);

  // Handle form submission
  const handleSubmit = () => {
    const formData = {
      rule_description: ruleDescription,
      table_name: tableName,
      column_name: columnName,
      column_rule_description: columnRuleDescription,
      column_rule_parameter: columnRuleParameter,
    };

    // Convert the form data to JSON format and display in an alert
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"  // Align inputs to the left
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
      p={4}
    >
      <Typography variant="h4" fontWeight="bold" mb={5}>
        Apply Rules
      </Typography>

      {/* Rule Description Dropdown */}
      <FormControl sx={{ width: "400px", mb: 3 }} variant="outlined">
        <InputLabel id="rule-description-label">Rule Description</InputLabel>
        <Select
          labelId="rule-description-label"
          value={ruleDescription}
          onChange={(e) => setRuleDescription(e.target.value)}
          label="Rule Description"
        >
          {ruleOptions.map((rule, index) => (
            <MenuItem key={index} value={rule}>
              {rule}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Table Name Input */}
      <TextField
        label="Table Name"
        variant="outlined"
        sx={{ width: "400px", mb: 3 }}  // Set width for smaller text box
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
      />

      {/* Column Name Input */}
      <TextField
        label="Column Name"
        variant="outlined"
        sx={{ width: "400px", mb: 3 }}  // Set width for smaller text box
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
      />

      {/* Column Rule Description Input */}
      <TextField
        label="Column Rule Description"
        variant="outlined"
        sx={{ width: "400px", mb: 3 }}  // Set width for smaller text box
        value={columnRuleDescription}
        onChange={(e) => setColumnRuleDescription(e.target.value)}
      />

      {/* Column Rule Parameter Input */}
      <TextField
        label="Column Rule Parameter"
        variant="outlined"
        sx={{ width: "400px", mb: 3 }}  // Set width for smaller text box
        value={columnRuleParameter}
        onChange={(e) => setColumnRuleParameter(e.target.value)}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 4 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
}

export default ApplyRules;
