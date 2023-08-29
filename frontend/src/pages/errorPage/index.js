import { Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FlexCenter } from "UI/FlexPs";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <FlexCenter className="flex-col gap-4" height={"100vh"}>
      <Typography variant="h1" fontSize={"7.5rem"}>
        PAGE DOESN'T EXIST
      </Typography>
      <Button
        className={"text-lg"}
        onClick={() => {
          navigate(-1);
        }}
      >
        go back
      </Button>
    </FlexCenter>
  );
};

export default ErrorPage;
