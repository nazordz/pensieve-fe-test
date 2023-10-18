/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector } from "@/store/hook";
import { SnackbarState, showSnackbar } from "@/store/slices/snackbarSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProps> = (props) => {
  const authenticate = useAppSelector((state) => state.authentication);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authenticate.accessToken == null || authenticate.accessToken == '') {
      const snakebarState: SnackbarState = {
        isOpen: true,
        message: "Access Declined!",
        variant: "error",
      };
      dispatch(showSnackbar(snakebarState));
      navigate("/login");
    }
  }, [authenticate]);

  const { children } = props;

  return <>{children}</>;
};

export default ProtectedRoute;
