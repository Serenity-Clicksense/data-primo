import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton, List, ListItem, ListItemText, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function ManageCategories() {
  const [categories, setCategories] = useState(["Category 1", "Category 2", "Category 3"]); // Example categories
  const [newCategory, setNewCategory] = useState("");
  const [search, setSearch] = useState("");

  const handleAddCategory = () => {
    if (newCategory) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
      p={2}
      borderRadius={4}
    >
      {/* Title Section */}
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Manage Categories
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Categories"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Categories List */}
      <List sx={{ width: "100%", maxHeight: "400px", overflowY: "auto" }}>
        {filteredCategories.map((category, index) => (
          <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
            <ListItemText primary={category} />
            <IconButton onClick={() => handleDeleteCategory(category)} edge="end">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ width: "100%", my: 2 }} />

      {/* Add Category Section */}
      <Box display="flex" alignItems="center" width="100%">
        <TextField
          label="Add Category"
          variant="outlined"
          fullWidth
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <IconButton onClick={handleAddCategory} sx={{ ml: 2 }}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ManageCategories;
