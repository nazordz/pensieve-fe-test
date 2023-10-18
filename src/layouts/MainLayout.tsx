import React from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { signOut } from "@/services/AuthenticationService";
import { useAppSelector } from "@/store/hook";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const authenticationData = useAppSelector((state) => state.authentication);

  function onLogout() {
    signOut();
    navigate("/login");
  }

  return (
    <Box p={2}>
      <AppBar>
        <Toolbar sx={{justifyContent: 'space-between'}}>
          <Typography>{authenticationData.user?.name}</Typography>
          <Button onClick={() => onLogout()} variant="contained" color="secondary">Logout</Button>
        </Toolbar>
      </AppBar>
      <Box mt={10}>
        <React.Suspense fallback={<Loader />}>
          <Outlet />
        </React.Suspense>
      </Box>
    </Box>
  );
};

export default MainLayout;
