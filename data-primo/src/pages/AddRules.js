import React, { useState } from "react";
import { Box, Typography, TextField, IconButton, List, ListItem, ListItemText, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";

function AddRules() {
  // States to manage the rules list, search term, and input fields
  const [rules, setRules] = useState([
    { ruleName: "Rule 1", sqlString: "SELECT * FROM table1;" },
    { ruleName: "Rule 2", sqlString: "SELECT * FROM table2;" },
  ]);
  const [ruleName, setRuleName] = useState("");
  const [sqlString, setSqlString] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null); // Track the selected rule index

  // Add a new rule or update an existing rule
  const handleAddRule = () => {
    if (ruleName && sqlString) {
      if (selectedIndex === null) {
        // If no rule is selected, add a new rule
        setRules([...rules, { ruleName, sqlString }]);
      } else {
        // If a rule is selected, update the existing rule
        const updatedRules = [...rules];
        updatedRules[selectedIndex] = { ruleName, sqlString };
        setRules(updatedRules);
      }
      resetForm(); // Reset form after adding/updating
    }
  };

  // Delete a rule from the list
  const handleDeleteRule = (index) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  // Filter rules based on search term
  const filteredRules = rules.filter((rule) =>
    rule.ruleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.sqlString.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input change for SQL string (to manage line breaks)
  const handleSqlChange = (e) => {
    setSqlString(e.target.value);
  };

  // Handle rule edit to populate fields for editing
  const handleEditRule = (index) => {
    setSelectedIndex(index); // Set the selected rule index
    setRuleName(rules[index].ruleName); // Populate rule name field
    setSqlString(rules[index].sqlString); // Populate SQL string field
  };

  // Reset the form (for adding new rule or canceling edit)
  const resetForm = () => {
    setRuleName("");
    setSqlString("");
    setSelectedIndex(null); // Reset selected index when form is reset
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="top"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Manage Rules
      </Typography>

      {/* Search Input Field */}
      <TextField
        label="Search Rules"
        variant="outlined"
        fullWidth
        sx={{ maxWidth: "600px", mb: 4 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* List of rules */}
      <Box width="80%" mb={4}>
        <List sx={{ maxHeight: "400px", overflowY: "auto" }}>
          {filteredRules.map((rule, index) => (
            <ListItem
              key={index}
              sx={{
                borderBottom: "1px solid #ddd",
                paddingY: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "45%" }}>
                <ListItemText primary={rule.ruleName} />
              </Box>
              <Box sx={{ width: "45%" }}>
                <ListItemText secondary={rule.sqlString} />
              </Box>
              <Box display="flex" alignItems="center">
                {/* Edit Icon Button */}
                <IconButton onClick={() => handleEditRule(index)}>
                  <EditIcon />
                </IconButton>
                {/* Delete Icon Button */}
                <IconButton onClick={() => handleDeleteRule(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Input fields for adding or editing a rule */}
      <Box width="80%" display="flex" gap={2} mb={3}>
        <TextField
          label="Rule Name"
          variant="outlined"
          size="small"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          sx={{ width: "100%" }}
        />
      </Box>

      {/* Input field for SQL string with multiline behavior */}
      <Box width="80%" display="flex" gap={2} mb={3}>
        <TextField
          label="SQL String"
          variant="outlined"
          size="small"
          value={sqlString}
          onChange={handleSqlChange}
          multiline
          minRows={4} // Set minimum rows for visibility
          sx={{ width: "100%" }}
        />
        <IconButton onClick={handleAddRule} color="primary">
          {selectedIndex === null ? (
            <AddCircleIcon fontSize="large" />
          ) : (
            <EditIcon fontSize="large" />
          )}
        </IconButton>
      </Box>

      {/* Cancel Button to Reset to Add New Rule */}
      {selectedIndex !== null && (
        <Button onClick={resetForm} color="secondary" variant="outlined">
          Cancel Edit
        </Button>
      )}
    </Box>
  );
}

export default AddRules;
