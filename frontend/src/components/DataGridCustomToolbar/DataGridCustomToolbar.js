import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import { FlexBetween } from "UI/FlexPs";

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label={"search..."}
          sx={{
            mb: "0.5rem",
            width: "15rem",
            "& .MuiFormLabel-root.Mui-focused , & .MuiFormLabel-root.MuiFormLabel-filled":
              {
                color: "transparent",
              },
          }}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          autoFocus
          variant={"standard"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
