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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon

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
  const [allRules, setAllRules] = useState([]);
  const [filteredRules, setFilteredRules] = useState([]);
  const [ruleDescription, setRuleDescription] = useState("");

  // Other form states
  const [tableName, setTableName] = useState("");
  const [columnName, setColumnName] = useState("");
  const [columnRuleParameter, setColumnRuleParameter] = useState("");

  // State to hold submitted data
  const [submittedData, setSubmittedData] = useState([]);

  // State to track if we're editing an entry
  const [editingIndex, setEditingIndex] = useState(null);

  // State for form submission message and table visibility
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load initial data into state when the component mounts
  useEffect(() => {
    const storedRules = JSON.parse(localStorage.getItem("rules")) || initialRules;
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) ||
      [...new Set(storedRules.map((rule) => rule.category))];
    const storedData = JSON.parse(localStorage.getItem("submittedData")) || [];

    setAllRules(storedRules);
    setCategories(storedCategories);
    setSubmittedData(storedData);
  }, []);

  // Update filtered rules based on selected category
  useEffect(() => {
    if (category) {
      const filtered = allRules.filter((rule) => rule.category === category);
      setFilteredRules(filtered);
    } else {
      setFilteredRules([]);
    }
  }, [category, allRules]);

  // Handle form submission
  const handleSubmit = () => {
    if (!category || !ruleDescription || !tableName || !columnName) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    const formData = {
      category,
      rule_description: ruleDescription,
      table_name: tableName,
      column_name: columnName,
      column_rule_parameter: columnRuleParameter || null, // Default to null if empty
    };

    let updatedData = [...submittedData];

    if (editingIndex !== null) {
      // Update existing entry
      updatedData[editingIndex] = formData;
      setEditingIndex(null); // Reset editing index
    } else {
      // Add new entry
      updatedData.push(formData);
    }

    // Save updated data to localStorage
    localStorage.setItem("submittedData", JSON.stringify(updatedData));

    // Update state with the new list
    setSubmittedData(updatedData);

    // Reset form fields after submission
    setCategory("");
    setRuleDescription("");
    setTableName("");
    setColumnName("");
    setColumnRuleParameter("");

    // Set submission state
    setIsSubmitted(true);
  };

  // Handle editing an entry
  const handleEdit = (index) => {
    const dataToEdit = submittedData[index];
    setCategory(dataToEdit.category);
    setRuleDescription(dataToEdit.rule_description);
    setTableName(dataToEdit.table_name);
    setColumnName(dataToEdit.column_name);
    setColumnRuleParameter(dataToEdit.column_rule_parameter);
    setEditingIndex(index); // Set the index to indicate we're editing
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    // Reset the form fields and exit edit mode
    setCategory("");
    setRuleDescription("");
    setTableName("");
    setColumnName("");
    setColumnRuleParameter("");
    setEditingIndex(null); // Reset editing index
  };

  // Handle deleting an entry
  const handleDelete = (index) => {
    let updatedData = [...submittedData];
    updatedData.splice(index, 1); // Remove the entry at the specified index

    // Save updated data to localStorage
    localStorage.setItem("submittedData", JSON.stringify(updatedData));

    // Update state with the new list
    setSubmittedData(updatedData);
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
      <Box display="flex" gap={4} justifyContent="center" mb={3}>
        {/* Category Dropdown */}
        <FormControl sx={{ width: "300px" }} variant="outlined" required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category *"
          >
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Rule Description Dropdown */}
        <FormControl sx={{ width: "300px" }} variant="outlined" required>
          <InputLabel id="rule-description-label">Column Rule Description</InputLabel>
          <Select
            labelId="rule-description-label"
            value={ruleDescription}
            onChange={(e) => setRuleDescription(e.target.value)}
            label="Column Rule Description *"
            disabled={!category} // Disable until a category is selected
          >
            {filteredRules.map((rule, index) => (
              <MenuItem key={index} value={rule.rule_description}>
                {rule.rule_description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Inputs in two rows */}
      <Box display="flex" gap={4} justifyContent="center" mb={3}>
        {/* Table Name Input */}
        <TextField
          label="Table Name"
          variant="outlined"
          sx={{ width: "300px" }}
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          required
        />

        {/* Column Name Input */}
        <TextField
          label="Column Name"
          variant="outlined"
          sx={{ width: "300px" }}
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
          required
        />
      </Box>

      {/* Column Rule Parameter Input (left aligned) */}
      <TextField
        label="Column Rule Parameter (Optional)"
        variant="outlined"
        sx={{ width: "630px", textAlign: "left" }} // Left aligned text
        value={columnRuleParameter}
        onChange={(e) => setColumnRuleParameter(e.target.value)}
      />

      {/* Submit and Cancel Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4 }}
          onClick={handleSubmit}
        >
          {editingIndex !== null ? "Update" : "Submit"}
        </Button>

        {editingIndex !== null && (
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ mt: 4 }}
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
        )}
      </Box>

      {/* Table to display submitted values */}
      <Box mt={5} width="100%" overflow="auto">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell sx={{fontWeight:"bold",}}>Category</TableCell>
                <TableCell sx={{fontWeight:"bold",}}>Column Rule Description</TableCell>
                <TableCell sx={{fontWeight:"bold",}}>Table Name</TableCell>
                <TableCell sx={{fontWeight:"bold",}}>Column Name</TableCell>
                <TableCell sx={{fontWeight:"bold",}}>Column Rule Parameter</TableCell>
                <TableCell sx={{fontWeight:"bold",}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submittedData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.category}</TableCell>
                  <TableCell>{data.rule_description}</TableCell>
                  <TableCell>{data.table_name}</TableCell>
                  <TableCell>{data.column_name}</TableCell>
                  <TableCell>{data.column_rule_parameter || "-"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Submission Confirmation */}
      {isSubmitted && (
        <Typography color="success" variant="body1" mt={3}>
          Your changes have been saved successfully!
        </Typography>
      )}
    </Box>
  );
}

export default ApplyRules;
