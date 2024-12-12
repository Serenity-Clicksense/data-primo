import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, IconButton, List, ListItem, ListItemText, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function ManageCategories() {
  const [categories, setCategories] = useState(() => {
    const storedCategories = localStorage.getItem("categories");
    return storedCategories ? JSON.parse(storedCategories) : [
      "Data Type Checks",
      "Date Format Checks",
      "Email and Null Checks",
      "Comparison Checks",
      "Uniqueness and Integrity Checks",
      "Custom Checks"
    ];
  });
  const [newCategory, setNewCategory] = useState("");
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle the list expansion
  const [showExpandButton, setShowExpandButton] = useState(false); // Whether the Expand/Collapse button should be shown

  const listRef = useRef(null); // Ref to the List component to measure its height

  // Save categories to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // Check if the content is overflowing (i.e., if the list scroll height is greater than its client height)
  useEffect(() => {
    if (listRef.current) {
      const isOverflowing = listRef.current.scrollHeight > listRef.current.clientHeight;
      setShowExpandButton(isOverflowing); // Only show the expand/collapse button if overflowing
    }
  }, [categories]); // Recheck whenever categories change

  // Add a new category or edit an existing category
  const handleAddOrEditCategory = () => {
    if (newCategory) {
      if (editingIndex === null) {
        setCategories([...categories, newCategory]);
      } else {
        const updatedCategories = [...categories];
        updatedCategories[editingIndex] = newCategory;
        setCategories(updatedCategories);
      }
      resetForm();
    }
  };

  // Delete a category from the list
  const handleDeleteCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  // Set the category to be edited
  const handleEditCategory = (index) => {
    setEditingIndex(index);
    setNewCategory(categories[index]);
  };

  // Reset the form to default (for adding new category or canceling edit)
  const resetForm = () => {
    setNewCategory("");
    setEditingIndex(null);
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
      sx={{ position: "relative" }}
    >
      {/* Title Section */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Manage Categories
      </Typography>

      {/* Search Bar (small and positioned at top-right) */}
      <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}>
        <TextField
          label="Search Categories"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Categories List */}
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
          <Box sx={{ width: "45%", ml: 2 }}>Category</Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mr: 2 }}>
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

        {/* Only show the Expand/Collapse button if content overflows */}
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
            {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        )}
      </Box>

      {/* Add or Edit Category Section */}
      <Box display="flex" alignItems="center" width="80%">
        <TextField
          label="Category Description"
          variant="outlined"
          fullWidth
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <IconButton onClick={handleAddOrEditCategory} sx={{ ml: 2 }} color="primary">
          {editingIndex === null ? <AddCircleIcon fontSize="large" /> : <EditIcon fontSize="large" />}
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
