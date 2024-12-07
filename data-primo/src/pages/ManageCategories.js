import React, { useState } from "react";
import { Box, Typography, TextField, IconButton, List, ListItem, ListItemText, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function ManageCategories() {
  const [categories, setCategories] = useState(["Category 1", "Category 2", "Category 3"]);
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
      justifyContent="top"
      minHeight="100vh"
      bgcolor="#f9f9f9"
      p={2}
      borderRadius={4}
    >
      {/* Title Section */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Manage Categories
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Categories"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ maxWidth: "600px", mb: 3 }}
      />

      {/* Categories List */}
      <Box width="80%" mb={3} display="flex" flexDirection="column" gap={2}>
        <List sx={{ maxHeight: "400px", overflowY: "auto" }}>
          {filteredCategories.map((category, index) => (
            <ListItem key={index} sx={{ borderBottom: "1px solid #ddd",
                paddingY: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center", }}>
              <Box sx={{ width: "45%" }}>
                <ListItemText primary={category} />
              </Box>
              <IconButton onClick={() => handleDeleteCategory(category)} edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Add Category Section */}
      <Box display="flex" alignItems="center" width="80%">
        <TextField
          label="Add Category"
          variant="outlined"
          fullWidth
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <IconButton onClick={handleAddCategory} sx={{ ml: 2 }} color="primary">
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ManageCategories;
