import React, { useState } from "react";
import { Box, Typography, TextField, IconButton, List, ListItem, ListItemText, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function AddRules() {
  // States to manage the rules list, search term, and input fields
  const [rules, setRules] = useState([
    { ruleName: "Rule 1", sqlString: "SELECT * FROM table1;" },
    { ruleName: "Rule 2", sqlString: "SELECT * FROM table2;" },
  ]);
  const [ruleName, setRuleName] = useState("");
  const [sqlString, setSqlString] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Add a new rule
  const handleAddRule = () => {
    if (ruleName && sqlString) {
      setRules([...rules, { ruleName, sqlString }]);
      setRuleName(""); // Clear input after adding
      setSqlString(""); // Clear input after adding
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
              <IconButton onClick={() => handleDeleteRule(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
      </Box>

      {/* Input fields for adding new rule */}
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
        <IconButton
          onClick={handleAddRule}
          color="primary"
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default AddRules;
