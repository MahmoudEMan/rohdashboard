import { useMemo } from "react";
import {
  createBrowserRouter,
  // createRoutesFromElements,
  RouterProvider,
  // Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
// import {createTheme} from '@mui/material/styles'
import { themeSettings } from "theme";

//pages

import RootLayout from "./pages/Root";
import Dashboard from "pages/dashboard";
//Client Facing
import Products from "pages/products";
import Customers from "pages/customers";
import Transactions from "pages/transactions";
import Geography from "pages/geography";
//Sales
import Overview from "pages/overview";
import Daily from "pages/daily";
import Monthly from "pages/monthly";
import Breakdown from "pages/breakdown";
//Management
import Admin from "pages/admin";
import Calendar from "pages/calendar";

import ErrorPage from "pages/errorPage";

// api

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "products",
        element: <Products />,
      },
      { path: "customers", element: <Customers /> },
      { path: "transactions", element: <Transactions /> },
      { path: "geography", element: <Geography /> },
      { path: "overview", element: <Overview /> },
      { path: "daily", element: <Daily /> },
      { path: "monthly", element: <Monthly /> },
      { path: "breakdown", element: <Breakdown /> },
      { path: "admin", element: <Admin /> },
      { path: "calendar", element: <Calendar /> },
    ],
  },
]);
function App() {
  const mode = useSelector((state) => state.uiState.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
