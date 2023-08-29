import React, { useState } from "react";
import Navbar from "components/Navbar/Navbar";
import Sidebar from "components/Sidebar/Sidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "store/api";

const Root = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(isNonMobile);
  const { userId } = useSelector((state) => state.userState);
  const { data } = useGetUserQuery(userId);
  return (
    <Box display={isNonMobile ? "flex" : ""} width={"100%"} height={"100%"}>
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="280px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      ></Sidebar>
      <Box flexGrow={1} sx={{ transition: "1s" }}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        ></Navbar>
        <main className={"p-8"}>
          <Outlet></Outlet>
        </main>
      </Box>
      <ScrollRestoration />
    </Box>
  );
};

export default Root;
