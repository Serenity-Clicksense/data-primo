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

// Default initial rules
const initialRules = [
  { rule_description: "Check for alphabetic data", category: "Data Type Checks" },
  { rule_description: "Check for alphanumeric data", category: "Data Type Checks" },
  { rule_description: "Check for Numeric data", category: "Data Type Checks" },
  { rule_description: "Date format MM/DD/YY", category: "Date Format Checks" },
  { rule_description: "Date format YYYY-MM-DD", category: "Date Format Checks" },
  { rule_description: "Email check", category: "Pattern Checks" },
  { rule_description: "Empty check", category: "Data Integrity Checks" },
  { rule_description: "Greater than", category: "Comparison Checks" },
  { rule_description: "Greater than or equal", category: "Comparison Checks" },
  { rule_description: "Less than", category: "Comparison Checks" },
  { rule_description: "Less than or equal", category: "Comparison Checks" },
  { rule_description: "Not equal", category: "Comparison Checks" },
  { rule_description: "Null check", category: "Data Integrity Checks" },
  { rule_description: "Unique check", category: "Data Integrity Checks" },
  { rule_description: "Custom check", category: "Custom Checks" },
];

function ApplyRules() {
  // States for categories, rules, and filtered rules
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [allRules, setAllRules] = useState([]); // All rules loaded from localStorage or initialRules
  const [filteredRules, setFilteredRules] = useState([]); // Rules filtered by selected category
  const [ruleDescription, setRuleDescription] = useState("");

  // Other form states
  const [tableName, setTableName] = useState("");
  const [columnName, setColumnName] = useState("");
  const [columnRuleDescription, setColumnRuleDescription] = useState("");
  const [columnRuleParameter, setColumnRuleParameter] = useState("");

  // Load initial data into state when the component mounts
  useEffect(() => {
    const storedRules = JSON.parse(localStorage.getItem("rules")) || initialRules;
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) ||
      [...new Set(storedRules.map((rule) => rule.category))];

    setAllRules(storedRules); // Load all rules
    setCategories(storedCategories); // Load all categories
  }, []);

  // Update filtered rules based on selected category
  useEffect(() => {
    if (category) {
      const filtered = allRules.filter((rule) => rule.category === category);
      setFilteredRules(filtered);
    } else {
      setFilteredRules([]); // Clear the filtered rules if no category is selected
    }
  }, [category, allRules]);

  // Handle form submission
  const handleSubmit = () => {
    const formData = {
      category,
      rule_description: ruleDescription,
      table_name: tableName,
      column_name: columnName,
      // column_rule_description: columnRuleDescription,
      column_rule_parameter: columnRuleParameter,
    };

    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      minHeight="100vh"
      bgcolor="#f9f9f9"
      p={4}
    >
      <Typography variant="h4" fontWeight="bold" mb={5}>
        Apply Rules
      </Typography>

      {/* Category Dropdown */}
      <FormControl sx={{ width: "400px", mb: 3 }} variant="outlined">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          {categories.map((cat, index) => (
            <MenuItem key={index} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Rule Description Dropdown */}
      <FormControl sx={{ width: "400px", mb: 3 }} variant="outlined">
        <InputLabel id="rule-description-label">Column Rule Description</InputLabel>
        <Select
          labelId="rule-description-label"
          value={ruleDescription}
          onChange={(e) => setRuleDescription(e.target.value)}
          label="Rule Description"
          disabled={!category} // Disable until a category is selected
        >
          {filteredRules.map((rule, index) => (
            <MenuItem key={index} value={rule.rule_description}>
              {rule.rule_description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Table Name Input */}
      <TextField
        label="Table Name"
        variant="outlined"
        sx={{ width: "400px", mb: 3 }}
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
      />

      {/* Column Name Input */}
      <TextField
        label="Column Name"
        variant="outlined"
        sx={{ width: "400px", mb: 3 }}
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
      />

      {/* Column Rule Description Input */}
      {/* <TextField
        label="Column Rule Description"
        variant="outlined"
        sx={{ width: "400px", mb: 3 }}
        value={columnRuleDescription}
        onChange={(e) => setColumnRuleDescription(e.target.value)}
      /> */}

      {/* Column Rule Parameter Input */}
      <TextField
        label="Column Rule Parameter"
        variant="outlined"
        sx={{ width: "400px", mb: 3 }}
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
