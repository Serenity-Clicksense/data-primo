import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, IconButton, List, ListItem, ListItemText, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// Default initial rules (used when no data is found in localStorage)
const initialRules = [
  {
    rule_description: "Check for alphabetic data",
    rule_query: "select COUNT() AS total_records, SUM(IF(@column_name@ REGEXP '^[A-Za-z]$', 0, 1)) AS failed_records, SUM(IF(@column_name@ REGEXP '^[A-Za-z]*$', 1, 0)) AS passed_records FROM temp_view;"
  },
  {
    rule_description: "Check for alphanumeric data",
    rule_query: "select COUNT() AS total_records, SUM(IF(@column_name@ REGEXP '^[a-zA-Z0-9]$', 0, 1)) AS failed_records, SUM(IF(@column_name@ REGEXP '^[a-zA-Z0-9]*$', 1, 0)) AS passed_records FROM temp_view;"
  },
  {
    rule_description: "Check for Numeric data",
    rule_query: "select COUNT() AS total_records, SUM(IF(@column_name@ REGEXP '^[0-9]$', 0, 1)) AS failed_records, SUM(IF(@column_name@ REGEXP '^[0-9]*$', 1, 0)) AS passed_records FROM temp_view;"
  },
  {
    rule_description: "Date format MM/DD/YY",
    rule_query: "select count(*) as total_records,sum(if(@column_name@ REGEXP '^[0-9]{2}/[0-9]{2}/[0-9]{2}$',0,1)) as failed_records, sum(if(@column_name@ REGEXP '^[0-9]{2}/[0-9]{2}/[0-9]{2}$',1,0)) as passed_records from temp_view;"
  },
  {
    rule_description: "Date format YYYY-MM-DD",
    rule_query: "select count(*) as total_records,sum(if(@column_name@ REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',0,1)) as failed_records, sum(if(@column_name@ REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',1,0)) as passed_records from temp_view;"
  },
  {
    rule_description: "Email check",
    rule_query: "select count(*) as total_records,sum(if(@column_name@ REGEXP '[a-zA-Z0-9.%+-]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$',0,1)) as failed_records, sum(if(@column_name@ REGEXP '[a-zA-Z0-9.%+-]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$',1,0)) as passed_records from temp_view;"
  },
  {
    rule_description: "Empty check",
    rule_query: "select count(*) as total_records, sum(if(@column_name@='',1,0)) as failed_records, sum(if(@column_name@='',0,1)) as passed_records from temp_view;"
  },
  {
    rule_description: "Greater than",
    rule_query: "select count(*) as total_records,sum(if(@column_name@ > @parameter_1@, 0, 1)) as failed_records, sum(if(@column_name@ > @parameter_1@, 1, 0)) as passed_records from temp_view;"
  },
  {
    rule_description: "Greater than or equal",
    rule_query: "select count(*) as total_records,sum(if(@column_name@ >= @parameter_1@, 0, 1)) as failed_records, sum(if(@column_name@ >= @parameter_1@, 1,0)) as passed_records from temp_view;"
  },
  {
    rule_description: "Less than",
    rule_query: "select count(*) as total_records,sum(if(@column_name@ < @parameter_1@, 0, 1)) as failed_records, sum(if(@column_name@ < @parameter_1@, 1, 0)) as passed_records from temp_view;"
  },
  {
    rule_description: "Less than or equal",
    rule_query: "select count(*) as total_records,sum(if(@column_name@ <= @parameter_1@, 0, 1)) as failed_records, sum(if(@column_name@ <= @parameter_1@, 1, 0)) as passed_records from temp_view;"
  },
  {
    rule_description: "Not equal",
    rule_query: "select count(*) as total_records,sum(if(@column_name@ <> @parameter_1@, 1, 0)) as failed_records, sum(if(@column_name@ <> @parameter_1@, 0, 1)) as passed_records from temp_view;"
  },
  {
    rule_description: "Null check",
    rule_query: "select count(*) as total_records, sum(if(@column_name@ is null,1,0)) as failed_records, sum(if(@column_name@ is not null,1,0)) as passed_records from temp_view;"
  },
  {
    rule_description: "Unique check",
    rule_query: "select COUNT() AS total_records,COUNT() - COUNT(distinct @column_name@) AS failed_records, COUNT(distinct @column_name@) AS passed_records FROM temp_view;"
  },
  {
    rule_description: "Custom check",
    rule_query: "This is only a placeholder, as this won’t be parsed during execution."
  }
];

function ManageRules() {
  const [rules, setRules] = useState(() => {
    const storedRules = localStorage.getItem("rules");
    return storedRules ? JSON.parse(storedRules) : initialRules;
  });
  const [ruleDescription, setRuleDescription] = useState("");
  const [ruleQuery, setRuleQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle the list expansion
  const [showExpandButton, setShowExpandButton] = useState(false); // To toggle visibility of Expand button

  const listRef = useRef(null); // Ref to track the list height

  // Save the rules to localStorage whenever rules state changes
  useEffect(() => {
    localStorage.setItem("rules", JSON.stringify(rules));
  }, [rules]);

  // Check if the list content overflows
  useEffect(() => {
    if (listRef.current) {
      const isOverflowing = listRef.current.scrollHeight > listRef.current.clientHeight;
      setShowExpandButton(isOverflowing); // Show expand button only if content overflows
    }
  }, [rules, isExpanded]);

  // Add or edit a rule
  const handleAddRule = () => {
    if (ruleDescription && ruleQuery) {
      if (selectedIndex === null) {
        setRules([...rules, { rule_description: ruleDescription, rule_query: ruleQuery }]);
      } else {
        const updatedRules = [...rules];
        updatedRules[selectedIndex] = { rule_description: ruleDescription, rule_query: ruleQuery };
        setRules(updatedRules);
      }
      resetForm();
    }
  };

  // Delete a rule from the list
  const handleDeleteRule = (index) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  // Filter rules based on search term
  const filteredRules = rules.filter((rule) =>
    rule.rule_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.rule_query.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input change for rule query (to manage line breaks)
  const handleRuleQueryChange = (e) => {
    setRuleQuery(e.target.value);
  };

  // Handle rule edit to populate fields for editing
  const handleEditRule = (index) => {
    setSelectedIndex(index); 
    setRuleDescription(rules[index].rule_description);
    setRuleQuery(rules[index].rule_query);
  };

  // Reset the form (for adding new rule or canceling edit)
  const resetForm = () => {
    setRuleDescription("");
    setRuleQuery("");
    setSelectedIndex(null);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="top"
      minHeight="100vh"
      bgcolor="#f9f9f9"
      p={2}
      borderRadius={4}
      sx={{ position: "relative" }}
    >
      {/* Title Section */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Manage Rules
      </Typography>

      {/* Search Bar (small and positioned at top-right) */}
      <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}>
        <TextField
          label="Search Rules"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Rules List */}
      <Box width="80%" mb={3} display="flex" flexDirection="column" gap={2}>
        {/* Column Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            borderBottom: "2px solid #ddd",
            paddingY: 1,
            fontWeight: "bold",
            bgcolor: "#f5f5f5",
            height: "40px",
          }}
        >
          <Box sx={{ width: "35%", ml: 2 }}>Rule Description</Box>
          <Box sx={{ width: "55%" }}>Rule Query</Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mr: 6 }}>
            Actions
          </Box>
        </Box>

        <List
          ref={listRef}
          sx={{
            maxHeight: isExpanded ? "400px" : "220px", // Toggle list height
            overflowY: "auto",
            transition: "max-height 0.3s ease-in-out", // Smooth transition for expansion
          }}
        >
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
              <Box sx={{ width: "35%" }}>
                <ListItemText primary={rule.rule_description} />
              </Box>
              <Box sx={{ width: "55%" }}>
                <ListItemText secondary={rule.rule_query} />
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

        {/* Expand/Collapse Button */}
        {showExpandButton && (
          <Button
            variant="outlined"
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{
              alignSelf: "flex-start",
              mt: 1,
              borderRadius: 20,
            }}
          >
            {isExpanded ? (
              <ExpandLessIcon fontSize="small" />
            ) : (
              <ExpandMoreIcon fontSize="small" />
            )}
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        )}
      </Box>

      {/* Add or Edit Rule Section */}
      <Box width="80%" display="flex" gap={2} mb={3}>
        <TextField
          label="Rule Description"
          variant="outlined"
          size="small"
          value={ruleDescription}
          onChange={(e) => setRuleDescription(e.target.value)}
          sx={{ width: "100%" }}
        />
      </Box>

      {/* Input field for SQL string with multiline behavior */}
      <Box width="80%" display="flex" gap={2} mb={3}>
        <TextField
          label="Rule Query"
          variant="outlined"
          size="small"
          value={ruleQuery}
          onChange={handleRuleQueryChange}
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

export default ManageRules;
