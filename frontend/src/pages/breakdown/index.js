import React from "react";
import { Box, useTheme } from "@mui/material";
import PageHeader from "components/PageHeader/PageHeader";
import BreakdownChart from "components/BreakdownChart/BreakdownChart";

const Breakdown = () => {
  return (
    <Box>
      <PageHeader
        title={"Breakdown"}
        subtitle={"Breakdown of Sales By Category"}
      ></PageHeader>
      <Box mt={"40px"} height={"75vh"}>
        <BreakdownChart></BreakdownChart>
      </Box>
    </Box>
  );
};

export default Breakdown;
