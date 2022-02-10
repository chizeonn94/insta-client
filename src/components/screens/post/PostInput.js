import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import DirectionsIcon from "@mui/icons-material/Directions";
import SentimentSatisfiedSharpIcon from "@mui/icons-material/SentimentSatisfiedSharp";
export default function PostInput() {
  return (
    <Paper
      // elevation="0"
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <IconButton sx={{ p: "10px" }}>
        <SentimentSatisfiedSharpIcon />
      </IconButton>
      <InputBase
        fullWidth
        sx={{ ml: 1, flex: 1, border: 0 }}
        placeholder="Add a comment..."
      />
      <IconButton type="submit" sx={{ p: "10px" }}>
        {/* <SearchIcon /> */}
      </IconButton>
      <IconButton
        disabled
        color="primary"
        sx={{ p: "10px", fontSize: 18 }}
        aria-label="directions"
      >
        Post
      </IconButton>
    </Paper>
  );
}
