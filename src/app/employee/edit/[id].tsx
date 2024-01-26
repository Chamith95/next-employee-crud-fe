"use client";
import { useGetEmployeeQuery, useGetEmployeebyIdQuery, useUpdateEmployeeMutation } from "@/lib/services/employeeService";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from 'next/router'
import { SnackbarProvider, useSnackbar } from "notistack";
import { useEffect } from "react";
import * as Yup from "yup";

export default function Page() {
  const router = useRouter();
  const { id} = router.query;
  const { enqueueSnackbar} = useSnackbar()
  const [updateEmployee, { isSuccess, isLoading, isError }] = useUpdateEmployeeMutation();
  const { data: employee,isLoading: isEmployeeLoading } = useGetEmployeebyIdQuery(id as any);
  const { refetch } = useGetEmployeeQuery();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Employee Updated Successfully', { variant: 'success' })
      refetch()
      router.push("/employee/list");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, router]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar('Something Went Wrong', { variant: 'error' })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, router]);

  const formik = useFormik({
    initialValues: {
      firstName: employee?.first_name,
      lastName: employee?.last_name,
      email: employee?.email,
      phoneNumber: employee?.number,
      gender: employee?.gender,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First Name is required")
        .matches(/^[A-Za-z]*$/, "First Name should only contain alphabets")
        .min(6, "First Name should be at least 6 characters")
        .max(10, "First Name should be at most 10 characters"),
      lastName: Yup.string()
        .required("Last Name is required")
        .matches(/^[A-Za-z]*$/, "Last Name should only contain alphabets")
        .min(6, "Last Name should be at least 6 characters")
        .max(10, "Last Name should be at most 10 characters"),
      email: Yup.string().email("Email is invaid"),
      phoneNumber: Yup.string()
        .required("Phone Number is required")
        .matches(/^\d{10}$/, "Phone number must be 10 characters"),
    }),
    onSubmit: async (values) => {
      updateEmployee({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        number: values.phoneNumber,
        gender: values.gender,
        photo: "https://randomuser.me/api/portraits/men/30.jpg" //photo uploaded url needs to be added
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
        <SnackbarProvider />
      <Box className="flex flex-col gap-4">
        <Box className="flex flex-row justify-end w-full gap-4">
          <Button variant="contained" onClick={() => router.push("/employee/list")}>
            List View
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextField id="firstName" label="First Name" {...formik.getFieldProps("firstName")} error={formik.touched.firstName && Boolean(formik.errors.firstName)} helperText={formik.touched.firstName && formik.errors.firstName} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField id="lastName" label="Last Name" {...formik.getFieldProps("lastName")} error={formik.touched.lastName && Boolean(formik.errors.lastName)} helperText={formik.touched.lastName && formik.errors.lastName} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField id="email" label="Email"  {...formik.getFieldProps("email")} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField id="number" label="Number" {...formik.getFieldProps("phoneNumber")} error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)} helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}  fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
              <Select labelId="demo-simple-select-helper-label" {...formik.getFieldProps("gender")} id="demo-simple-select-helper" label="Gender">
                <MenuItem value={'M'}>Male</MenuItem>
                <MenuItem value={'F'}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box className="flex flex-row justify-end w-full gap-4">
          <Button variant="outlined" color="primary" onClick={() => router.push("/employee/list")}>
            Cancel
          </Button>
          <Button disabled={isLoading} variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
}
