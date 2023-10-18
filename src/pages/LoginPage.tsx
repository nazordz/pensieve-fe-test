import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Stack,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import * as yup from "yup";
import { signIn } from "@/services/AuthenticationService";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { closeSnackbar, showSnackbar } from "@/store/slices/snackbarSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .max(20, "Too long, Maximal 20 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const snackbarState = useAppSelector((state) => state.snackbar);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    async onSubmit(values) {
      const user = await signIn(values.email, values.password);
      if (user == null) {
        dispatch(
          showSnackbar({
            isOpen: true,
            message: "Kredensial salah",
            variant: "error",
          })
        );
      } else {
        dispatch(
          showSnackbar({
            isOpen: true,
            message: "Berhasil login",
            variant: "success",
          })
        );

        navigate('/');
      }
    },
  });

  return (
    <Grid container spacing={2} justifyContent="center" pt={4}>
      <Grid item xs={4}>
        <Snackbar
          open={snackbarState.isOpen}
          autoHideDuration={6000}
          onClose={() => dispatch(closeSnackbar())}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
        >
          <Alert
            onClose={() => dispatch(closeSnackbar())}
            severity={snackbarState.variant}
            sx={{ width: "100%" }}
          >
            {snackbarState.message}
          </Alert>
        </Snackbar>
        <Typography variant="h3" my={2}>
          Pensieve test by Naufal
        </Typography>
        <Card>
          <CardHeader title="Login" />
          <CardContent>
            <Stack spacing={2}>
              <Box>
                <TextField
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  fullWidth
                  name="email"
                  label="Email"
                />
              </Box>
              <Box>
                <TextField
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  fullWidth
                  label="Password"
                  type="password"
                />
              </Box>
              <Box>
                <LoadingButton
                  onClick={() => formik.submitForm()}
                  loading={formik.isSubmitting}
                  variant="contained"
                >
                  Login
                </LoadingButton>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
