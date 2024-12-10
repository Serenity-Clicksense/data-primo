import React, { useState } from "react";
import { Box, Typography, TextField, IconButton, List, ListItem, ListItemText, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";

function ManageCategories() {
  const [categories, setCategories] = useState(["Category 1", "Category 2", "Category 3"]);
  const [newCategory, setNewCategory] = useState("");
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the category being edited

  // Add a new category or edit an existing category
  const handleAddOrEditCategory = () => {
    if (newCategory) {
      if (editingIndex === null) {
        // Add new category
        setCategories([...categories, newCategory]);
      } else {
        // Edit existing category
        const updatedCategories = [...categories];
        updatedCategories[editingIndex] = newCategory;
        setCategories(updatedCategories);
      }
      resetForm(); // Reset form after adding or editing
    }
  };

  // Delete a category from the list
  const handleDeleteCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  // Set the category to be edited
  const handleEditCategory = (index) => {
    setEditingIndex(index); // Set the index of the category being edited
    setNewCategory(categories[index]); // Populate the input field with the category name
  };

  // Reset the form to default (for adding new category or canceling edit)
  const resetForm = () => {
    setNewCategory("");
    setEditingIndex(null); // Reset editing index to null
  };

  // Filter categories based on search input
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
                <ListItemText primary={category} />
              </Box>
              <Box display="flex" alignItems="center">
                {/* Edit Icon Button */}
                <IconButton onClick={() => handleEditCategory(index)}>
                  <EditIcon />
                </IconButton>
                {/* Delete Icon Button */}
                <IconButton onClick={() => handleDeleteCategory(category)} edge="end">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Add or Edit Category Section */}
      <Box display="flex" alignItems="center" width="80%">
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <IconButton onClick={handleAddOrEditCategory} sx={{ ml: 2 }} color="primary">
          {editingIndex === null ? (
            <AddCircleIcon fontSize="large" />
          ) : (
            <EditIcon fontSize="large" />
          )}
        </IconButton>
      </Box>

      {/* Cancel Edit Button */}
      {editingIndex !== null && (
        <Button onClick={resetForm} color="secondary" variant="outlined" sx={{ mt: 2 }}>
          Cancel Edit
        </Button>
      )}
    </Box>
  );
}

export default ManageCategories;
