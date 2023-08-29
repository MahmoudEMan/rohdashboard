import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetTransactionsQuery } from "store/api";
import { DataGrid } from "@mui/x-data-grid";
import PageHeader from "components/PageHeader/PageHeader";
import DataGridCustomToolbar from "components/DataGridCustomToolbar/DataGridCustomToolbar";
import { BsStarFill } from "react-icons/bs";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "userId",
    headerName: "User ID",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    flex: 1,
  },
  {
    field: "products",
    headerName: "# of Products",
    flex: 0.5,
    sortable: false,
    renderCell: (params) => params.value.length,
  },
  {
    field: "cost",
    headerName: "Cost",
    flex: 1,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    IconComponent: () => {
      return <BsStarFill></BsStarFill>;
    },
  },
];
const Transactions = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  console.log(data);
  return (
    <Box m="1.5rem 2.5rem">
      <PageHeader
        title="Transactions"
        subtitle="entire list of transactions"
      ></PageHeader>
      <Box
        height="80vh"
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
          // ColumnUnsortedIcon={() => {
          //   return <BsStarFill />;
          // }}
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pagination
          page={page}
          pageSize={pageSize}
          rowsPerPageOptions={[20, 50, 100]}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{
            Toolbar: DataGridCustomToolbar,
            ColumnUnsortedIcon: BsStarFill,
          }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default Transactions;
