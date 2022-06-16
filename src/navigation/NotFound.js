import React from "react";
import Typography from '@mui/material/Typography';
import { LinkRoute } from "components/LinkRoute";
import { ROOT } from "./CONSTANTS";

export const NotFound = () => {
  return (
    <>
      {/* Page Not Found! */}
      <LinkRoute to={ROOT}>Home</LinkRoute>
      <Typography variant="h2">404: page not found!</Typography>
    </>
  );
};
