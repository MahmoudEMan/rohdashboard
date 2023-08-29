import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useGetCustomersQuery } from "store/api";
import PageHeader from "components/PageHeader/PageHeader";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: isNonMobile ? 1 : 0,
    },
    {
      field: "name",
      headerName: "Name",
      flex: isNonMobile ? 0.5 : 0,
    },
    {
      field: "email",
      headerName: "Email",
      flex: isNonMobile ? 1 : 0,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: isNonMobile ? 1 : 0,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: isNonMobile ? 0.5 : 0,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: isNonMobile ? 1 : 0,
    },
    {
      field: "role",
      headerName: "Role",
      flex: isNonMobile ? 0.5 : 0,
    },
  ];
  return (
    <Box className={"my-6 mx-0 lg:mx-10"}>
      <PageHeader
        title={"CUSTOMERS"}
        subtitle={"list of customers"}
      ></PageHeader>
      <Box
        mt="40px"
        height={"75vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
