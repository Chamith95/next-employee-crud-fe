"use client";
import { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDeleteEmployeeMutation, useGetEmployeeQuery } from "@/lib/services/employeeService";
import { EmployeeCard } from "@/components/EmployeeCard";
import PageLoadSpinner from "@/components/PageLoadSpinner";
import { getGenderKeyByValue } from "@/utils/helper";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableViewIcon from "@mui/icons-material/TableView";
import { useRouter } from "next/navigation";
import { Employee } from "@/lib/services/employeeTypes";
import ConfirmationDialog from "@/components/ConfimrationDialog";
import { SnackbarProvider, useSnackbar } from "notistack";

enum ViewMode {
  Card,
  Table,
}

export default function Page() {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Card); // Card, Table
  const { data: employees, refetch, isFetching, isLoading, isError } = useGetEmployeeQuery();
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);
  const [deleteEmployee, { isSuccess: isDeleteSuccess, isError: isDeleteError }] = useDeleteEmployeeMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      enqueueSnackbar("Employee Deleted Successfully", { variant: "success" });
      setIsConfirmationDialogOpen(false);
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteSuccess, router]);

  useEffect(() => {
    if (isDeleteError || isError) {
      enqueueSnackbar("Something Went Wrong", { variant: "error" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, router]);

  const onEditClick = (employee: Employee) => {
    router.push(`/employee/edit/${employee.id}`);
  };

  const onDeleteClick = (employee: Employee) => {
    setIsConfirmationDialogOpen(true);
    setSelectedEmployee(employee);
  };

  const onDeleteConfirmClick = () => {
    setIsConfirmationDialogOpen(true);
    if (!selectedEmployee) return;
    deleteEmployee(+selectedEmployee?.id);
  };

  if (isError) return <Box>Something went wrong</Box>;

  return (
    <Box className="flex flex-col gap-4">
    <SnackbarProvider />
      <Box className="flex flex-row justify-end w-full gap-4">
        <Button variant="contained" onClick={() => router.push("/employee/add")}>
          Add Employee
        </Button>
        {viewMode === ViewMode.Table && (
          <IconButton color="primary" aria-label="list" onClick={() => setViewMode(ViewMode.Card)}>
            <DashboardIcon />
          </IconButton>
        )}
        {viewMode === ViewMode.Card && (
          <IconButton color="primary" aria-label="table-icon" onClick={() => setViewMode(ViewMode.Table)}>
            <TableViewIcon />
          </IconButton>
        )}
      </Box>
      {isLoading && !isFetching && <LinearProgress />}
      {isFetching && <PageLoadSpinner />}
      {viewMode === ViewMode.Card && (
        <Grid container spacing={2}>
          {employees?.map((item) => {
            return (
              <Grid key={item.id} item xs={6} md={4} lg={2}>
                <EmployeeCard onEdit={(item) => onEditClick(item)} onDelete={(item) => onDeleteClick(item)} employeeItem={item} />
              </Grid>
            );
          })}
        </Grid>
      )}
      {viewMode === ViewMode.Table && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">Phone No.</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Gender</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees?.map((row) => (
                <TableRow key={row.first_name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.first_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.last_name}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.number}</TableCell>
                  <TableCell align="left">{getGenderKeyByValue(row.gender)}</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {employees?.length === 0 && <Box>No Employees Found</Box>}
      <ConfirmationDialog open={isConfirmationDialogOpen} title="Confirm" content="Are you sure you want to Delete" onConfirm={() => onDeleteConfirmClick()} onCancel={() => setIsConfirmationDialogOpen(false)}></ConfirmationDialog>
    </Box>
  );
}
