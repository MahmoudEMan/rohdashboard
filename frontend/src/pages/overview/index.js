import {
  FormControl,
  MenuItem,
  InputLabel,
  Box,
  Select,
  Typography,
} from "@mui/material";
import PageHeader from "components/PageHeader/PageHeader";
import React, { useState } from "react";
import OverviewChart from "components/OverviewChart/OverviewChart";

const Overview = () => {
  const [view, setView] = useState("units");
  const [total, setTotal] = useState({});
  console.log(total);
  return (
    <Box m="1.5rem 0rem">
      <PageHeader
        title="OVERVIEW"
        subtitle={"Overview of general revenue and profit"}
      ></PageHeader>
      <Box>
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => {
              setView(e.target.value);
            }}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Typography fontSize={"1.25rem"} m={"1rem 0"}>
        {view === "units" ? "Total units: " : "Total sales: "}
        {total[view]}{" "}
      </Typography>
      <Box height={"80vh"}>
        <OverviewChart view={view} setTotal={setTotal}></OverviewChart>
      </Box>
    </Box>
  );
};

export default Overview;
