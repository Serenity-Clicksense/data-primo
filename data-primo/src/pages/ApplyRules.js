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
  Grid,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ApplyRules() {
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const databases = ["Database 1", "Database 2", "Database 3"];

  const categories = [
    {
      name: "Category 1",
      rules: ["Rule 1", "Rule 2", "Rule 3"],
      columns: ["Column 1", "Column 2", "Column 3", "Column 4"],
    },
    {
      name: "Category 2",
      rules: ["Rule 4", "Rule 5"],
      columns: ["Column 5", "Column 6", "Column 7"],
    },
    {
      name: "Category 3",
      rules: ["Rule 6", "Rule 7", "Rule 8", "Rule 9"],
      columns: ["Column 8", "Column 9", "Column 10", "Column 11"],
    },
  ];

  const [selectedRules, setSelectedRules] = useState([]);
  const [checked, setChecked] = useState([]);
  const [leftColumns, setLeftColumns] = useState(
    categories.reduce((acc, category) => {
      acc[category.name] = category.columns;
      return acc;
    }, {})
  );
  const [rightColumns, setRightColumns] = useState({});

  const handleDatabaseChange = (event) => {
    setSelectedDatabase(event.target.value);
  };

  const handleRuleToggle = (rule) => {
    setSelectedRules((prev) =>
      prev.includes(rule) ? prev.filter((r) => r !== rule) : [...prev, rule]
    );
  };

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = (categoryName) => {
    const selected = checked.filter((item) =>
      leftColumns[categoryName]?.includes(item)
    );
    setRightColumns((prev) => ({
      ...prev,
      [categoryName]: [...(prev[categoryName] || []), ...selected],
    }));
    setLeftColumns((prev) => ({
      ...prev,
      [categoryName]: prev[categoryName]?.filter((item) => !selected.includes(item)),
    }));
    setChecked((prev) => prev.filter((item) => !selected.includes(item)));
  };

  const handleCheckedLeft = (categoryName) => {
    const selected = checked.filter((item) =>
      rightColumns[categoryName]?.includes(item)
    );
    setLeftColumns((prev) => ({
      ...prev,
      [categoryName]: [...(prev[categoryName] || []), ...selected],
    }));
    setRightColumns((prev) => ({
      ...prev,
      [categoryName]: prev[categoryName]?.filter((item) => !selected.includes(item)),
    }));
    setChecked((prev) => prev.filter((item) => !selected.includes(item)));
  };

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => (
          <ListItemButton
            key={value}
            role="listitem"
            onClick={() => handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                checked={checked.includes(value)}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": `transfer-list-item-${value}` }}
              />
            </ListItemIcon>
            <ListItemText id={`transfer-list-item-${value}`} primary={value} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );

  const handleSubmit = () => {
    if (selectedDatabase === "") {
      alert("Please select a database.");
    } else {
      alert(
        `Applying rules to ${selectedDatabase}:\nSelected Rules: ${selectedRules.join(
          ", "
        )}\nSelected Columns: ${JSON.stringify(rightColumns)}`
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
      <Typography variant="h4" fontWeight="bold" mb={5}>
        Apply Rules
      </Typography>

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
              <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                {category.rules.map((rule, idx) => (
                  <Chip
                    key={idx}
                    label={rule}
                    clickable
                    color={
                      selectedRules.includes(rule) ? "primary" : "default"
                    }
                    onClick={() => handleRuleToggle(rule)}
                  />
                ))}
              </Box>
              {/* Transfer List for Columns */}
              <Grid
                container
                spacing={2}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Grid item>{customList(leftColumns[category.name] || [])}</Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    sx={{ alignItems: "center" }}
                  >
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={() => handleCheckedRight(category.name)}
                      disabled={
                        !checked.some((item) =>
                          leftColumns[category.name]?.includes(item)
                        )
                      }
                    >
                      &gt;
                    </Button>
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={() => handleCheckedLeft(category.name)}
                      disabled={
                        !checked.some((item) =>
                          rightColumns[category.name]?.includes(item)
                        )
                      }
                    >
                      &lt;
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>{customList(rightColumns[category.name] || [])}</Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

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
